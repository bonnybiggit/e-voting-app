"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function OtpForm() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async () => {
    if (value.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Identity verified! Redirecting to voting dashboard...");
    navigate("/dashboard");
  };

  const handleResend = async () => {
    setResendLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResendLoading(false);
    toast.success("A new OTP has been sent to your email.");
    setValue("");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        onComplete={handleVerify}
        className="justify-center"
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} className="h-12 w-11 text-lg" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={handleVerify}
        disabled={loading || value.length < 6}
        className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-semibold"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          onClick={handleResend}
          disabled={resendLoading}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Demo: Enter any 6-digit code to proceed.
      </p>
    </div>
  );
}
