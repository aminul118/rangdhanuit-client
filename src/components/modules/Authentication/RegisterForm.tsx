"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Loader2,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { registerSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { registerAction } from "@/services/Auth/register";
import { FormField, SubmitButton } from "@/components/common/form";

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { executePost, isPending } = useActionHandler();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNo: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await executePost({
      action: () => registerAction(data),
      success: {
        message: "Registration successful! Please verify your email.",
        onSuccess: () => {
          router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
        },
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        id="name"
        label="Full Name"
        placeholder="Aminul Islam"
        icon={<UserIcon className="h-4 w-4" />}
        error={form.formState.errors.name?.message}
        {...form.register("name")}
      />

      <FormField
        id="contactNo"
        label="Contact No"
        placeholder="+88017..."
        icon={<Phone className="h-4 w-4" />}
        error={form.formState.errors.contactNo?.message}
        {...form.register("contactNo")}
      />

      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="aminul@rangdhanu.it"
        icon={<Mail className="h-4 w-4" />}
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />

      <FormField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-600 hover:text-indigo-500 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        error={form.formState.errors.password?.message}
        {...form.register("password")}
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
            className="text-zinc-600 hover:text-indigo-500 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        error={form.formState.errors.confirmPassword?.message}
        {...form.register("confirmPassword")}
      />

      <SubmitButton
        label="Create Account"
        isLoading={isPending}
        iconRight={<ArrowRight className="h-5 w-5" />}
        className="mt-2"
      />
    </form>
  );
}
