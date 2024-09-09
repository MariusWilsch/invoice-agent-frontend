import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/index.js';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (event === 'SIGNED_IN') {
          navigate('/');
          // We'll show the toast only when explicitly signing in, not on page reload
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
          // Show the toast only once, when the auth state changes to signed out
          toast.success('Signed out successfully');
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast.success('Signed up successfully. Please check your email for verification.');
      return data;
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(`Error signing up: ${error.message}`);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
      return data;
    } catch (error) {
      console.error('Error signing in:', error.message);
      toast.error(`Error signing in: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Remove the toast from here as it will be handled by the onAuthStateChange listener
    } catch (error) {
      console.error('Error signing out:', error.message);
      toast.error(`Error signing out: ${error.message}`);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      signUp,
      signIn,
      signOut,
      user,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};