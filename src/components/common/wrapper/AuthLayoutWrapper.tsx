"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AnimatedGradientBg,
  FadeInLeft,
  FadeInScale,
  FadeIn,
  HoverScaleLogo,
} from "@/components/modules/Authentication/AuthAnimations";

interface AuthLayoutWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLinkLabel: string;
  quoteTitle: string;
  quoteHighlight: string;
  quoteText: string;
  quoteFooter: string;
  cardWidth?: string;
  headerIcon?: ReactNode;
  headerClassName?: string;
}

export function AuthLayoutWrapper({
  children,
  title,
  description,
  footerText,
  footerLink,
  footerLinkLabel,
  quoteTitle,
  quoteHighlight,
  quoteText,
  quoteFooter,
  headerIcon,
  headerClassName = "space-y-1 pb-4",
  cardWidth = "sm:w-[420px]",
}: AuthLayoutWrapperProps) {
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
                {quoteTitle} <br />
                <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent underline underline-offset-8 decoration-indigo-500/30">
                  {quoteHighlight}
                </span>
              </h2>
            </div>
            <blockquote className="space-y-4">
              <p className="text-lg font-light text-zinc-400 leading-relaxed">
                {quoteText}
              </p>
              <footer className="flex items-center gap-2 text-indigo-400 font-medium tracking-wide">
                <ShieldCheck className="w-5 h-5" />
                {quoteFooter}
              </footer>
            </blockquote>
          </FadeInLeft>
        </div>
      </div>

      {/* ===== RIGHT PANEL (scrollable) ===== */}
      <div className="relative overflow-y-auto h-screen flex flex-col bg-black lg:bg-transparent">
        <div className={`mx-auto flex w-full flex-col justify-center my-auto space-y-6 ${cardWidth} px-6 py-12`}>
          <FadeInScale delay={0.1}>
            <Card className="border-border/30 bg-zinc-950/40 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-t-white/10 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

              <CardHeader className={headerClassName}>
                {headerIcon && (
                  <FadeInScale
                    delay={0.2}
                    className="mx-auto w-16 h-16 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-inner"
                  >
                    {headerIcon}
                  </FadeInScale>
                )}
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription className="text-zinc-500">
                  {description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {children}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 border-t border-zinc-900/50 pt-5 mt-4 bg-zinc-900/20">
                <div className="text-sm text-center text-zinc-500 font-medium">
                  {footerText}{" "}
                  <Link
                    href={footerLink}
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors flex items-center justify-center gap-1 mt-1 group/link"
                  >
                    {footerLinkLabel}
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </FadeInScale>

          <FadeIn delay={0.8}>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black">
              Secured by Rangdhanu IT Shield
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
