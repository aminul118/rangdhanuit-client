'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SCALE_IN, FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export default function CTA() {
  return (
    <section className="py-32 bg-background transition-colors duration-500">
      <Container>
        <motion.div 
          variants={SCALE_IN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-center shadow-2xl shadow-primary/20"
        >
          {/* Animated Background Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-foreground/20 rounded-full blur-[100px] pointer-events-none" 
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-primary-foreground text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ready for the Next Step?</span>
            </motion.div>

            <motion.h2 
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="text-4xl md:text-7xl font-black mb-8 text-primary-foreground leading-[1.1]"
            >
              Let&apos;s Build Your Digital Future Together.
            </motion.h2>
            <motion.p 
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Contact us today for a free consultation and let&apos;s transform your vision into an extraordinary digital reality.
            </motion.p>
            
            <motion.div 
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                href="/contact"
                className="group bg-background text-foreground px-10 py-5 rounded-2xl font-bold text-xl hover:bg-background/90 transition-all flex items-center gap-2 shadow-2xl hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="bg-primary-foreground/10 border border-white/10 text-primary-foreground px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary-foreground/20 transition-all backdrop-blur-md"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
