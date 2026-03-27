'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6 inline-block backdrop-blur-sm">
              Innovating the Future of IT
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Empowering Businesses through <br />
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Premium IT Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Rangdhanu IT delivers cutting-edge web development, mobile apps, and digital strategies to help your business thrive in the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
