"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { loginSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { loginAction } from "@/services/Auth/login";
import { ApiResponse, ILogin } from "@/types";
import { FormField, SubmitButton } from "@/components/common/form";
import { toast } from "sonner";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { executePost, isPending } = useActionHandler();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await executePost({
      action: () => loginAction(data),
      success: {
        message: "Welcome back! Login successful",
        onSuccess: (loginData: ILogin | null | undefined) => {
          if (loginData?.user) setUser(loginData.user);
          router.push(redirect);
        },
      },
      onError: (errorResponse: ApiResponse<ILogin | null>) => {
        if (errorResponse?.message === "USER_NOT_VERIFIED") {
          toast.warning("Your account is not verified. An OTP has been sent to your email.");
          const verifyPath = `/verify-otp?email=${encodeURIComponent(data.email)}${searchParams.get("redirect")
              ? `&redirect=${encodeURIComponent(searchParams.get("redirect")!)}`
              : ""
            }`;
          router.push(verifyPath);
          return true; // Mark as handled to prevent default error toast if desired
        }
        return false;
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="john@email.com"
        autoComplete="email"
        icon={<Mail className="h-4 w-4" />}
        error={form.formState.errors.email?.message}
        size="xl"
        {...form.register("email")}
      />

      <FormField
        id="password"
        label="Secure Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••••••"
        autoComplete="current-password"
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
        error={form.formState.errors.password?.message}
        size="xl"
        {...form.register("password")}
      />
      <div className="flex justify-end -mt-4">
        <Link
          href="/forgot-password"
          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-black uppercase tracking-widest transition-colors mr-2"
        >
          Forgot Password?
        </Link>
      </div>

      <SubmitButton
        label="Get Started"
        isLoading={isPending}
        size="xl"
        iconRight={<ArrowRight className="h-5 w-5" />}
      />
    </form>
  );
};
