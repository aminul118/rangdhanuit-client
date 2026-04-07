"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { IService } from "@/types/Service/service.types";

import metaConfig from "@/config/meta.config";

const IconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
};

interface ServiceDetailsHeroProps {
  service: IService;
}

export const ServiceDetailsHero = ({ service }: ServiceDetailsHeroProps) => {
  const Icon = IconMap[service.icon] || Laptop;

  return (
    <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center pt-24">
      {/* Background Image with Overlay */}
      <Image
        src={service.image || metaConfig.baseImage}
        alt={service.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/60 to-background" />

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all mb-4 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Expertise
        </Link>

        <div className="flex flex-col items-center gap-6">
          <div className="p-5 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 animate-bounce-subtle">
            <Icon size={48} strokeWidth={1.5} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              <Sparkles size={12} className="text-amber-400" />
              Premium Service Offering
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-tight max-w-4xl mx-auto">
              {service.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-2xl max-w-[700px] mx-auto leading-relaxed italic font-medium">
              &quot;{service.description}&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};
