'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="container mx-auto px-6 py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-[3rem] overflow-hidden bg-indigo-600 p-12 md:p-24 text-center shadow-2xl shadow-indigo-600/40"
      >
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] pointer-events-none" 
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ready for the Next Step?</span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black mb-8 text-white leading-[1.1]">
            Let&apos;s Build Your Digital Future Together.
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Contact us today for a free consultation and let&apos;s transform your vision into an extraordinary digital reality.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-neutral-100 transition-all flex items-center gap-2 shadow-2xl hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="bg-indigo-700/50 border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700/70 transition-all backdrop-blur-md"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
