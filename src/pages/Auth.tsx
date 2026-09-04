import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import { Leaf, ArrowRight, Loader2, Mail, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(returnTo: string | null, fallback = "/auth-role") {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) return returnTo;
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(searchParams.get("returnTo"), redirectAfterAuth);
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate(redirect);
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send verification code.");
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch {
      setError("The verification code you entered is incorrect.");
      setOtp("");
    }
    setIsLoading(false);
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      setError(`Failed to sign in as guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f2] via-white to-emerald-50 flex items-center justify-center">
      <Card className="min-w-[360px] max-w-[400px] border-emerald-100 shadow-lg">
        {step === "signIn" ? (
          <>
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 cursor-pointer" onClick={() => navigate("/")}>
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-emerald-900">Welcome to KisanTrack</CardTitle>
              <CardDescription className="text-emerald-600/70">Enter your email to get started</CardDescription>
            </CardHeader>
            <form onSubmit={handleEmailSubmit}>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                    <Input name="email" placeholder="name@example.com" type="email"
                      className="pl-9 border-emerald-200 focus:border-emerald-500" disabled={isLoading} required />
                  </div>
                  <Button type="submit" variant="outline" size="icon" disabled={isLoading}
                    className="border-emerald-200 hover:bg-emerald-50">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-emerald-100" /></div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-emerald-500">Or</span>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full mt-4 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={handleGuestLogin} disabled={isLoading}>
                    <UserX className="mr-2 h-4 w-4" /> Continue as Guest
                  </Button>
                </div>
              </CardContent>
            </form>
          </>
        ) : (
          <>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-emerald-900">Check your email</CardTitle>
              <CardDescription className="text-emerald-600/70">We've sent a code to {step.email}</CardDescription>
            </CardHeader>
            <form onSubmit={handleOtpSubmit}>
              <CardContent className="pb-4">
                <input type="hidden" name="email" value={step.email} />
                <input type="hidden" name="code" value={otp} />
                <div className="flex justify-center">
                  <InputOTP value={otp} onChange={setOtp} maxLength={6} disabled={isLoading}
                    onKeyDown={(e) => { if (e.key === "Enter" && otp.length === 6 && !isLoading) { const form = (e.target as HTMLElement).closest("form"); if (form) form.requestSubmit(); } }}>
                    <InputOTPGroup>{Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>
                  </InputOTP>
                </div>
                {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
                <p className="text-sm text-emerald-600/70 text-center mt-4">
                  Didn't receive a code?{" "}
                  <Button variant="link" className="p-0 h-auto text-emerald-600" onClick={() => setStep("signIn")}>Try again</Button>
                </p>
              </CardContent>
              <CardFooter className="flex-col gap-2 pb-6">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isLoading || otp.length !== 6}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifying...</> : <><span>Verify code</span><ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setStep("signIn")} disabled={isLoading} className="w-full text-emerald-600">
                  Use different email
                </Button>
              </CardFooter>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return <Suspense><Auth {...props} /></Suspense>;
}
