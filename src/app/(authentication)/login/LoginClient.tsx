"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
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
import { useAuth } from "@/providers/AuthProvider";
import { loginSchema } from "@/zod/auth.validation";
import useActionHandler from "@/hooks/useActionHandler";
import { loginAction } from "@/services/Auth/login";
import { ILogin } from "@/types";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
    <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-screen overflow-hidden selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative hidden h-full flex-col bg-zinc-950 p-10 text-white lg:flex border-r border-zinc-800/50">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-zinc-950 to-black overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[32px_32px]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 via-transparent to-purple-500/10"
          />
        </div>
        
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 bg-linear-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 ring-2 ring-white/10"
            >
              <span className="text-white font-black text-2xl tracking-tighter">R</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight text-white leading-none">
                Rangdhanu
              </span>
              <span className="text-indigo-400 text-xs font-black tracking-widest uppercase mt-0.5">
                Innovations
              </span>
            </div>
          </Link>
        </div>

        <div className="relative z-20 mt-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="h-1 w-12 bg-indigo-500 rounded-full" />
              <h2 className="text-4xl font-bold tracking-tight">
                Empowering your <br />
                <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent underline underline-offset-8 decoration-indigo-500/30">Digital Journey</span>
              </h2>
            </div>
            <blockquote className="space-y-4">
              <p className="text-lg font-light text-zinc-400 leading-relaxed">
                Experience the next generation of IT solutions. We craft seamless digital experiences that drive growth and innovation.
              </p>
              <footer className="flex items-center gap-2 text-indigo-400 font-medium tracking-wide">
                <ShieldCheck className="w-5 h-5" />
                Trusted by 500+ Businesses
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>

      <div className="relative lg:p-8 flex items-center justify-center min-h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-2 text-center"
          >
            <h1 className="text-4xl font-black tracking-tight text-zinc-100 italic">
              WELCOME BACK
            </h1>
            <p className="text-sm text-zinc-500 font-medium">
              Access your personalized workspace
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-border/30 bg-zinc-950/40 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-t-white/10 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
              
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                <CardDescription className="text-zinc-500">
                  Enter your credentials to continue
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                      Email Address
                    </Label>
                    <div className="relative group/input">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600 transition-colors group-focus-within/input:text-indigo-500" />
                      <Input
                        id="email"
                        placeholder="aminul@rangdhanu.it"
                        type="email"
                        autoComplete="email"
                        className="pl-11 h-12 bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 focus:border-indigo-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                        {...form.register("email")}
                      />
                      <AnimatePresence mode="wait">
                        {form.formState.errors.email && (
                          <motion.p 
                            key="email-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-red-400 mt-1.5 ml-1 font-medium"
                          >
                            {form.formState.errors.email.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                        Secure Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative group/input">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600 transition-colors group-focus-within/input:text-indigo-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        autoComplete="current-password"
                        className="pl-11 h-12 bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 focus:border-indigo-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                        {...form.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-zinc-600 hover:text-indigo-500 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <AnimatePresence mode="wait">
                        {form.formState.errors.password && (
                          <motion.p 
                            key="password-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-red-400 mt-1.5 ml-1 font-medium"
                          >
                            {form.formState.errors.password.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
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
                        Get Started
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 border-t border-zinc-900/50 pt-5 mt-4 bg-zinc-900/20">
                <div className="text-sm text-center text-zinc-500 font-medium">
                  New to our platform?{" "}
                  <Link
                    href="/register"
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors flex items-center justify-center gap-1 mt-1 group/link"
                  >
                    Create your account 
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black"
          >
            Secured by Rangdhanu IT Shield
          </motion.p>
        </div>
      </div>
    </div>
  );
}
