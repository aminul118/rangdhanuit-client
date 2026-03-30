"use client";

import { IService } from "@/types/Service/service.types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
};

interface ServiceCardProps {
  service: IService;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = IconMap[service.icon] || Laptop;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Link href={`/services/${service.slug}`}>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl h-full flex flex-col transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_-20px_rgba(99,102,241,0.2)]">
          {/* Progress Image Header */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

            {/* Floating Icon Badge */}
            <div className="absolute bottom-4 left-6">
              <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/40 group-hover:rotate-12 transition-transform duration-500">
                <Icon size={20} />
              </div>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles
                size={12}
                className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500/60">
                Professional Capability
              </span>
            </div>

            <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
              {service.title}
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
              {service.description}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors flex items-center gap-2">
                Explore Service
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                />
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                <ArrowRight
                  size={14}
                  className="text-zinc-500 group-hover:text-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* Decorative Gradient Glow */}
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
