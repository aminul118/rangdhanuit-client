"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const steps = [
  {
    title: "Discovery",
    description:
      "Real-time collaboration to define goals, audience, and strategy.",
    icon: Search,
    color: "bg-indigo-500",
  },
  {
    title: "Design",
    description:
      "Crafting beautiful, accessible digital products with precision and care.",
    icon: PenTool,
    color: "bg-purple-500",
  },
  {
    title: "Development",
    description:
      "Building scalable, high-performance solutions with modern technologies.",
    icon: Code,
    color: "bg-pink-500",
  },
  {
    title: "Deployment",
    description:
      "Deploying your product to the world and ensuring its success.",
    icon: Rocket,
    color: "bg-orange-500",
  },
];

export default function Process() {
  return (
    <section className="py-24 relative bg-muted/10 text-foreground transition-colors duration-500">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            Our Working Process
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium"
          >
            We follow a streamlined, collaborative process to ensure that your
            project is delivered on time, within budget, and to the highest
            standards.
          </motion.p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-11 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-orange-500 opacity-20 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="relative text-center group"
            >
              <div
                className={`w-20 h-20 rounded-full ${step.color} mx-auto flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:scale-110`}
              >
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-bold">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
