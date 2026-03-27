"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { ILogin } from "@/types";
import useActionHandler from "@/hooks/useActionHandler";
import { verifyOTPAction } from "@/services/Auth/otp/verify-otp";
import { sendOTPAction } from "@/services/Auth/otp/send-otp";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { setUser } = useAuth();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const { executePost, isPending } = useActionHandler();
  // We use a separate state for resending to not conflict with isPending of verify
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
    <div className="container relative flex items-center justify-center min-vh-screen overflow-hidden py-12 selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-border/30 bg-zinc-950/40 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-t-white/10 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-16 h-16 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-inner"
            >
              <ShieldCheck className="h-8 w-8 text-indigo-400" />
            </motion.div>
            <CardTitle className="text-3xl font-black tracking-tight text-zinc-100 italic uppercase">
              Verify Email
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium px-4">
              We&apos;ve sent a security code to{" "}
              <span className="text-indigo-400 font-bold">{email}</span>. Enter
              it to verify your identity.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center space-y-8 pt-8 px-8">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm group/otp relative w-full flex justify-center">
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-focus-within/otp:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
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
                    className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full h-12 bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] transition-all duration-300 group rounded-xl active:scale-[0.98]"
              disabled={isPending || otp.length !== 6 || isResending}
              onClick={handleVerify}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Verify & Continue
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6 pb-8 border-t border-zinc-900/50 pt-6 mt-4 bg-zinc-900/20">
            <div className="text-sm text-center text-zinc-500 font-medium">
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

            <Link
              href="/login"
              className="flex items-center text-sm text-zinc-500 hover:text-indigo-400 font-bold transition-all group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Secure Login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-vh-screen items-center justify-center bg-zinc-950">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-500/50" />
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
