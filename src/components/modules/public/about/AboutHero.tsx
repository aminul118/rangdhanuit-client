"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function AboutHero() {
  return (
    <section className="pt-20 pb-12 text-center text-foreground transition-colors duration-500">
      <Container>
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs font-bold mb-8 uppercase tracking-widest backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Story</span>
        </motion.div>

        <motion.h1 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-8 leading-none tracking-tighter"
        >
          About{" "}
          <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-400 bg-clip-text text-transparent underline decoration-indigo-500/10 underline-offset-12">
            Rangdhanu IT
          </span>
        </motion.h1>
        <motion.p 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
        >
          We are a team of passionate developers, designers, and digital
          strategists committed to helping businesses scale through technology
          and innovation.
        </motion.p>
      </Container>
    </section>
  );
}
