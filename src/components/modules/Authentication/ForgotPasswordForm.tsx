"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { forgotPasswordSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { forgotPasswordAction } from "@/services/Auth/forgotPassword";
import { FormField } from "@/components/common/form";

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const { executePost, isPending } = useActionHandler();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await executePost({
      action: () => forgotPasswordAction(data.email),
      success: {
        message: "Password reset code sent to your email",
        onSuccess: () => {
          router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
        },
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        icon={<Mail className="h-4 w-4" />}
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />
      <Button
        className="w-full h-12 bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] transition-all duration-300 group rounded-xl active:scale-[0.98]"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <div className="flex items-center justify-center gap-2">
            Send Reset Code
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </Button>
    </form>
  );
}
