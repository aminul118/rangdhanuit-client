"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { loginSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { loginAction } from "@/services/Auth/login";
import { ILogin } from "@/types";
import { FormField } from "@/components/common/form";

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

      <Button
        className="w-full h-12 bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] transition-all duration-300 group rounded-xl active:scale-[0.98]"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <div className="flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </Button>
    </form>
  );
}
