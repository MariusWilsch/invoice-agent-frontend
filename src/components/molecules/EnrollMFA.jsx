import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EnrollMFA = ({ qrCode, onEnrolled, onCancelled, isLoading }) => {
  const [verifyCode, setVerifyCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnrolled(verifyCode);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {qrCode && <img src={qrCode} alt="QR Code" className="w-64 h-64" />}
      </div>
      <form onSubmit={handleSubmit}>
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
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value.trim())}
            placeholder="Enter verification code"
            className="w-full"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? "Enabling..." : "Enable"}
          </Button>
          <Button
            onClick={onCancelled}
            disabled={isLoading}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnrollMFA;
