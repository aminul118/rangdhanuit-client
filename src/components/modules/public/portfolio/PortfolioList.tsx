"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, STAGGER_CHILDREN, VIEWPORT_CONFIG } from "@/constants/animations";
import { IPortfolio } from "@/types/Portfolio/portfolio.types";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioListProps {
  projects: IPortfolio[];
}

export const PortfolioList = ({ projects }: PortfolioListProps) => {
  if (!projects?.length) {
    return (
      <section className="bg-background py-16 text-center text-muted-foreground font-extrabold">
        <Container>No projects discovered yet.</Container>
      </section>
    );
  }

  return (
    <section className="bg-background text-foreground">
      <Container>
        <motion.div 
          variants={STAGGER_CHILDREN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={FADE_IN_UP}
            >
              <PortfolioCard project={project} priority={index < 2} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
