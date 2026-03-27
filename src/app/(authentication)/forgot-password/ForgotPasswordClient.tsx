"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, Mail, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";

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
import Link from "next/link";

import { forgotPasswordSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { forgotPasswordAction } from "@/services/Auth/forgotPassword";

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
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
    <div className="container relative flex items-center justify-center min-vh-screen overflow-hidden py-12 selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
              <KeyRound className="h-8 w-8 text-indigo-400" />
            </motion.div>
            <CardTitle className="text-3xl font-black tracking-tight text-zinc-100 italic uppercase">Forgot Password?</CardTitle>
            <CardDescription className="text-zinc-500 font-medium px-4">
              No worries, it happens. Enter your email and we&apos;ll get you back in.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</Label>
                <div className="relative group/input">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600 transition-colors group-focus-within/input:text-indigo-500" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    className="pl-11 h-12 bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 focus:border-indigo-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-1.5 ml-1 font-medium"
                    >
                      {form.formState.errors.email.message}
                    </motion.p>
                  )}
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
                    Send Reset Code
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
