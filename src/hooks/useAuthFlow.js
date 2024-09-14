import { useState } from "react";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useAuthFlow = () => {
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

  const handleSignUp = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { error } = await signUp({ email, password });
      if (error) throw error;

      // Directly proceed to MFA enrollment
      const { data: mfaData, error: mfaError } = await enrollMFA();
      if (mfaError) throw mfaError;

      setQrCodeUrl(mfaData.totp.qr_code);
      setSecret(mfaData.totp.secret);
      setIsEnrollMFAStep(true);
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
    await logout();
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

  return {
    isOtpStep,
    isEnrollMFAStep,
    isLoading,
    handleSignIn,
    handleOtpVerification,
    handleMFAEnrolled,
    handleMFACancelled,
  };
};

export default useAuthFlow;
