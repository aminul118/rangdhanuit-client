"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { IService } from "@/types/Service/service.types";

interface ServiceDetailsSidebarProps {
  service: IService;
}

export const ServiceDetailsSidebar = ({
  service,
}: ServiceDetailsSidebarProps) => {
  return (
    <aside className="space-y-8">
      {/* Benefits Section */}
      <div className="glass-premium p-10 rounded-[3.5rem] border border-border/50 bg-card/60 backdrop-blur-xl">
        <h3 className="text-xl font-black mb-8 uppercase tracking-wider text-foreground">
          Why Choose This?
        </h3>
        <ul className="space-y-6">
          {[
            "Cutting-edge Technology Stack",
            "Agile & Iterative Workflows",
            "Dedicated Expert Team",
            "Strategic Business Alignment",
          ].map((item, i) => (
            <li key={i} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Sparkles size={12} className="text-emerald-500" />
              </div>
              <span className="text-sm font-bold text-muted-foreground leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Block Section */}
      <div className="p-10 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] z-0 group-hover:bg-white/20 transition-all" />
        <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">
          Ready to Elevate Your Project?
        </h3>
        <p className="text-white/70 text-sm font-bold mb-8 relative z-10 leading-relaxed uppercase tracking-widest">
          Let&lsquo;s discuss how {service.title} can transform your vision into
          a digital reality.
        </p>
        <Link href="/contact" className="block w-full">
          <button className="w-full h-14 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 cursor-pointer">
            Get Started Now
          </button>
        </Link>
      </div>
    </aside>
  );
};
