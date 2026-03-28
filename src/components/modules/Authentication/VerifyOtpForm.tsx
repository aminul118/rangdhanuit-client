"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, ArrowRight } from "lucide-react";

import { SubmitButton } from "@/components/common/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { ILogin } from "@/types";
import useActionHandler from "@/hooks/useActionHandler";
import { verifyOTPAction } from "@/services/Auth/otp/verify-otp";
import { sendOTPAction } from "@/services/Auth/otp/send-otp";

export function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { setUser } = useAuth();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const { executePost, isPending } = useActionHandler();
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    await executePost({
      action: () => verifyOTPAction({ email, otp }),
      success: {
        message: "Email verified successfully! Welcome aboard.",
        onSuccess: (loginData: ILogin | null | undefined) => {
          if (loginData?.user) setUser(loginData.user);
          router.push("/dashboard");
        },
      },
      errorMessage:
        "The verification code you entered is incorrect or expired.",
    });
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await executePost({
        action: () => sendOTPAction(email),
        success: {
          message: "A new verification code has been sent to your email.",
          onSuccess: () => {
            setTimer(60);
          },
        },
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Verification Code</Label>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          autoFocus
          className="gap-3"
        >
          <InputOTPGroup className="gap-2">
            <InputOTPSlot
              index={0}
              className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg"
            />
            <InputOTPSlot
              index={1}
              className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg"
            />
            <InputOTPSlot
              index={2}
              className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg"
            />
          </InputOTPGroup>
          <InputOTPSeparator className="text-zinc-700" />
          <InputOTPGroup className="gap-2">
            <InputOTPSlot
              index={3}
              className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg"
            />
            <InputOTPSlot
              index={4}
              className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg"
            />
            <InputOTPSlot
              index={5}
              className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg text-white"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <SubmitButton
        label="Verify & Continue"
        isLoading={isPending || isResending}
        onClick={handleVerify}
        disabled={otp.length !== 6}
        iconRight={<ArrowRight className="h-5 w-5" />}
      />

      <div className="text-sm text-center text-zinc-500 font-medium w-full pt-4">
        Didn&apos;t receive the code?{" "}
        {timer > 0 ? (
          <span className="text-indigo-400 font-bold whitespace-nowrap bg-indigo-500/10 px-2 py-0.5 rounded-full ml-1">
            Resend in {timer}s
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending || isPending}
            className="text-indigo-400 hover:text-indigo-300 font-black transition-all underline underline-offset-4 decoration-indigo-500/30 hover:decoration-indigo-500 flex items-center justify-center gap-2 mx-auto mt-2 group/resend"
          >
            {isResending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4 group-hover/resend:scale-110 transition-transform" />
            )}
            {isResending ? "Sending..." : "Request New Code"}
          </button>
        )}
      </div>
    </>
  );
}
