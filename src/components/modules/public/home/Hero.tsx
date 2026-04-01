"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, STAGGER_CHILDREN } from "@/constants/animations";
import { BubbleBackground } from "./BubbleBackground";

const FeatureBadge = ({
  icon: Icon,
  text,
  delay,
}: {
  icon: LucideIcon;
  text: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-premium flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground/80 hover:text-primary transition-all cursor-default border-primary/10 hover:border-primary/30"
  >
    <Icon className="w-4 h-4 text-primary" />
    <span>{text}</span>
  </motion.div>
);


export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-background">
      <BubbleBackground />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            variants={STAGGER_CHILDREN}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative flex flex-col items-center gap-10"
          >
            {/* Innovation Badge */}
            <motion.div
              variants={FADE_IN_UP}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-2 backdrop-blur-md shadow-[0_0_20px_-5px_hsl(var(--primary)/20%)]"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Leading Digital Success</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={FADE_IN_UP}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-foreground"
            >
              Building <br />
              <span className="gradient-text drop-shadow-[0_4px_15px_hsl(var(--primary)/30%)] italic underline decoration-primary/20 underline-offset-8">
                Excellent
              </span>
              <br /> In Every Pixel
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={FADE_IN_UP}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-medium mb-4"
            >
              Rangdhanu IT is a premium software agency dedicated to crafting
              high-performance digital solutions that drive innovation and
              transform businesses through cutting-edge technology.
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-wrap justify-center items-center gap-5 mb-4"
            >
              <FeatureBadge icon={Zap} text="Fast Performance" delay={0.6} />
              <FeatureBadge
                icon={ShieldCheck}
                text="Secure Solutions"
                delay={0.7}
              />
              <FeatureBadge icon={Globe} text="Global Reach" delay={0.8} />
            </motion.div>

            {/* Premium CTAs */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                href="/contact"
                className="group relative bg-primary text-primary-foreground px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] transition-all flex items-center gap-3 overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="glass-premium px-12 py-5 rounded-2xl font-bold text-xl hover:bg-accent/50 transition-all flex items-center gap-3 text-foreground active:scale-95 shadow-xl hover:shadow-2xl"
              >
                View Works
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="relative h-14 w-8 rounded-full border-2 border-primary/20 p-1">
          <motion.div
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-full rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
