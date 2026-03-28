"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Sparkle = ({
  size,
  top,
  left,
  delay,
  duration,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    style={{
      position: "absolute",
      top,
      left,
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: "white",
      boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
      zIndex: 5,
    }}
  />
);

export default function Hero() {
  const [sparkles] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 2,
    })),
  );

  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-indigo-500/10 via-background to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />

      {/* Live Sparkles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s) => (
          <Sparkle key={s.id} {...s} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Leading the Digital Revolution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
            >
              Building the Future <br />
              <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x underline decoration-indigo-500/20 underline-offset-8">
                One Pixel at a Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Rangdhanu IT is a premium software agency dedicated to crafting
              high-performance digital solutions that drive business growth and
              innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                href="/contact"
                className="group relative bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-2xl shadow-indigo-600/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10"
      />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-linear-to-b from-indigo-500 to-transparent opacity-20" />
      </div>
    </section>
  );
}
