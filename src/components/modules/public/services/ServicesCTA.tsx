"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { SCALE_IN, FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function ServicesCTA() {
  return (
    <Container>
      <motion.div 
        variants={SCALE_IN}
        initial="initial"
        whileInView="whileInView"
        viewport={VIEWPORT_CONFIG}
        className="mt-24 md:mt-32 p-8 md:p-24 rounded-[2.5rem] md:rounded-[4rem] border border-border/50 bg-muted/5 text-center relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/10 blur-[80px] md:blur-[120px] rounded-full -z-10 animate-pulse" />
        
        <motion.h2 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-foreground"
        >
          Need a custom solution?
        </motion.h2>
        
        <motion.p 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg max-w-[600px] mx-auto mb-10 md:mb-12 font-bold uppercase tracking-widest"
        >
          Let&apos;s build something extraordinary together.
        </motion.p>
        
        <motion.button 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.3 }}
          className="h-14 px-10 md:px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-2xl shadow-indigo-600/40 transition-all active:scale-95 leading-none"
        >
          Start Your Project
        </motion.button>
      </motion.div>
    </Container>
  );
}
