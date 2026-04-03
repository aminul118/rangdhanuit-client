"use client";

import { ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CreationHeaderProps {
  title: string;
  subtitle: string;
  backLink: string;
}

const CreationHeader = ({ title, subtitle, backLink }: CreationHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 px-2">
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href={backLink}
            className="group inline-flex items-center gap-3 text-zinc-500 font-bold hover:text-primary transition-all duration-300 text-[10px] uppercase tracking-[0.2em]"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 border border-white/5 group-hover:border-primary/20">
              <ChevronLeft size={12} />
            </div>
            <span>Back to Management</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "circOut" }}
          className="space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-4">
            {title}
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_-5px_hsl(var(--primary)/30%)]">
              <Sparkles className="text-primary animate-pulse" size={20} />
            </div>
          </h1>
          <p className="text-zinc-500 font-medium text-base max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="hidden md:block"
      >
        <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            Creation Mode
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CreationHeader;
