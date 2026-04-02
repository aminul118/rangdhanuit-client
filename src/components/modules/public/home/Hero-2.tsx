"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Globe, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { FADE_IN_UP, STAGGER_CHILDREN } from "@/constants/animations";

const BackgroundEffect = () => {
  type Particle = {
    id: number;
    x: string;
    y: string;
    duration: number;
    delay: number;
  };
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    requestAnimationFrame(() => {
      setParticles(generated);
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Mesh Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/25 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] bg-indigo-600/15 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"
      />

      {/* Floating Particles/Bubbles */}
      <div className="absolute inset-0">
        {particles.map((p: Particle) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              x: p.x,
              y: p.y,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: ["-20px", "20px", "-20px"],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/40 shadow-[0_0_10px_2px_rgba(var(--primary),0.3)]"
          />
        ))}
      </div>

      {/* Subtle Grid Pattern with Moving Gradient overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent skew-x-[-20deg]"
      />
    </div>
  );
};

const FeatureBadge = ({
  icon: Icon,
  text,
  delay,
}: {
  icon: LucideIcon;
  text: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-premium flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground/80 hover:text-primary transition-all cursor-default border-primary/10 hover:border-primary/30"
  >
    <Icon className="w-4.5 h-4.5 text-primary" />
    <span>{text}</span>
  </motion.div>
);

const StatsCard = ({
  title,
  value,
  delay,
  className,
}: {
  title: string;
  value: string;
  delay: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6 }}
    className={cn(
      "glass-premium p-6 rounded-3xl shadow-2xl backdrop-blur-2xl z-20",
      className,
    )}
  >
    <div className="flex flex-col gap-1">
      <span className="text-4xl font-black text-primary tracking-tighter tabular-nums">
        {value}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </span>
    </div>
  </motion.div>
);

const Hero2 = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden">
      <BackgroundEffect />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            variants={STAGGER_CHILDREN}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative flex flex-col items-center gap-10"
          >
            {/* Top Badge */}
            <motion.div
              variants={FADE_IN_UP}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-2 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary),0.2)]"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span>Leading Digital Success</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={FADE_IN_UP}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] text-foreground"
            >
              Crafting <br />
              <span className="gradient-text drop-shadow-[0_4px_15px_rgba(var(--primary),0.3)]">
                Premium Excellence
              </span>
              <br /> In Every Pixel
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={FADE_IN_UP}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-medium mb-4"
            >
              Rangdhanu IT is a premium software agency dedicated to crafting
              high-performance digital solutions that drive innovation and
              transform businesses through cutting-edge technology.
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-wrap justify-center items-center gap-5 mb-4"
            >
              <FeatureBadge icon={Zap} text="Lightning Speed" delay={0.6} />
              <FeatureBadge
                icon={ShieldCheck}
                text="Enterprise Security"
                delay={0.7}
              />
              <FeatureBadge icon={Globe} text="Worldwide Reach" delay={0.8} />
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                href="/contact"
                className="group relative bg-primary text-primary-foreground px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] transition-all flex items-center gap-3 overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="glass-premium px-12 py-5 rounded-2xl font-bold text-xl hover:bg-accent/50 transition-all flex items-center gap-3 text-foreground active:scale-95 shadow-xl hover:shadow-2xl"
              >
                Explore Work
              </Link>
            </motion.div>

            {/* Floating Decorative Stats (Visual anchor without main image) */}
            <div className="absolute -z-10 w-full h-full inset-0 pointer-events-none">
              <StatsCard
                title="Client Success"
                value="99%"
                delay={1.2}
                className="absolute -top-12 -left-20 -rotate-12 hidden xl:flex scale-90 opacity-50 hover:opacity-100 transition-opacity"
              />
              <StatsCard
                title="Projects Done"
                value="250+"
                delay={1.4}
                className="absolute bottom-0 -right-24 rotate-8 hidden xl:flex scale-95 opacity-50 hover:opacity-100 transition-opacity"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -left-40 w-80 h-80 border border-primary/5 rounded-full hidden xl:block"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/3 -right-60 w-[400px] h-[400px] border-dashed border-2 border-indigo-500/5 rounded-full hidden xl:block"
              />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="relative h-14 w-8 rounded-full border-2 border-primary/20 p-1">
          <motion.div
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-full rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero2;
