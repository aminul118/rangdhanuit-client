"use client";

import Link from "next/link";
import { Cpu, ExternalLink, Globe, Zap } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { IPortfolio } from "@/types/Portfolio/portfolio.types";

interface PortfolioDetailsSidebarProps {
  project: IPortfolio;
}

export const PortfolioDetailsSidebar = ({
  project,
}: PortfolioDetailsSidebarProps) => {
  return (
    <aside className="space-y-8">
      {/* Key Highlights Section */}
      <div className="glass-premium p-10 rounded-[3.5rem] border border-border/50 bg-card/60 backdrop-blur-xl">
        <h3 className="text-xl font-black mb-8 uppercase tracking-wider text-foreground flex items-center gap-3">
          <Zap size={18} className="text-indigo-600" />
          Key Highlights
        </h3>
        <ul className="space-y-6">
          {[
            "Optimized Performance & Speed",
            "Pixel-Perfect UI/UX Design",
            "Scalable & Robust Architecture",
            "Strategic Feature Roadmap",
          ].map((item, i) => (
            <li key={i} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              </div>
              <span className="text-sm font-bold text-muted-foreground italic leading-tight">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Section */}
      <div className="glass-premium p-10 rounded-[3.5rem] border border-border/50 bg-card/60 backdrop-blur-xl">
        <h3 className="text-xl font-black mb-8 uppercase tracking-wider text-foreground flex items-center gap-3">
          <Cpu size={18} className="text-indigo-600" />
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-indigo-600/5 border border-indigo-600/10 rounded-xl text-xs font-black text-indigo-400 uppercase tracking-widest"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Links Section */}
      {(project.liveLink || project.github) && (
        <div className="glass-premium p-10 rounded-[3.5rem] border border-border/50 bg-card/60 backdrop-blur-xl space-y-6">
          <h3 className="text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-3">
            <Globe size={18} className="text-indigo-600" />
            Project Links
          </h3>

          <div className="space-y-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-indigo-600/5 border border-indigo-600/10 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-600/10 group-hover:bg-white/20 transition-colors">
                    <Globe size={16} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Live Preview</span>
                </div>
                <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-800/5 border border-zinc-800/10 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800/10 group-hover:bg-white/20 transition-colors">
                    <FaGithub size={16} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Source Code</span>
                </div>
                <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* CTA Block */}
      <div className="p-10 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] z-0 group-hover:bg-white/20 transition-all" />
        <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">
          Ready to Elevate Your Project?
        </h3>
        <p className="text-white/70 text-sm font-bold mb-8 relative z-10 leading-relaxed uppercase tracking-widest">
          Let&lsquo;s discuss how we can transform your vision into a digital
          masterpiece with our proven expert workflows.
        </p>
        <Link href="/contact" className="block w-full">
          <button className="w-full h-14 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 cursor-pointer">
            Discuss Strategy
          </button>
        </Link>
      </div>
    </aside>
  );
};
