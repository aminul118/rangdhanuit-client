'use client';

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    title: "Discovery",
    description: "Real-time collaboration to define goals, audience, and strategy.",
    icon: Search,
    color: "bg-indigo-500",
  },
  {
    title: "Design",
    description: "Crafting beautiful, accessible digital products with precision and care.",
    icon: PenTool,
    color: "bg-purple-500",
  },
  {
    title: "Development",
    description: "Building scalable, high-performance solutions with modern technologies.",
    icon: Code,
    color: "bg-pink-500",
  },
  {
    title: "Deployment",
    description: "Deploying your product to the world and ensuring its success.",
    icon: Rocket,
    color: "bg-orange-500",
  },
];

export default function Process() {
  return (
    <section className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Our Working Process</h2>
          <p className="text-lg text-muted-foreground">
            We follow a streamlined, collaborative process to ensure that your project is delivered on time, within budget, and to the highest standards.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-11 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-orange-500 opacity-20 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className={`w-20 h-20 rounded-full ${step.color} mx-auto flex items-center justify-center mb-6 shadow-2xl group transition-transform hover:scale-110`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
