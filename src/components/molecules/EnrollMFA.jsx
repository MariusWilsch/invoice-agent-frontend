import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthFlow from "@/hooks/useAuthFlow";

const EnrollMFA = ({ onEnrolled, onCancelled }) => {
  const {
    qrCode,
    verificationCode,
    error,
    isLoading,
    setVerificationCode,
    startMFAEnrollment,
    verifyMFACode,
    resetMFAState,
  } = useAuthFlow();

  useEffect(() => {
    startMFAEnrollment();
  }, []);

  const onEnableClicked = async () => {
    const success = await verifyMFACode();
    if (success) {
      onEnrolled();
    }
  };

  const handleCancel = () => {
    resetMFAState();
    onCancelled();
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-center">
        {qrCode && <img src={qrCode} alt="QR Code" className="w-64 h-64" />}
      </div>
      <div>
        <Label
          htmlFor="verifyCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Verification Code
        </Label>
        <Input
          id="verifyCode"
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.trim())}
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
