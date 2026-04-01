"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { resetPasswordSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { FormField, SubmitButton } from "@/components/common/form";
import { resetPasswordAction } from "@/services/Auth/reset-password";
import useSearchParamsValues from "@/hooks/useSearchParamsValues";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const { values, router } = useSearchParamsValues("token", "email");
  const token = values.token || "";
  const email = values.email || "";

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

  const onSubmit = async (data: ResetPasswordFormValues) => {
    await executePost({
      action: () =>
        resetPasswordAction({
          email,
          token,
          newPassword: data.newPassword,
        }),
      success: {
        message: "Password reset successful! You can now login.",
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="newPassword"
        label="New Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-600 hover:text-indigo-500 transition-colors flex items-center justify-center h-full pr-1"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        error={form.formState.errors.newPassword?.message}
        size="xl"
        {...form.register("newPassword")}
      />

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-zinc-600 hover:text-indigo-500 transition-colors flex items-center justify-center h-full pr-1"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        error={form.formState.errors.confirmPassword?.message}
        size="xl"
        {...form.register("confirmPassword")}
      />

      <SubmitButton
        label="Reset Secure Key"
        isLoading={isPending}
        size="xl"
        iconRight={<ArrowRight className="h-5 w-5" />}
      />
    </form>
  );
}
