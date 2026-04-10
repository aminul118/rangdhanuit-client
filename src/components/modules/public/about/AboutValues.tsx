"use client";

import { motion } from "framer-motion";
import { Users, Award, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const values = [
  {
    title: "Innovation",
    desc: "Always pushing the boundaries of what's possible with technology.",
    icon: Rocket,
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Quality",
    desc: "Rigorous standards for every project to ensure the best results.",
    icon: Award,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Collaboration",
    desc: "Working closely with clients to understand and meet their needs.",
    icon: Users,
    color: "bg-pink-500/10 text-pink-500",
  },
];

export const AboutValues = () => {
  return (
    <section className="bg-background text-foreground transition-colors duration-500">
      <Container>
        <motion.h2
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-3xl font-black mb-12 text-center"
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="glass border-border/50 p-8 rounded-sm backdrop-blur-sm shadow-lg hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-sm flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                  value.color,
                )}
              >
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-black">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
