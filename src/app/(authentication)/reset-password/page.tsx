import { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/modules/Authentication/ResetPasswordForm';
import { redirect } from 'next/navigation';
import { EmailDisplay } from '@/components/modules/Authentication/EmailDisplay';
import generateMetaTags from '@/Seo/generateMetaTags';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  FadeInLeft,
  FadeInScale,
  FadeInScale as FadeInLogo,
  AnimatedGradientBg,
  HoverScaleLogo,
} from "@/components/modules/Authentication/AuthAnimations";

export const metadata: Metadata = generateMetaTags({
  title: "Reset Password | Rangdhanu IT",
  description: "Set a new password for your Rangdhanu IT account.",
  keywords: "reset password, new password, account security",
});

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const email = typeof resolvedSearchParams.email === 'string' ? resolvedSearchParams.email : '';

  if (!email) {
    redirect('/forgot-password');
  }

  return (
    <div className="relative grid lg:max-w-none lg:grid-cols-2 h-screen overflow-hidden selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* ===== LEFT PANEL (fixed) ===== */}
      <div className="sticky top-0 h-screen hidden flex-col bg-zinc-950 p-10 text-white lg:flex border-r border-zinc-800/50">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-zinc-950 to-black overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[32px_32px]" />
          <AnimatedGradientBg />
        </div>

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center gap-3 group">
            <HoverScaleLogo className="w-12 h-12 bg-linear-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 ring-2 ring-white/10">
              <span className="text-white font-black text-2xl tracking-tighter">R</span>
            </HoverScaleLogo>
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
          <FadeInLeft className="space-y-6">
            <div className="space-y-2">
              <div className="h-1 w-12 bg-indigo-500 rounded-full" />
              <h2 className="text-4xl font-bold tracking-tight">
                Secure your <br />
                <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent underline underline-offset-8 decoration-indigo-500/30">
                  New Credentials
                </span>
              </h2>
            </div>
            <blockquote className="space-y-4">
              <p className="text-lg font-light text-zinc-400 leading-relaxed">
                You&apos;re almost back in! Choose a strong, unique password to protect your account and resume your work.
              </p>
              <footer className="flex items-center gap-2 text-indigo-400 font-medium tracking-wide">
                <ShieldCheck className="w-5 h-5" />
                Encrypted Connection
              </footer>
            </blockquote>
          </FadeInLeft>
        </div>
      </div>

      {/* ===== RIGHT PANEL (scrollable) ===== */}
      <div className="relative overflow-y-auto h-screen flex flex-col">
        <div className="mx-auto flex w-full flex-col justify-center my-auto space-y-6 sm:w-[420px] px-6 py-12">


          <FadeInScale delay={0.1}>
            <Card className="border-border/30 bg-zinc-950/40 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-t-white/10 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
              
              <CardHeader className="text-center pb-2">
                <FadeInLogo delay={0.2} className="mx-auto w-16 h-16 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-inner">
                  <ShieldCheck className="h-8 w-8 text-indigo-400" />
                </FadeInLogo>
                <CardTitle className="text-3xl font-black tracking-tight text-zinc-100 italic uppercase">
                  Reset Password
                </CardTitle>
                <CardDescription className="text-zinc-500 font-medium px-4">
                  Enter the code sent to <EmailDisplay /> and choose a strong new password.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-8">
                <Suspense fallback={<div className="flex justify-center p-4"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></span></div>}>
                  <ResetPasswordForm />
                </Suspense>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-zinc-900/50 pt-6 mt-4 bg-zinc-900/20">
                <Link
                  href="/login"
                  className="flex items-center text-sm text-zinc-500 hover:text-indigo-400 font-bold transition-all group lg:justify-center justify-start ml-[80px] lg:ml-0"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Secure Login
                </Link>
              </CardFooter>
            </Card>
          </FadeInScale>
        </div>
      </div>
    </div>
  );
}
