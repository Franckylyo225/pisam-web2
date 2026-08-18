import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'super_admin' | 'admin' | 'editor' | null;

// Durée d'inactivité avant déconnexion automatique (30 minutes)
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
// Durée de vie maximale d'une session, même active (12 heures)
const ABSOLUTE_SESSION_MS = 12 * 60 * 60 * 1000;
const LAST_ACTIVITY_KEY = 'pisam_last_activity';
const SESSION_START_KEY = 'pisam_session_start';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userRole: AppRole;
  isApproved: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  sessionExpired: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<AppRole>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  const isAdmin = userRole === 'admin' || userRole === 'super_admin';
  const isSuperAdmin = userRole === 'super_admin';

  const checkUserStatus = async (userId: string) => {
    // Check role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (roleData) {
      setUserRole(roleData.role as AppRole);
    } else {
      setUserRole(null);
    }

    // Check approval status - cast to any to handle new columns
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    setIsApproved((profileData as any)?.is_approved ?? false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkUserStatus(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
          setIsApproved(false);
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserStatus(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      localStorage.setItem(SESSION_START_KEY, String(Date.now()));
      localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      setSessionExpired(false);
    }
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole(null);
    setIsApproved(false);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.removeItem(SESSION_START_KEY);
  };

  // Expiration de session : inactivité (30 min) + durée absolue (12 h)
  useEffect(() => {
    if (!user) {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      return;
    }

    if (!localStorage.getItem(SESSION_START_KEY)) {
      localStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }

    const expire = async () => {
      setSessionExpired(true);
      await signOut();
    };

    const schedule = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(expire, IDLE_TIMEOUT_MS);
    };

    const markActivity = () => {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      setSessionExpired(false);
      schedule();
    };

    const checkExpiry = () => {
      const last = Number(localStorage.getItem(LAST_ACTIVITY_KEY) ?? Date.now());
      const start = Number(localStorage.getItem(SESSION_START_KEY) ?? Date.now());
      const now = Date.now();
      if (now - last > IDLE_TIMEOUT_MS || now - start > ABSOLUTE_SESSION_MS) {
        expire();
      }
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach((e) => window.addEventListener(e, markActivity, { passive: true }));
    document.addEventListener('visibilitychange', checkExpiry);

    markActivity();
    checkExpiry();
    const interval = window.setInterval(checkExpiry, 60 * 1000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, markActivity));
      document.removeEventListener('visibilitychange', checkExpiry);
      window.clearInterval(interval);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isAdmin, 
      isSuperAdmin, 
      userRole, 
      isApproved, 
      isLoading, 
      signIn, 
      signUp, 
      signOut,
      sessionExpired
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
