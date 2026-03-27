"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Loader2,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { resetPasswordSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { resetPasswordAction } from "@/services/Auth/reset-password";
import { FormField } from "@/components/common/form";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3 flex flex-col items-center">
        <Label className="self-start text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Verification Code</Label>
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 backdrop-blur-sm group/otp relative text-white">
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
            <InputOTPSeparator className="text-zinc-700" />
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={3} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
              <InputOTPSlot index={4} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
              <InputOTPSlot index={5} className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-black bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500 rounded-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <div className="space-y-4">
        <FormField
          id="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
          icon={<Lock className="h-4 w-4" />}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-600 hover:text-indigo-500 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={form.formState.errors.newPassword?.message}
          {...form.register("newPassword")}
        />

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          icon={<Lock className="h-4 w-4" />}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-zinc-600 hover:text-indigo-500 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />
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
  );
}
