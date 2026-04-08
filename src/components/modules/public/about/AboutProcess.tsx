"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  FADE_IN_UP,
  STAGGER_CHILDREN,
  VIEWPORT_CONFIG,
} from "@/constants/animations";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "Deep-diving into your business goals, user needs, and market landscape to define the perfect digital strategy.",
    color: "bg-indigo-500",
  },
  {
    icon: PenTool,
    title: "Strategy & Design",
    description:
      "Crafting modern, intuitive user experiences and strategic architectures that convert visions into blueprints.",
    color: "bg-purple-500",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Engineering high-performance software with clean code and future-proof technologies.",
    color: "bg-pink-500",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "Deploying your product at scale and providing the strategic support to grow your user base.",
    color: "bg-blue-500",
  },
];

export const AboutProcess = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background text-foreground border-t border-border/50 transition-colors duration-500">
      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-purple-500/30 to-transparent" />
      </div>

      <Container>
        <div className="text-center space-y-4 mb-20">
          <motion.p
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500"
          >
            How We Deliver
          </motion.p>
          <motion.h2
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            transition={{ delay: 0.1 }}
            viewport={VIEWPORT_CONFIG}
            className="text-4xl md:text-5xl font-black tracking-tighter"
          >
            Our Strategic{" "}
            <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-8 italic">
              Process
            </span>
          </motion.h2>
        </div>

        <motion.div
          variants={STAGGER_CHILDREN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              className="relative group p-10 rounded-[3.5rem] bg-card border border-border/50 hover:bg-muted/30 transition-all duration-500 shadow-2xl shadow-black/5"
            >
              <div className="absolute -top-6 -right-6 text-6xl font-black text-foreground/5 group-hover:text-foreground/10 transition-colors pointer-events-none italic">
                0{index + 1}
              </div>

              <div
                className={`w-16 h-16 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                <step.icon size={28} className="text-white" />
              </div>

              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                {step.description}
              </p>

              {/* Connector for large screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[2px] bg-linear-to-r from-border to-transparent z-0 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
