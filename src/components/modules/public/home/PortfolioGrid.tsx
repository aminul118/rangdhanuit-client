"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const projects = [
  {
    title: "Eco-Friendly Dashboard",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "/portfolio/1",
  },
  {
    title: "Health & Fitness App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    link: "/portfolio/2",
  },
  {
    title: "E-Commerce Strategy",
    category: "Digital Strategy",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    link: "/portfolio/3",
  },
];

const PortfolioGrid = () => {
  return (
    <section className="py-24 relative bg-background text-foreground transition-colors duration-500">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Our Latest <br />{" "}
              <span className="text-muted-foreground">Masterpieces.</span>
            </motion.h2>
            <motion.p
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              We take pride in our work. Each project is a reflection of our
              dedication to quality, innovation, and user experience.
            </motion.p>
          </div>
          <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 glass px-10 py-4 rounded-2xl hover:bg-accent transition-all font-bold tracking-wide"
            >
              Explore All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-border/50 aspect-video hover:border-primary/50 transition-all cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-2xl font-black text-foreground mb-4">
                  {project.title}
                </h3>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PortfolioGrid;
