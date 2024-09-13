import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './index.js';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  return (
    <SupabaseAuthProviderInner>
      {children}
    </SupabaseAuthProviderInner>
  );
}

export const SupabaseAuthProviderInner = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_OUT') {
        setIsOtpVerified(false);
      }
      queryClient.invalidateQueries('user');
    });

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
      setLoading(false);
    };
  }, [queryClient]);

  const signInWithPassword = async ({ email, password }) => {
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.data.user) {
      await getAuthenticatorAssuranceLevel();
    }
    return response;
  };

  const signUp = async ({ email, password }) => {
    return supabase.auth.signUp({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsOtpVerified(false);
    queryClient.invalidateQueries('user');
    setLoading(false);
  };

  const getAuthenticatorAssuranceLevel = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (error) {
        console.error('Error getting AAL:', error);
      } else {
        console.log('User AAL Data:', data);
        console.log('Current Session:', session);
        console.log('Current User:', session?.user);
      }
      return { data, error };
    } catch (error) {
      console.error('Error in getAuthenticatorAssuranceLevel:', error);
      return { data: null, error };
    }
  };

  const challengeAndVerifyOtp = async ({ factorId, code }) => {
    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code,
      });
      if (error) throw error;
      setIsOtpVerified(true);
      return { data, error: null };
    } catch (error) {
      console.error('Error in challengeAndVerifyOtp:', error);
      return { data: null, error };
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{ 
      session, 
      loading, 
      signOut, 
      signInWithPassword, 
      signUp,
      getAuthenticatorAssuranceLevel,
      challengeAndVerifyOtp,
      isOtpVerified,
      setIsOtpVerified
    }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  return useContext(SupabaseAuthContext);
};

export const SupabaseAuthUI = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="default"
    providers={[]}
  />
);