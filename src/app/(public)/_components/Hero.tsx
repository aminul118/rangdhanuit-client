"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TechBackground } from "./TechBackground";
import CodeWindow from "./CodeWindow";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background text-foreground selection:bg-primary/20 transition-colors duration-500">
      <TechBackground />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content: first on mobile, first on lg */}
          <div className="flex flex-col items-start text-left lg:order-1">
            {/* Minimal High-Tech Badge */}
            <div className="group cursor-default inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Innovation Software Agency
              </span>
              <ChevronRight className="w-3 h-3 text-primary/40 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* High-Impact Typography */}
            <div className="relative mb-8 text-foreground">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-sans font-black tracking-[-0.04em] leading-[0.9] italic">
                <span className="block">REDEFINING</span>
                <span className="block bg-linear-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  DIGITAL
                </span>
                <span className="block outline-text-theme text-transparent">
                  HORIZONS
                </span>
              </h1>
            </div>

            {/* Clean Tech Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-12">
              Rangdhanu IT architecting the future of software. We bridge the
              gap between complex engineering and seamless user experiences.
            </p>

            {/* Next.js Styled CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full">
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.5)] hover:scale-105 active:scale-95"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-card/50 border border-border/50 backdrop-blur-md text-foreground rounded-xl font-bold text-base md:text-lg hover:bg-card/80 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
              >
                Explore Works
              </Link>
            </div>

            {/* Mobile-Only Metrics Grid */}
            <div className="mt-12 grid grid-cols-2 gap-4 w-full lg:hidden">
              <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-xl">
                <div className="text-xl font-black italic text-violet-600 dark:text-violet-400">
                  100+
                </div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-violet-400 opacity-80">
                  Projects
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl">
                <div className="text-xl font-black italic text-blue-600 dark:text-blue-400">
                  99.9%
                </div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-blue-400 opacity-80">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Elements: second on mobile, second on lg */}
          <div className="relative lg:order-2">
            <CodeWindow />

            {/* Decorative Floating Elements (Metrics) */}
            <div className="hidden lg:block will-change-transform absolute -top-12 -right-12 p-6 rounded-2xl bg-violet-500/10 dark:bg-violet-600/20 border border-violet-500/20 dark:border-violet-500/30 backdrop-blur-xl shadow-xl z-20">
              <div className="text-2xl font-black italic text-violet-600 dark:text-violet-400">
                100+
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-violet-400 opacity-80">
                Projects Done
              </div>
            </div>

            <div className="hidden lg:block will-change-transform absolute -bottom-8 -left-12 p-6 rounded-2xl bg-blue-500/10 dark:bg-blue-600/20 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl shadow-xl z-20">
              <div className="text-2xl font-black italic text-blue-600 dark:text-blue-400">
                99.9%
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-blue-400 opacity-80">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
