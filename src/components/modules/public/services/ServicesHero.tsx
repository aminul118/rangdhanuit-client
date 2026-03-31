"use client";

import { motion } from "framer-motion";
import { Terminal, Wand2, Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function ServicesHero() {
  return (
    <Container>
      <div className="text-center space-y-8 mb-16 md:mb-24">
        <motion.div 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="flex items-center justify-center gap-3 text-indigo-500 mb-2"
        >
          <div className="h-px w-8 md:w-12 bg-linear-to-r from-transparent to-indigo-500" />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
            Our Digital Capabilities
          </span>
          <div className="h-px w-8 md:w-12 bg-linear-to-l from-transparent to-indigo-500" />
        </motion.div>

        <motion.h1 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight leading-[1.1] md:leading-[0.95] text-foreground flex flex-col items-center"
        >
          <span>Comprehensive</span>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-500 to-rose-400">
            Technical Mastery
          </span>
        </motion.h1>

        <motion.p 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-base md:text-2xl max-w-[800px] mx-auto leading-relaxed font-medium"
        >
          Transcend traditional boundaries with our specialized digital
          solutions. From elegant UI/UX to robust cybersecurity, we redefine
          excellence.
        </motion.p>

        <motion.div 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground"
        >
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-border/50 glass">
            <Terminal size={12} className="text-indigo-400 md:size-14" /> Web & Mobile
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-border/50 glass">
            <Wand2 size={12} className="text-purple-400 md:size-14" /> UI/UX Creative
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-border/50 glass">
            <Sparkles size={12} className="text-rose-400 md:size-14" /> Strategy & SEO
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
