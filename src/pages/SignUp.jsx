import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useSupabaseAuth } from '@/integrations/supabase/auth.jsx';
import useAuthFlow from '@/hooks/useAuthFlow';
import SignUpCard from '@/components/organisms/SignUpCard';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState('signup');
  const { signUp } = useSupabaseAuth();
  const navigate = useNavigate();
  const { resetMFAState } = useAuthFlow();

  const handleInitialSignUp = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await signUp({ email, password });
      if (error) throw error;
      toast.success('Account created successfully. Please set up MFA.');
      setCurrentStep('mfa');
    } catch (error) {
      console.error('SignUp error:', error.message);
      toast.error(`Sign up failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMFAEnrolled = () => {
    toast.success('MFA enrolled successfully. You can now log in.');
    navigate('/login');
  };

  const handleMFACancelled = () => {
    resetMFAState();
    setCurrentStep('signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignUpCard
        currentStep={currentStep}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleInitialSignUp}
        isSubmitting={isSubmitting}
        handleMFAEnrolled={handleMFAEnrolled}
        handleMFACancelled={handleMFACancelled}
      />
    </div>
  );
};

export default SignUp;