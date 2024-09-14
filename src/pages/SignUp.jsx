import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import SignUpForm from "@/components/molecules/SignUpForm";
import EnrollMFA from "@/components/molecules/EnrollMFA";
import useAuthFlow from "@/hooks/useAuthFlow";

const SignUp = () => {
  const {
    isEnrollMFAStep,
    isLoading,
    handleSignUp,
    handleMFAEnrolled,
    handleMFACancelled,
    qrCodeUrl,
    secret,
  } = useAuthFlow();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardContent>
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-6">Create your account</p>
          {!isEnrollMFAStep && (
            <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          )}
          {isEnrollMFAStep && (
            <EnrollMFA
              qrCode={qrCodeUrl}
              secret={secret}
              onEnrolled={handleMFAEnrolled}
              onCancelled={handleMFACancelled}
              isLoading={isLoading}
            />
          )}
          {!isEnrollMFAStep && (
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
