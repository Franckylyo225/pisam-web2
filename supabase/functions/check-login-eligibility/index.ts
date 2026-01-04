import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email et mot de passe requis' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
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
