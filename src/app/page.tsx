"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Megaphone, 
  Palette, 
  Search, 
  ArrowRight,
  ChevronRight,
  Star
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

const partners = [
  "Google", "Microsoft", "Amazon", "Meta", "Adobe", "Slack", "Spotify", "Netflix"
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-4 py-2 rounded-full glass text-primary text-sm font-semibold mb-6 inline-block">
                Innovating the Future of IT
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Empowering Businesses through <br />
                <span className="gradient-text">Premium IT Solutions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Rangdhanu IT delivers cutting-edge web development, mobile apps, and digital strategies to help your business thrive in the digital age.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="glass px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Partners Slider */}
      <section className="py-12 border-y border-white/5 bg-white/2">
        <div className="container mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Trusted by Industry Leaders</p>
        </div>
        <div className="flex overflow-hidden relative group">
          <div className="flex animate-scroll-left whitespace-nowrap min-w-full items-center py-4">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="mx-12 text-3xl font-bold text-muted-foreground/30 hover:text-primary/50 transition-colors cursor-default"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-6">
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
              className="glass p-8 rounded-3xl hover:border-primary/50 transition-all group cursor-default"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <Link href="/contact" className="text-primary font-bold flex items-center gap-2 group/link">
                Learn More
                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <div className="glass p-12 md:p-24 rounded-[40px] relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-primary/10 -z-10" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to transform your business?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Contact us today for a free consultation and let&apos;s build something amazing together.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-10 py-5 rounded-full font-bold text-xl inline-block hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
