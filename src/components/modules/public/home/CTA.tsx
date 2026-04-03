"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SCALE_IN, FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const CTA = () => {
  return (
    <section className="py-24 bg-background transition-colors duration-500">
      <Container>
        <motion.div
          variants={SCALE_IN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="relative rounded-[3rem] overflow-hidden bg-card p-10 md:p-20 text-center shadow-2xl border border-border/50"
        >
          {/* Theme-responsive Mesh Gradients */}
          <div
            className="absolute inset-0 opacity-40 dark:opacity-60 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(at 0% 0%, hsla(var(--primary), 0.15) 0, transparent 50%), 
                               radial-gradient(at 100% 0%, hsla(240, 70%, 50%, 0.15) 0, transparent 50%), 
                               radial-gradient(at 50% 100%, hsla(263, 70%, 50%, 0.1) 0, transparent 50%)`,
            }}
          />

          {/* Elegant Floating Orbs - Subtle in Light, Vibrant in Dark */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[110px] pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              variants={FADE_IN_UP}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary dark:text-white/80 text-[10px] font-black mb-8 backdrop-blur-md tracking-[0.2em] uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Your Success, Our Mission</span>
            </motion.div>

            <motion.h2
              variants={FADE_IN_UP}
              className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight tracking-tighter"
            >
              Let&apos;s Build Your{" "}
              <span className="gradient-text ">Digital Future</span> Together.
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed font-semibold opacity-80"
            >
              Transform your business with cutting-edge solutions. Contact us
              for a free consultation and let&apos;s build something
              extraordinary.
            </motion.p>

            <motion.div
              variants={FADE_IN_UP}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center items-center gap-6"
            >
              <Link
                href="/contact"
                className="group relative bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_-5px_hsl(var(--primary))] active:scale-95 flex items-center gap-3 shadow-xl"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="glass-premium px-10 py-5 rounded-2xl font-bold text-lg text-foreground hover:bg-accent transition-all active:scale-95 border border-border/50 shadow-xl backdrop-blur-3xl"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTA;
