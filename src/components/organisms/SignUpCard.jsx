import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import SignUpForm from '@/components/molecules/SignUpForm';
import LoginLink from '@/components/molecules/LoginLink';
import EnrollMFA from '@/components/molecules/EnrollMFA';

const SignUpCard = ({ currentStep, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit, isSubmitting, handleMFAEnrolled, handleMFACancelled }) => {
  return (
    <Card className="w-full max-w-md p-8">
      <CardContent>
        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
        <p className="text-gray-600 mb-6">Create your account</p>
        {currentStep === 'signup' ? (
          <>
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            <LoginLink />
          </>
        ) : (
          <EnrollMFA onEnrolled={handleMFAEnrolled} onCancelled={handleMFACancelled} />
        )}
      </CardContent>
    </Card>
  );
};

export default SignUpCard;