"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const TechBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const [particles, setParticles] = useState<{ id: number; x: string; y: string; duration: number; delay: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
      const generatedParticles = [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 20,
      }));
      setParticles(generatedParticles);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none bg-background transition-colors duration-500">
      {/* Primary Tech Grid */}
      <div
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 90%)",
        }}
      />

      {/* Mouse Follower Glow */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
      />

      {/* Static Glows */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[180px]"
      />

      {/* Innovation Particles - Only render on client after hydration */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: ["-10%", "110%"],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
          className="absolute w-1 h-1 bg-primary/40 dark:bg-primary rounded-full blur-[1px]"
        />
      ))}

      {/* Bottom Fade to blend with next section */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background via-background/80 to-transparent" />
    </div>
  );
};
