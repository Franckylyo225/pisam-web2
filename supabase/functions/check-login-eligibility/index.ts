import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory rate limiter (per edge instance).
// Limits: 5 failed attempts per 15 minutes per IP+email combination.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_FAILURES = 5
type Bucket = { count: number; firstAt: number; blockedUntil?: number }
const buckets = new Map<string, Bucket>()

const getBucketKey = (ip: string, email: string) => `${ip}::${email.toLowerCase().trim()}`

const checkRateLimit = (key: string): { allowed: boolean; retryAfterSec?: number } => {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket) return { allowed: true }
  if (bucket.blockedUntil && bucket.blockedUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil((bucket.blockedUntil - now) / 1000) }
  }
  if (now - bucket.firstAt > RATE_LIMIT_WINDOW_MS) {
    buckets.delete(key)
    return { allowed: true }
  }
  if (bucket.count >= RATE_LIMIT_MAX_FAILURES) {
    bucket.blockedUntil = now + RATE_LIMIT_WINDOW_MS
    return { allowed: false, retryAfterSec: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) }
  }
  return { allowed: true }
}

const recordFailure = (key: string) => {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now - bucket.firstAt > RATE_LIMIT_WINDOW_MS) {
    buckets.set(key, { count: 1, firstAt: now })
  } else {
    bucket.count += 1
  }
}

const recordSuccess = (key: string) => {
  buckets.delete(key)
}

// Periodic cleanup
setInterval(() => {
  const now = Date.now()
  for (const [k, v] of buckets.entries()) {
    if ((v.blockedUntil ?? 0) < now && now - v.firstAt > RATE_LIMIT_WINDOW_MS) {
      buckets.delete(k)
    }
  }
}, 5 * 60 * 1000)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email et mot de passe requis' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email shape and length
    if (email.length > 255 || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return new Response(
        JSON.stringify({ canLogin: false, reason: 'invalid_credentials', message: 'Email ou mot de passe incorrect' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Identify caller for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('cf-connecting-ip')
      || 'unknown'
    const rlKey = getBucketKey(ip, email)

    const rl = checkRateLimit(rlKey)
    if (!rl.allowed) {
      return new Response(
        JSON.stringify({
          canLogin: false,
          reason: 'rate_limited',
          message: 'Trop de tentatives. Veuillez réessayer plus tard.'
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': String(rl.retryAfterSec ?? 900),
          }
        }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // First, try to authenticate the user to verify credentials
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    })

    // If authentication fails, return generic error (don't reveal if account exists)
    if (authError || !authData.user) {
      recordFailure(rlKey)
      return new Response(
        JSON.stringify({ 
          canLogin: false, 
          reason: 'invalid_credentials',
          message: 'Email ou mot de passe incorrect'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // User authenticated successfully, now check if approved
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('is_approved')
      .eq('user_id', authData.user.id)
      .maybeSingle()

    if (profileError) {
      console.error('Profile check error:', profileError)
      return new Response(
        JSON.stringify({ 
          canLogin: false, 
          reason: 'error',
          message: 'Erreur lors de la vérification du compte'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if user has super_admin role (they can always login)
    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)
      .maybeSingle()

    const isSuperAdmin = roleData?.role === 'super_admin'

    // If not approved and not super_admin, deny access
    if (!profile?.is_approved && !isSuperAdmin) {
      return new Response(
        JSON.stringify({ 
          canLogin: false, 
          reason: 'pending_approval',
          message: 'Votre compte est en attente d\'approbation par un administrateur'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Successful login: clear rate-limit bucket
    recordSuccess(rlKey)

    // User is approved or is super_admin, they can login
    return new Response(
      JSON.stringify({ 
        canLogin: true,
        session: authData.session
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        canLogin: false, 
        reason: 'error',
        message: 'Une erreur est survenue'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
