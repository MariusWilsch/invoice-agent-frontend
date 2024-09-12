import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
// import QRCode from "../components/QRCode";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twofaObject, setTwofaObject] = useState({});
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [totpSecret, setTotpSecret] = useState("");

  useEffect(() => {
    checkTwoFactorStatus();
  }, []);

  const checkTwoFactorStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.factors) {
      if (user?.factors[0]?.status === "verified") {
        setTwofaObject(user?.factors[0]);
        setTwoFactorEnabled(true);
      } else {
        setTwofaObject(user?.factors[0]);
        ("the user has no factors verified");
        setTwoFactorEnabled(true);
      }
    } else {
      setTwoFactorEnabled(false);
    }
  };

  const handleToggle2FA = async () => {
    if (!twoFactorEnabled) {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      });

      setTwofaObject(data);

      if (error) {
        console.error("Error enrolling in 2FA:", error);
        return;
      }

      setQrCodeUrl(data.totp.qr_code);
      setSecret(data.totp.secret);
      setTwoFactorEnabled(true);
    } else {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: twofaObject.id });
      if (error) {
        console.error("Error disabling 2FA:", error);
        return;
      }
      setTwoFactorEnabled(false);
      setQrCodeUrl("");
      setSecret("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            id="two-factor"
            checked={twoFactorEnabled}
            onCheckedChange={handleToggle2FA}
          />
        </div>
        <Label htmlFor="two-factor" className="sr-only">
          Toggle two-factor authentication
        </Label>

        {qrCodeUrl && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">
              Scan this QR code with your authenticator app
            </h3>
            <img src={qrCodeUrl} alt="QR Code" />
            {/* <QRCode url={qrCodeUrl} /> */}
            <p className="mt-2 text-sm text-gray-600">
              If you cant scan the QR code, enter this code manually: {secret}
            </p>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                placeholder="input the secret"
                className="mt-4 border-black rounded-md p-2"
                value={totpSecret}
                onChange={(e) => setTotpSecret(e.target.value)}
              />
              <Button
                className="mt-4"
                onClick={async () => {
                  if (!totpSecret) return;
                  else if (totpSecret.length !== 6) {
                    toast.error("Please enter a valid 6-digit code");
                    return;
                  }
                  try {
                    const res = await supabase.auth.mfa.challengeAndVerify({
                      factorId: twofaObject.id,
                      code: totpSecret,
                    });
                  } catch (error) {
                    console.error("Error verifying 2FA:", error);
                  }
                }}
              >
                Verify and Enable 2FA
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
