"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Cpu, Wand2, Zap } from "lucide-react";
import { IPortfolio } from "@/types/Portfolio/portfolio.types";

import metaConfig from "@/config/meta.config";

interface PortfolioDetailsHeroProps {
  project: IPortfolio;
}

export const PortfolioDetailsHero = ({ project }: PortfolioDetailsHeroProps) => {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center pt-24">
      {/* Background Image with Overlay */}
      <Image
        src={project.thumbnail || metaConfig.baseImage}
        alt={project.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/60 to-background" />

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all mb-4 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Case Studies
        </Link>

        <div className="flex flex-col items-center gap-6">
          <div className="p-5 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 transition-transform hover:scale-110">
            <Wand2 size={48} strokeWidth={1.5} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              <Zap size={12} className="text-amber-400" />
              Premium Showcase Milestone
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-tight max-w-4xl mx-auto">
              {project.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground/60 font-black uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2 border-r border-border/50 pr-6">
                <Calendar size={14} className="text-indigo-600" />
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-indigo-600" />
                {project.technologies.length} Core Tech Stack
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};
