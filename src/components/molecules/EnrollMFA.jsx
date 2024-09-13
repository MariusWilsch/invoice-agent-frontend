import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";

const EnrollMFA = ({ onEnrolled, onCancelled }) => {
  const [factorId, setFactorId] = useState('');
  const [qr, setQR] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { enrollMFA, challengeMFA, verifyMFA } = useSupabaseAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await enrollMFA();
        if (error) throw error;

        setFactorId(data.id);
        setQR(data.totp.qr_code);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [enrollMFA]);

  const onEnableClicked = async () => {
    setError('');
    setIsLoading(true);
    try {
      const challenge = await challengeMFA(factorId);
      if (challenge.error) throw challenge.error;

      const challengeId = challenge.data.id;

      const verify = await verifyMFA(factorId, challengeId, verifyCode);
      if (verify.error) throw verify.error;

      onEnrolled();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancelled();
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-center">
        {qr && <img src={qr} alt="QR Code" className="w-64 h-64" />}
      </div>
      <div>
        <Label htmlFor="verifyCode" className="block text-sm font-medium text-gray-700 mb-1">
          Verification Code
        </Label>
        <Input
          id="verifyCode"
          type="text"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value.trim())}
          placeholder="Enter verification code"
          className="w-full"
        />
      </div>
      <div className="flex space-x-4">
        <Button
          onClick={onEnableClicked}
          disabled={isLoading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
        >
          {isLoading ? "Enabling..." : "Enable"}
        </Button>
        <Button
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EnrollMFA;