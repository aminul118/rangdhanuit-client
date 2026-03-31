"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";
import { Suspense } from "react";
import BlogSearch from "@/components/modules/public/blog/BlogSearch";

export function BlogHero() {
  return (
    <header className="max-w-4xl mx-auto text-center mb-16 px-4">
      <motion.div
        variants={FADE_IN_UP}
        initial="initial"
        whileInView="whileInView"
        viewport={VIEWPORT_CONFIG}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm"
      >
        <Sparkles className="w-4 h-4" />
        <span>Digital Insights & Innovation</span>
      </motion.div>

      <motion.h1
        variants={FADE_IN_UP}
        initial="initial"
        whileInView="whileInView"
        viewport={VIEWPORT_CONFIG}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] text-foreground"
      >
        Latest from our <br />
        <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent underline decoration-indigo-500/20 underline-offset-8">
          Creative minds
        </span>
      </motion.h1>

      <motion.div
        variants={FADE_IN_UP}
        initial="initial"
        whileInView="whileInView"
        viewport={VIEWPORT_CONFIG}
        transition={{ delay: 0.2 }}
      >
        <Suspense fallback={<div className="h-20" />}>
          <BlogSearch />
        </Suspense>
      </motion.div>
    </header>
  );
}
