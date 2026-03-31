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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 px-2">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            href={backLink}
            className="group inline-flex items-center gap-4 text-zinc-500 font-black hover:text-indigo-400 transition-all duration-500 text-[10px] uppercase tracking-[0.4em]"
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all duration-500">
              <ChevronLeft size={14} />
            </div>
            <span>Return to Dashboard</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
          className="space-y-4"
        >
          <h1 className="text-3xl  font-black tracking-tight text-white flex items-center gap-6">
            {title}
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)]">
              <Sparkles className="text-indigo-400 animate-pulse" size={24} />
            </div>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="hidden md:block"
      ></motion.div>
    </div>
  );
};

export default CreationHeader;
