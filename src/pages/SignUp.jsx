import React, { useState } from 'react';
import { useSupabaseAuth } from '@/integrations/supabase/auth.jsx';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import EnrollMFA from '@/components/molecules/EnrollMFA';
import useAuthFlow from '@/hooks/useAuthFlow';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState('signup'); // 'signup' or 'mfa'
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
      <Card className="w-full max-w-md p-8">
        <CardContent>
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-6">Create your account</p>
          {currentStep === 'signup' ? (
            <form onSubmit={handleInitialSignUp} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
          ) : (
            <EnrollMFA onEnrolled={handleMFAEnrolled} onCancelled={handleMFACancelled} />
          )}
          {currentStep === 'signup' && (
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;