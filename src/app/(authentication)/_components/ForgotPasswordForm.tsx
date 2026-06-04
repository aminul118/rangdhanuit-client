"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowRight } from "lucide-react";
import { forgotPasswordSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { forgotPasswordAction } from "@/services/Auth/forgotPassword";
import { FormField, SubmitButton } from "@/components/common/form";

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
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
        message: "Recovery link sent! Check your inbox.",
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="email"
        label="Email Identity"
        type="email"
        placeholder="john@email.com"
        autoComplete="email"
        icon={<Mail className="h-4 w-4" />}
        error={form.formState.errors.email?.message}
        size="xl"
        {...form.register("email")}
      />

      <SubmitButton
        label="Reset Secure Key"
        isLoading={isPending}
        size="xl"
        iconRight={<ArrowRight className="h-5 w-5" />}
      />
    </form>
  );
};
