"use client";

import { motion } from "framer-motion";
import { Target, Rocket } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export function AboutMission() {
  return (
    <section className="bg-background text-foreground transition-colors duration-500">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="glass border-border/50 p-12 rounded-[40px] backdrop-blur-sm shadow-xl"
          >
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              To provide high-quality IT solutions that empower our clients to
              achieve their business goals efficiently and effectively. We
              strive for excellence in every line of code and every pixel
              designed.
            </p>
          </motion.div>
          <motion.div 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-12 rounded-[40px] backdrop-blur-sm shadow-xl"
          >
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              To be a global leader in IT services, known for our innovation,
              reliability, and commitment to client success. We envision a world
              where technology seamlessly integrates with business to create
              meaningful impact.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
