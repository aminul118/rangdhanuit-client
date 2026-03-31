"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function PortfolioHero() {
  return (
    <section className="pt-20 pb-12 text-center text-white">
      <Container>
        <motion.h1 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-4xl md:text-6xl font-black mb-8"
        >
          Our{" "}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio
          </span>
        </motion.h1>
        <motion.p 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Explore our recent projects and see how we&apos;ve helped our clients
          achieve their digital goals with premium IT solutions.
        </motion.p>
      </Container>
    </section>
  );
}
