'use client';

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Eco-Friendly Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "/portfolio/1",
  },
  {
    title: "Health & Fitness App",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    link: "/portfolio/2",
  },
  {
    title: "E-Commerce Strategy",
    category: "Digital Strategy",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    link: "/portfolio/3",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Our Latest <br /> <span className="text-muted-foreground/40">Masterpieces.</span></h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We take pride in our work. Each project is a reflection of our dedication to quality, innovation, and user experience.
            </p>
          </div>
          <Link 
            href="/portfolio" 
            className="group flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold tracking-wide"
          >
            Explore All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 aspect-video hover:border-indigo-500/50 transition-all cursor-pointer"
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-indigo-400 font-bold text-sm mb-2 uppercase tracking-widest">{project.category}</p>
                <h3 className="text-2xl font-black text-white mb-4">{project.title}</h3>
                <Link 
                  href={project.link} 
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
