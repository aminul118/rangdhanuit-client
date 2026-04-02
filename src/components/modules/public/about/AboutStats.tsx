"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function AboutStats() {
  return (
    <section className="bg-muted/10 border-y border-border/50 py-16 backdrop-blur-sm font-bold text-foreground transition-colors duration-500">
      <Container className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center uppercase tracking-wider">
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
        >
          <div className="text-4xl font-black text-indigo-500 mb-2">100+</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-black">
            Projects Completed
          </div>
        </motion.div>
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
        >
          <div className="text-4xl font-black text-indigo-500 mb-2">50+</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-black">
            Happy Clients
          </div>
        </motion.div>
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.2 }}
        >
          <div className="text-4xl font-black text-indigo-500 mb-2">10+</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-black">
            Years Experience
          </div>
        </motion.div>
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.3 }}
        >
          <div className="text-4xl font-black text-indigo-500 mb-2">24/7</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-black">
            Support
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
