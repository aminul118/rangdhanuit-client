"use client";

import { motion } from "framer-motion";
import { 
  ChevronRight,
  Zap
} from "lucide-react";
import Link from "next/link";
import { IService } from "@/types/Service/service.types";
import { getIcon } from "@/lib/IconMapper";

interface ServicesProps {
  services: IService[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4"
            >
              <Zap className="w-4 h-4" />
              <span>Our Capabilities</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Solutions Engineered <br />
              <span className="text-muted-foreground/50">for Excellence.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-md leading-relaxed"
          >
            We don&apos;t just build software; we engineer digital ecosystems that empower your business to reach its full potential.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-[2.5rem] -z-10 group-hover:from-indigo-500/10 transition-colors duration-500" />
                <div className="h-full border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-start hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-linear-to-br from-indigo-500/20 to-transparent" />
                  
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500 bg-indigo-500/10 text-indigo-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-10 grow line-clamp-3">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="inline-flex items-center gap-2 font-bold text-sm tracking-wider uppercase group/link"
                  >
                    <span className="relative overflow-hidden inline-block">
                      <span className="inline-block transition-transform duration-300 group-hover/link:-translate-y-full">Explore Service</span>
                      <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover/link:translate-y-0 text-indigo-400">Explore Service</span>
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-20 flex flex-col items-center gap-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500/60">Explore Our Full Spectrum of Expertise</p>
          <Link href="/services">
            <button className="relative px-14 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/40 transition-all active:scale-95 leading-none group overflow-hidden">
               <span className="relative z-10">View All Services</span>
               <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
