import { useState } from "react";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SignInForm from "@/components/molecules/SignInForm";
import OtpVerificationForm from "@/components/molecules/OtpVerificationForm";
import EnrollMFA from "@/components/molecules/EnrollMFA";

const Login = () => {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isEnrollMFAStep, setIsEnrollMFAStep] = useState(false);
  const [factorId, setFactorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    signInWithPassword,
    listFactors,
    challengeAndVerify,
    getAuthenticatorAssuranceLevel,
    logout,
  } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSignIn = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signInWithPasswordAndCheckAAL(email, password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPasswordAndCheckAAL = async (email, password) => {
    const { error } = await signInWithPassword({ email, password });
    if (error) throw error;

    const { data: aal, error: aalError } =
      await getAuthenticatorAssuranceLevel();
    if (aalError) throw aalError;

    await handleAALState(aal);
  };

  const handleAALState = async (aal) => {
    if (isFullyAuthenticated(aal)) {
      completeAuthentication();
      return;
    }

    if (needsMFAVerification(aal)) {
      await setupMFAVerification();
      return;
    }

    if (needsMFAEnrollment(aal)) {
      setIsEnrollMFAStep(true);
      return;
    }

    throw new Error("Unexpected authentication state");
  };

  const isFullyAuthenticated = (aal) =>
    aal.currentLevel === "aal2" && aal.nextLevel === "aal2";
  const needsMFAVerification = (aal) =>
    aal.currentLevel === "aal1" && aal.nextLevel === "aal2";
  const needsMFAEnrollment = (aal) =>
    aal.currentLevel === "aal1" && aal.nextLevel === "aal1";

  const completeAuthentication = () => {
    toast.success("Logged in successfully");
    navigate("/");
  };

  const setupMFAVerification = async () => {
    const { data: factors, error: factorsError } = await listFactors();
    if (factorsError) throw factorsError;

    const totpFactor = factors.totp[0];
    if (!totpFactor) throw new Error("MFA factor not found");

    setFactorId(totpFactor.id);
    setIsOtpStep(true);
  };

  const handleAuthError = async (error) => {
    console.error("Login error:", error.message);
    toast.error(`Authentication failed`, {
      description: error.message || "An error occurred during authentication.",
    });
    await logout(); // Ensure user is logged out in case of any error
  };

  const handleOtpVerification = async (otp) => {
    setIsLoading(true);
    try {
      await verifyOtpAndCheckAAL(otp);
    } catch (error) {
      handleOtpError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtpAndCheckAAL = async (otp) => {
    const { error } = await challengeAndVerify(factorId, otp);
    if (error) throw error;

    const { data: aal, error: aalError } =
      await getAuthenticatorAssuranceLevel();
    if (aalError) throw aalError;

    if (!isFullyAuthenticated(aal)) {
      throw new Error("MFA verification failed to reach aal2");
    }

    completeAuthentication();
  };

  const handleOtpError = async (error) => {
    console.error("OTP verification error:", error.message);
    toast.error(`OTP verification failed`, {
      description: error.message || "Invalid OTP code.",
    });
    await logout();
  };

  const handleMFAEnrolled = async () => {
    try {
      const { data: aal, error: aalError } =
        await getAuthenticatorAssuranceLevel();
      if (aalError) throw aalError;

      if (isFullyAuthenticated(aal)) {
        completeAuthentication();
      } else {
        throw new Error("MFA enrollment failed to reach aal2");
      }
    } catch (error) {
      console.error("MFA enrollment error:", error.message);
      toast.error(`MFA enrollment failed`, {
        description:
          error.message || "An error occurred during MFA enrollment.",
      });
      await logout();
    }
  };

  const handleMFACancelled = async () => {
    setIsEnrollMFAStep(false);
    try {
      await logout();
      toast.info("MFA enrollment cancelled. Please sign in again.");
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("An error occurred while signing out.");
    }
  };

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
