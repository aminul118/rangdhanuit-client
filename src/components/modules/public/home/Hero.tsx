"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  ChevronRight,
  Code2,
  Sparkles,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  FADE_IN_UP,
  STAGGER_CHILDREN,
  VIEWPORT_CONFIG,
} from "@/constants/animations";
import { TechBackground } from "./TechBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden text-foreground selection:bg-primary/20 transition-colors duration-500">
      <TechBackground />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={STAGGER_CHILDREN}
            initial="initial"
            whileInView="animate"
            viewport={VIEWPORT_CONFIG}
            className="flex flex-col items-start text-left"
          >
            {/* Minimal High-Tech Badge */}
            <motion.div
              variants={FADE_IN_UP}
              className="group cursor-default inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Innovation Agency 2026
              </span>
              <ChevronRight className="w-3 h-3 text-primary/40 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>

            {/* High-Impact Typography */}
            <motion.div
              variants={FADE_IN_UP}
              className="relative mb-8 text-foreground"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-sans font-black tracking-[-0.04em] leading-[0.9] italic">
                <span className="block">REDEFINING</span>
                <span className="block bg-linear-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  DIGITAL
                </span>
                <span className="block outline-text-theme text-transparent">
                  HORIZONS
                </span>
              </h1>
            </motion.div>

            {/* Clean Tech Description */}
            <motion.p
              variants={FADE_IN_UP}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-12"
            >
              Rangdhanu IT architecting the future of software. We bridge the
              gap between complex engineering and seamless user experiences.
            </motion.p>

            {/* Next.js Styled CTAs */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full"
            >
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
            </motion.div>

            {/* Sub-Feature Indicators - Mobile Optimized */}
            <motion.div
              variants={FADE_IN_UP}
              className="mt-12 md:mt-16 flex flex-wrap gap-6 md:gap-8 justify-start"
            >
              {[
                { icon: Zap, label: "Performance" },
                { icon: ShieldCheck, label: "Security" },
                { icon: Globe, label: "Scalability" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground/60 hover:text-primary transition-colors cursor-default"
                >
                  <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {item.label}
                </div>
              ))}
            </motion.div>

            {/* Mobile-Only Metrics Grid */}
            <motion.div
              variants={FADE_IN_UP}
              className="mt-12 grid grid-cols-2 gap-4 w-full lg:hidden"
            >
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
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Main Interactive Card */}
            <div className="relative z-10 p-8 rounded-3xl bg-card/40 border border-border/50 backdrop-blur-2xl shadow-2xl overflow-hidden group transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
                </div>
                <Code2 className="w-6 h-6 text-primary" />
              </div>

              <div className="space-y-4">
                <div className="h-2 w-3/4 bg-foreground/5 rounded-full" />
                <div className="h-2 w-full bg-foreground/5 rounded-full" />
                <div className="h-2 w-1/2 bg-foreground/5 rounded-full" />
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="h-20 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      Innovation
                    </span>
                  </div>
                  <div className="h-20 bg-muted/30 rounded-2xl border border-border flex flex-col items-center justify-center gap-2">
                    <Rocket className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      Velocity
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 p-6 rounded-2xl bg-violet-500/10 dark:bg-violet-600/20 border border-violet-500/20 dark:border-violet-500/30 backdrop-blur-xl shadow-xl z-20"
            >
              <div className="text-2xl font-black italic text-violet-600 dark:text-violet-400">
                100+
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-violet-400 opacity-80">
                Projects Done
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-8 -left-12 p-6 rounded-2xl bg-blue-500/10 dark:bg-blue-600/20 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl shadow-xl z-20"
            >
              <div className="text-2xl font-black italic text-blue-600 dark:text-blue-400">
                99.9%
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-blue-400 opacity-80">
                Client Satisfaction
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* CSS for Theme-Aware Outline Text */}
      <style jsx global>{`
        .outline-text-theme {
          -webkit-text-stroke: 1px hsl(var(--foreground) / 0.3);
        }
        @media (max-width: 768px) {
          .outline-text-theme {
            -webkit-text-stroke: 0.5px hsl(var(--foreground) / 0.3);
          }
        }
      `}</style>

      {/* Modern Centered Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Discover
        </span>
        <div className="w-px h-16 bg-linear-to-b from-primary via-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
