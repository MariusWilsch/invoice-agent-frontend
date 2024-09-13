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

  const signInWithOtp = async ({ email }) => {
    return supabase.auth.signInWithOtp({ email });
  };

  const signUp = async ({ email, password }) => {
    return supabase.auth.signUp({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    queryClient.invalidateQueries('user');
    setLoading(false);
  };

  const verifyOtp = async ({ factorId, code }) => {
    return supabase.auth.mfa.challenge({ factorId })
      .then(({ data }) => {
        if (data.challenge) {
          return supabase.auth.mfa.verify({ factorId, challengeId: data.challenge.id, code });
        } else {
          throw new Error('Failed to create MFA challenge');
        }
      });
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

  return (
    <SupabaseAuthContext.Provider value={{ 
      session, 
      loading, 
      logout, 
      signInWithPassword, 
      signInWithOtp, 
      signUp, 
      verifyOtp,
      getAuthenticatorAssuranceLevel 
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