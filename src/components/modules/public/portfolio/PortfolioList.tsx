"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Globe,
} from "lucide-react";
import Link from "next/link";
import HtmlContent from "@/components/rich-text/core/html-content";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";
import { IPortfolio } from "@/types/Portfolio/portfolio.types";
import Image from "next/image";

interface PortfolioListProps {
  projects: IPortfolio[];
}

export function PortfolioList({ projects }: PortfolioListProps) {
  if (!projects?.length) {
    return (
      <section className="bg-background py-12 text-center text-muted-foreground font-bold">
        <Container>No projects found.</Container>
      </section>
    );
  }

  return (
    <section className="bg-background text-foreground">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="glass border-border/50 group overflow-hidden rounded-[40px] flex flex-col backdrop-blur-sm shadow-xl hover:border-primary/50 transition-all"
            >
              <div className="h-72 bg-muted/10 relative overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Globe className="w-24 h-24 text-muted-foreground/10" />
                  </div>
                )}
                {project.isFeatured && (
                  <div className="absolute top-8 left-8">
                    <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary backdrop-blur-md border border-primary/20">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-10 flex flex-col grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border/50">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black mb-4">{project.title}</h3>
                <div className="text-muted-foreground leading-relaxed mb-8 grow font-bold line-clamp-3">
                  <HtmlContent content={project.description} />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="flex items-center gap-2 text-foreground font-black hover:text-primary transition-colors group/link"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
