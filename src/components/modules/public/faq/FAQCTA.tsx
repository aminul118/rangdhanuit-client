"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FADE_IN_UP } from "@/constants/animations";

const FAQCTA = () => {
  return (
    <motion.div
      variants={FADE_IN_UP}
      initial="initial"
      whileInView="whileInView"
      className="mt-32 p-12 rounded-[3.5rem] bg-linear-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <h3 className="text-3xl font-black mb-4 relative z-10">Still have questions?</h3>
      <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto relative z-10 leading-relaxed font-medium">
        Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team
        and we&apos;ll get back to you as soon as possible.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <Link href="/contact">
          <button className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            Contact Support
          </button>
        </Link>
        <Link href="mailto:info@rangdhanuit.com">
          <button className="px-8 py-4 rounded-2xl bg-card border border-border/50 text-foreground font-black uppercase text-xs tracking-widest hover:border-primary/30 transition-all">
            Email Us
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default FAQCTA;
