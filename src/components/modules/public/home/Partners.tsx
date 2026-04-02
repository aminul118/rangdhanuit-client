"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN, VIEWPORT_CONFIG } from "@/constants/animations";

const partners = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Adobe",
  "Slack",
  "Spotify",
  "Netflix",
];

export default function Partners() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/5 overflow-hidden text-foreground">
      <Container className="mb-8 text-center">
        <motion.p
          variants={FADE_IN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-sm font-medium text-muted-foreground uppercase tracking-widest font-bold"
        >
          Trusted by Industry Leaders
        </motion.p>
      </Container>
      <div className="flex relative group">
        <div className="flex animate-scroll-left whitespace-nowrap min-w-full items-center py-4">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="mx-12 text-3xl font-black text-muted-foreground/20 hover:text-primary/50 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
