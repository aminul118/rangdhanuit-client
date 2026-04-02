"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Award, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const stats = [
  {
    label: "Projects Completed",
    value: "500+",
    icon: Briefcase,
    color: "text-blue-500",
  },
  {
    label: "Happy Clients",
    value: "200+",
    icon: Users,
    color: "text-purple-500",
  },
  {
    label: "Years Experience",
    value: "10+",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    label: "Awards Won",
    value: "25+",
    icon: Award,
    color: "text-pink-500",
  },
];

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/10 text-foreground transition-colors duration-500">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="relative group p-8 rounded-3xl glass border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon
                  className={`w-10 h-10 ${stat.color} group-hover:scale-110 transition-transform`}
                />
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-2 bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-muted-foreground font-bold uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
