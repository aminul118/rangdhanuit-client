'use client';

import { motion } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Megaphone, 
  Palette, 
  Search, 
  Star,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Development",
    description: "Custom websites built with modern frameworks for performance and scale.",
    icon: Code2,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    icon: Smartphone,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Digital Marketing",
    description: "Strategic campaigns that drive engagement, traffic, and conversions.",
    icon: Megaphone,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Graphics Design",
    description: "Creative visual identities that capture your brand's essence and vision.",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Website SEO",
    description: "Optimization strategies that boost your visibility and search rankings.",
    icon: Search,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "UI/UX Design",
    description: "User-centric designs that focus on usability and aesthetic appeal.",
    icon: Star,
    color: "bg-cyan-500/10 text-cyan-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="container mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Expertise</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We provide a wide range of services tailored to meet the unique needs of your business, ensuring excellence in every project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-indigo-500/50 transition-all group cursor-default backdrop-blur-sm shadow-xl"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
              <service.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {service.description}
            </p>
            <Link href="/contact" className="text-indigo-400 font-bold flex items-center gap-2 group/link hover:text-indigo-300 transition-colors">
              Learn More
              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
