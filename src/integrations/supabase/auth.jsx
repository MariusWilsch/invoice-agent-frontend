import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "./index.js";
import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  return <SupabaseAuthProviderInner>{children}</SupabaseAuthProviderInner>;
};

export const SupabaseAuthProviderInner = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        queryClient.invalidateQueries("user");
      }
    );

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
      setLoading(false);
    };
  }, [queryClient]);

  const signInWithPassword = async ({ email, password }) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const listFactors = async () => {
    return supabase.auth.mfa.listFactors();
  };

  const challengeAndVerify = async (factorId, otp) => {
    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { data: verifyData, error: verifyError } =
        await supabase.auth.mfa.verify({
          factorId,
          challengeId: challengeData.id,
          code: otp,
        });
      if (verifyError) throw verifyError;

      return { data: verifyData };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async ({ email, password }) => {
    return supabase.auth.signUp({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    queryClient.invalidateQueries("user");
    setLoading(false);
  };

  // New function to get the Authenticator Assurance Level
  const getAuthenticatorAssuranceLevel = async () => {
    return supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  };

  const enrollMFA = async () => {
    return supabase.auth.mfa.enroll({
      factorType: 'totp',
    });
  };

  const challengeMFA = async (factorId) => {
    return supabase.auth.mfa.challenge({ factorId });
  };

  const verifyMFA = async (factorId, challengeId, code) => {
    return supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code,
    });
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        session,
        loading,
        logout,
        signInWithPassword,
        listFactors,
        challengeAndVerify,
        signUp,
        getAuthenticatorAssuranceLevel,
        enrollMFA,
        challengeMFA,
        verifyMFA,
        supabase,
      }}
    >
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
