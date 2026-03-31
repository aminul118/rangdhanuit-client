"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function ContactHero() {
  return (
    <section className="pt-20 pb-12 text-center text-foreground transition-colors duration-500">
      <Container>
        <motion.h1 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-4xl md:text-6xl font-black mb-8"
        >
          Get in{" "}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Touch
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
          Have a project in mind or want to learn more about our services?
          We&apos;d love to hear from you. Fill out the form below and
          we&apos;ll get back to you shortly.
        </motion.p>
      </Container>
    </section>
  );
}
