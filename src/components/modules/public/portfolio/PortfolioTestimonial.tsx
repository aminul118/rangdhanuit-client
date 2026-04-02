"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export const PortfolioTestimonial = () => {
  return (
    <section className="glass py-24 bg-zinc-950/50">
      <Container className="text-center max-w-3xl">
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-indigo-500 text-5xl mb-8"
        >
          “
        </motion.div>
        <motion.p
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-medium mb-12 italic leading-snug text-white"
        >
          Rangdhanu IT transformed our digital presence. Their attention to
          detail and technical expertise are unmatched.
        </motion.p>
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.2 }}
          className="font-black text-xl uppercase tracking-widest text-white"
        >
          John Doe
        </motion.div>
        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.3 }}
          className="text-xs text-zinc-500 mt-2 font-black uppercase tracking-widest"
        >
          CEO, Global Retailers
        </motion.div>
      </Container>
    </section>
  );
};
