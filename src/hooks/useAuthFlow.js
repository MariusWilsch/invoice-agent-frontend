import { useState } from 'react';
import { useSupabaseAuth } from '@/integrations/supabase/auth.jsx';

const useAuthFlow = () => {
  const [factorId, setFactorId] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { enrollMFA, challengeMFA, verifyMFA } = useSupabaseAuth();

  const startMFAEnrollment = async () => {
    setError('');
    setIsLoading(true);
    try {
      const { data, error } = await enrollMFA();
      if (error) throw error;

      setFactorId(data.id);
      setQRCode(data.totp.qr_code);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyMFACode = async () => {
    setError('');
    setIsLoading(true);
    try {
      const challenge = await challengeMFA(factorId);
      if (challenge.error) throw challenge.error;

      const challengeId = challenge.data.id;

      const verify = await verifyMFA(factorId, challengeId, verificationCode);
      if (verify.error) throw verify.error;

      return true; // MFA verification successful
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetMFAState = () => {
    setFactorId('');
    setQRCode('');
    setVerificationCode('');
    setError('');
    setIsLoading(false);
  };

  return {
    factorId,
    qrCode,
    verificationCode,
    error,
    isLoading,
    setVerificationCode,
    startMFAEnrollment,
    verifyMFACode,
    resetMFAState,
  };
};

export default useAuthFlow;