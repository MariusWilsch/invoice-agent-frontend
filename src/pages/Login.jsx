import useAuthFlow from "@/hooks/useAuthFlow";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "@/components/molecules/SignInForm";
import OtpVerificationForm from "@/components/molecules/OtpVerificationForm";
import EnrollMFA from "@/components/molecules/EnrollMFA";

const Login = () => {
  const {
    isOtpStep,
    isEnrollMFAStep,
    isLoading,
    handleSignIn,
    handleOtpVerification,
    handleMFAEnrolled,
    handleMFACancelled,
  } = useAuthFlow();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardContent>
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-gray-600 mb-6">Hi, Welcome back 👋</p>
          {!isOtpStep && !isEnrollMFAStep && (
            <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
          )}
          {isOtpStep && (
            <OtpVerificationForm
              onSubmit={handleOtpVerification}
              isLoading={isLoading}
            />
          )}
          {isEnrollMFAStep && (
            <EnrollMFA
              onEnrolled={handleMFAEnrolled}
              onCancelled={handleMFACancelled}
            />
          )}
          {!isOtpStep && !isEnrollMFAStep && (
            <p className="mt-4 text-center text-sm text-gray-600">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
