'use client';

import Link from "next/link";

export default function CTA() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="bg-indigo-600/10 border border-indigo-500/20 p-12 md:p-24 rounded-[40px] relative overflow-hidden text-center backdrop-blur-lg shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white relative z-10">Ready to transform your business?</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto relative z-10">
          Contact us today for a free consultation and let&apos;s build something amazing together.
        </p>
        <Link
          href="/contact"
          className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-xl inline-block hover:scale-105 transition-all shadow-xl shadow-indigo-500/30 relative z-10"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
