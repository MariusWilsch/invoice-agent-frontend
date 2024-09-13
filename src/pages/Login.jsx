import { useState } from "react";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState("password");
  const { signInWithPassword, signInWithOtp, verifyOtp } = useSupabaseAuth();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [factorId, setFactorId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authMethod === "magic-link") {
        const { error } = await signInWithOtp({ email });
        if (error) throw error;
        toast.success(`Magic link sent successfully`, {
          description: "Please check your email for the login link.",
        });
      } else {
        const { error, data } = await signInWithPassword({ email, password });
        if (error) throw error;

        const totpFactor = data?.user?.factors?.find(factor => factor.factor_type === "totp");
        if (totpFactor) {
          setIs2FAEnabled(true);
          setFactorId(totpFactor.id);
        } else {
          toast.success("Logged in successfully");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(`Authentication failed`, {
        description: error.message || "An error occurred during authentication.",
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { error } = await verifyOtp({ factorId, code: otp });
      if (error) throw error;
      toast.success("2FA verified successfully");
      navigate("/");
    } catch (error) {
      console.error("OTP verification error:", error.message);
      toast.error(`OTP verification failed`, {
        description: error.message || "Invalid OTP code.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardContent>
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-gray-600 mb-6">Hi, Welcome back 👋</p>
          <div className="flex mb-4">
            <Button
              type="button"
              className={cn(
                "flex-1 rounded-r-none",
                authMethod === "password"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
              onClick={() => setAuthMethod("password")}
            >
              Password
            </Button>
            <Button
              type="button"
              className={cn(
                "flex-1 rounded-l-none",
                authMethod === "magic-link"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
              onClick={() => setAuthMethod("magic-link")}
            >
              Magic Link
            </Button>
          </div>
          <form onSubmit={is2FAEnabled ? handleVerifyOtp : handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="E.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {authMethod === "password" && !is2FAEnabled && (
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {is2FAEnabled && (
              <div>
                <Label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  One-Time Password (OTP)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            )}

            {!is2FAEnabled && authMethod === "password" && (
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </a>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {is2FAEnabled ? "Verify OTP" : authMethod === "magic-link" ? "Send Magic Link" : "Login"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;