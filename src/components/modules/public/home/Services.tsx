'use client';

import { motion } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Search, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Development",
    description: "Architecting high-performance, scalable web applications using React, Next.js, and modern cloud technologies.",
    icon: Code2,
    color: "bg-blue-500",
    gradient: "from-blue-600/20 to-transparent",
  },
  {
    title: "App Development",
    description: "Creating seamless mobile experiences with React Native, ensuring native performance and stunning UI/UX.",
    icon: Smartphone,
    color: "bg-purple-500",
    gradient: "from-purple-600/20 to-transparent",
  },
  {
    title: "Digital Strategy",
    description: "Data-driven marketing and growth strategies designed to scale your business and dominate your niche.",
    icon: TrendingUp,
    color: "bg-orange-500",
    gradient: "from-orange-600/20 to-transparent",
  },
  {
    title: "UI/UX Design",
    description: "User-centric design systems that balance aesthetic beauty with functional excellence and accessibility.",
    icon: Palette,
    color: "bg-pink-500",
    gradient: "from-pink-600/20 to-transparent",
  },
  {
    title: "Advanced SEO",
    description: "Technical SEO audits and content strategies to rank your business at the top of organic search results.",
    icon: Search,
    color: "bg-green-500",
    gradient: "from-green-600/20 to-transparent",
  },
  {
    title: "Cyber Security",
    description: "Protecting your digital assets with enterprise-grade security protocols and robust encryption standards.",
    icon: ShieldCheck,
    color: "bg-cyan-500",
    gradient: "from-cyan-600/20 to-transparent",
  },
];

export default function Services() {
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
          {services.map((service, index) => (
            <motion.div
              key={service.title}
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
                <div className={cn("absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-linear-to-br", service.gradient)} />
                
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500", service.color + "/10", "text-indigo-500")}>
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-10 grow">
                  {service.description}
                </p>
                
                <Link 
                  href="/contact" 
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
          ))}
        </div>
      </div>
    </section>
  );
}
