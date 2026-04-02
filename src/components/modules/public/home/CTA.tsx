"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SCALE_IN, FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const CTA = () => {
  return (
    <section className="py-32 bg-background transition-colors duration-500">
      <Container>
        <motion.div
          variants={SCALE_IN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="relative rounded-[3.5rem] overflow-hidden bg-linear-to-br from-primary via-violet-600 to-indigo-900 p-12 md:p-24 text-center shadow-[0_0_100px_-20px_rgba(var(--primary),0.3)]"
        >
          {/* Subtle Mesh Gradients */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(at 0% 0%, rgb(139, 92, 246) 0, transparent 50%), 
                                   radial-gradient(at 100% 0%, rgb(99, 102, 241) 0, transparent 50%), 
                                   radial-gradient(at 50% 100%, rgb(167, 139, 250) 0, transparent 50%)`,
            }}
          />

          {/* Animated Background Orbs */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-120 h-120 bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -right-32 w-160 h-160 bg-primary-foreground/10 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-violet-500/10 rounded-full blur-[160px] pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              variants={FADE_IN_UP}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-10 backdrop-blur-md shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-violet-300" />
              <span className="tracking-widest uppercase text-[10px]">
                Your Success, Our Mission
              </span>
            </motion.div>

            <motion.h2
              variants={FADE_IN_UP}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-white leading-[1.1] tracking-tight"
            >
              Let&apos;s Build Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-200 via-white to-violet-100 drop-shadow-sm">
                Digital Future
              </span>{" "}
              Together.
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-indigo-50/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Transform your business with cutting-edge solutions. Contact us
              for a free consultation and let&apos;s build something
              extraordinary.
            </motion.p>

            <motion.div
              variants={FADE_IN_UP}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center items-center gap-8"
            >
              <Link
                href="/contact"
                className="group relative bg-white text-primary px-12 py-6 rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-indigo-700">
                  Get Started Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white via-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <Link
                href="/services"
                className="group relative px-12 py-6 rounded-2xl font-bold text-xl text-white border-2 border-white/30 hover:border-white/0 transition-all duration-300 backdrop-blur-md flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Explore Services</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTA;
