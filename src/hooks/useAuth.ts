
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMfaEnabled, setHasMfaEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useAuth - Setting up auth state listener');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, 'session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          checkMfaStatus(session.user);
        } else {
          setHasMfaEnabled(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        checkMfaStatus(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkMfaStatus = (user: User) => {
    const factors = user.factors || [];
    const hasVerifiedTotp = factors.some(
      (factor) => factor.factor_type === 'totp' && factor.status === 'verified'
    );
    setHasMfaEnabled(hasVerifiedTotp);
  };

  const signOut = async () => {
    console.log('Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      console.log('Successfully signed out');
      navigate('/');
    }
  };

  const refreshMfaStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      checkMfaStatus(user);
    }
  };

  return {
    user,
    session,
    loading,
    hasMfaEnabled,
    signOut,
    refreshMfaStatus,
  };
};
