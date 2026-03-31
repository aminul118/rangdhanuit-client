"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Heart, Laptop } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, STAGGER_CHILDREN, VIEWPORT_CONFIG } from "@/constants/animations";

const benefits = [
  {
    icon: Zap,
    title: "Agile Precision",
    description: "We don't just build fast; we build with intent. Our agile workflows ensure every sprint adds tangible value to your bottom line.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Security isn't an afterthought. We implement multi-layered encryption and robust security protocols for every product we ship.",
    color: "from-indigo-400 to-blue-500",
  },
  {
    icon: Heart,
    title: "Partner Centric",
    description: "We treat your project as if it were our own. Our focus is on building long-term partnerships, not just concluding transactions.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Laptop,
    title: "Modern Stack",
    description: "Staying ahead of the curve is our obsession. We leverage the latest technologies to build scalable, high-performance solutions.",
    color: "from-emerald-400 to-teal-500",
  },
];

export function AboutWhyUs() {
  return (
    <section className="py-24 bg-muted/20">
      <Container>
        <div className="text-center space-y-4 mb-20">
          <motion.h4
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500"
          >
            Competitive Edge
          </motion.h4>
          <motion.h2
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            transition={{ delay: 0.1 }}
            viewport={VIEWPORT_CONFIG}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tighter"
          >
            Why Choose <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-8">Rangdhanu IT</span>
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            transition={{ delay: 0.2 }}
            viewport={VIEWPORT_CONFIG}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium"
          >
            We merge technical excellence with business strategy to create 
            exceptional digital experiences.
          </motion.p>
        </div>

        <motion.div
          variants={STAGGER_CHILDREN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              className="group p-8 rounded-[3rem] bg-card border border-border/50 hover:border-indigo-500/30 shadow-2xl shadow-black/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${benefit.color} opacity-0 group-hover:opacity-5 blur-[50px] transition-all duration-700 pointer-events-none`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${benefit.color} flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <benefit.icon className="text-white" size={24} />
              </div>
              
              <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-bold">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
