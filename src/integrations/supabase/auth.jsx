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
  const [enrollmentData, setEnrollmentData] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        await getAuthenticatorAssuranceLevel();
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session) {
        await getAuthenticatorAssuranceLevel();
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
    return supabase.auth.mfa.verify({ factorId, code });
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

        if (data.nextLevel === 'aal1') {
          await enrollMFA();
        }
      }
      return { data, error };
    } catch (error) {
      console.error('Error in getAuthenticatorAssuranceLevel:', error);
      return { data: null, error };
    }
  };

  const enrollMFA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });
      if (error) {
        console.error('Error enrolling in MFA:', error);
        return;
      }
      setEnrollmentData(data);
      console.log('MFA Enrollment Data:', data);
    } catch (error) {
      console.error('Error in enrollMFA:', error);
    }
  };

  const challengeMFA = async (factorId) => {
    try {
      const { data, error } = await supabase.auth.mfa.challenge({ factorId });
      if (error) {
        console.error('Error creating MFA challenge:', error);
        return null;
      }
      return data.id;
    } catch (error) {
      console.error('Error in challengeMFA:', error);
      return null;
    }
  };

  const verifyMFA = async (factorId, challengeId, code) => {
    try {
      const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code,
      });
      if (error) {
        console.error('Error verifying MFA:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error in verifyMFA:', error);
      return false;
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
      getAuthenticatorAssuranceLevel,
      enrollMFA,
      challengeMFA,
      verifyMFA,
      enrollmentData
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