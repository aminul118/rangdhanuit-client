"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Loader2,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import { resetPasswordSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { resetPasswordAction } from "@/services/Auth/reset-password";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { executePost, isPending } = useActionHandler();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (otp.length !== 6) {
      return;
    }

    await executePost({
      action: () =>
        resetPasswordAction({
          email,
          otp,
          newPassword: values.newPassword,
        }),
      success: {
        message: "Password reset successful! Please login.",
        onSuccess: () => {
          router.push("/login");
        },
      },
      errorMessage: "Verification code is invalid or expired",
    });
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
            <CardTitle className="text-3xl font-black tracking-tight text-zinc-100 italic uppercase">Reset Password</CardTitle>
            <CardDescription className="text-zinc-500 font-medium px-4">
              Enter the code sent to <span className="text-indigo-400 font-bold">{email}</span> and choose a strong new password.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3 flex flex-col items-center">
                <Label className="self-start text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Verification Code</Label>
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 backdrop-blur-sm group/otp relative">
                   <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-focus-within/otp:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                   <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    className="gap-3"
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
                      <InputOTPSlot index={1} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
                      <InputOTPSlot index={2} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={3} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
                      <InputOTPSlot index={4} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
                      <InputOTPSlot index={5} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">New Password</Label>
                  <div className="relative group/input">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600 transition-colors group-focus-within/input:text-indigo-500" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      className="pl-11 h-12 bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 focus:border-indigo-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                      {...form.register("newPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-zinc-600 hover:text-indigo-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {form.formState.errors.newPassword && (
                      <p className="text-xs text-red-400 mt-1.5 ml-1 font-medium">{form.formState.errors.newPassword.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Confirm Password</Label>
                  <div className="relative group/input">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600 transition-colors group-focus-within/input:text-indigo-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-11 h-12 bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 focus:border-indigo-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                      {...form.register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3.5 text-zinc-600 hover:text-indigo-500 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {form.formState.errors.confirmPassword && (
                      <p className="text-xs text-red-400 mt-1.5 ml-1 font-medium">{form.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-12 bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] transition-all duration-300 group rounded-xl active:scale-[0.98]"
                disabled={isPending}
                type="submit"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Reset Password
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-zinc-900/50 pt-6 mt-4 bg-zinc-900/20">
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-vh-screen items-center justify-center bg-zinc-950">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-500/50" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
