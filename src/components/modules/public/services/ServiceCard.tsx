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
import { FADE_IN_UP, HOVER_LIFT } from "@/constants/animations";
import metaConfig from "@/config/meta.config";

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
      variants={FADE_IN_UP}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      {...HOVER_LIFT}
      className="group relative"
    >
      <Link href={`/services/${service.slug}`}>
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] glass border-border/50 backdrop-blur-xl h-full flex flex-col transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_-20px_rgba(99,102,241,0.2)]">
          {/* Progress Image Header */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={service.image || metaConfig.baseImage}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

            {/* Floating Icon Badge */}
            <div className="absolute bottom-4 left-6">
              <div className="p-2 md:p-3 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/40 group-hover:rotate-12 transition-transform duration-500">
                <Icon size={18} className="md:size-20" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles
                size={12}
                className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500/60">
                Professional Capability
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors text-foreground">
              {service.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
              {service.description}
            </p>

            <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                Explore Service
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                />
              </span>
              <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                <ArrowRight
                  size={14}
                  className="text-muted-foreground group-hover:text-indigo-400"
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
