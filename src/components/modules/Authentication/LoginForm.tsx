"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { loginSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { loginAction } from "@/services/Auth/login";
import { ILogin } from "@/types";
import { FormField, SubmitButton } from "@/components/common/form";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { executePost, isPending } = useActionHandler();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await executePost({
      action: () => loginAction(data),
      success: {
        message: "Welcome back! Login successful",
        onSuccess: (loginData: ILogin | null | undefined) => {
          if (loginData?.user) setUser(loginData.user);
          router.push("/dashboard");
        },
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="aminul@rangdhanu.it"
        autoComplete="email"
        icon={<Mail className="h-4 w-4" />}
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
            Secure Password
          </span>
          <Link
            href="/forgot-password"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
          >
            Forgot?
          </Link>
        </div>
        <FormField
          id="password"
          label=""
          type={showPassword ? "text" : "password"}
          placeholder="••••••••••••"
          autoComplete="current-password"
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
          wrapperClassName="!space-y-0"
          {...form.register("password")}
        />
      </div>

      <SubmitButton
        label="Get Started"
        isLoading={isPending}
        iconRight={<ArrowRight className="h-5 w-5" />}
      />
    </form>
  );
}
