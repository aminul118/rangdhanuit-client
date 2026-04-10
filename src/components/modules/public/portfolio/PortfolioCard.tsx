"use client";

import { ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import metaConfig from "@/config/meta.config";
import { IPortfolio } from "@/types/Portfolio/portfolio.types";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  project: IPortfolio;
  className?: string;
  showActions?: boolean;
  priority?: boolean;
}

export const PortfolioCard = ({ 
  project, 
  className, 
  showActions = true,
  priority = false 
}: PortfolioCardProps) => {
  return (
    <div className={cn(
      "group glass-premium rounded-sm border border-border/50 overflow-hidden bg-card/40 hover:border-primary/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-primary/10 hover:-translate-y-2",
      className
    )}>
      {/* Media Section */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="relative aspect-video overflow-hidden block"
      >
        <Image
          src={project.thumbnail || metaConfig.baseImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          priority={priority}
        />
        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      </Link>

      {/* Content Section */}
      <div className="p-8 flex flex-col grow space-y-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/5 text-indigo-950 dark:text-indigo-200 border border-primary/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 2 && (
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white border border-primary">
              +{project.technologies.length - 2}
            </span>
          )}
        </div>

        {/* Title */}
        <Link
          href={`/portfolio/${project.slug}`}
          className="block group/title"
        >
          <h2 className="text-2xl font-black text-foreground leading-tight tracking-tight group-hover/title:text-primary transition-colors duration-300">
            {project.title}
          </h2>
        </Link>

        {/* Action Bar */}
        {showActions && (
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/50">
            <Link
              href={`/portfolio/${project.slug}`}
              className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-black uppercase tracking-widest text-[10px] group/link"
            >
              View Case Study
              <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </Link>

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground hover:scale-110 active:scale-95"
                title="Live Preview"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
