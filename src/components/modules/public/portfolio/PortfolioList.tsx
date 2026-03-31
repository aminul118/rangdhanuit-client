"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  ShoppingBag,
  Globe,
  Smartphone,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import HtmlContent from "@/components/rich-text/core/html-content";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    client: "Global Retailers",
    description:
      "A full-scale e-commerce solution with advanced filtering and real-time inventory management.",
    icon: ShoppingBag,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Fitness Tracker App",
    category: "App Development",
    client: "ActiveLife Inc.",
    description:
      "Cross-platform mobile application for tracking workouts and nutritional intake.",
    icon: Smartphone,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Real Estate Portal",
    category: "Web Development",
    client: "Urban Spaces",
    description:
      "Property listing website with interactive maps and virtual tour integrations.",
    icon: Globe,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Branding & Identity",
    category: "Graphics Design",
    client: "Creative Hub",
    description:
      "Complete visual identity design including logo, typography, and marketing assets.",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-500",
  },
];

export function PortfolioList() {
  return (
    <section className="bg-background text-foreground">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="glass border-border/50 group overflow-hidden rounded-[40px] flex flex-col backdrop-blur-sm shadow-xl hover:border-primary/50 transition-all"
            >
              <div className="h-64 bg-muted/10 relative flex items-center justify-center overflow-hidden">
                <project.icon className="w-24 h-24 text-muted-foreground/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-8 left-8">
                  <span
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider",
                      project.color
                    )}
                  >
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col grow">
                <div className="text-sm font-semibold text-primary mb-2 font-bold">
                  {project.client}
                </div>
                <h3 className="text-2xl font-black mb-4">{project.title}</h3>
                <HtmlContent
                  content={project.description}
                  className="text-muted-foreground leading-relaxed mb-8 grow font-bold"
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-foreground font-black hover:text-primary transition-colors"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
