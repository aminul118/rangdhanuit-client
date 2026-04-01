"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Bubble = {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
};

export const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generated = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      size: 20 + Math.random() * 80,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    requestAnimationFrame(() => {
      setBubbles(generated);
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: b.x, 
            y: b.y 
          }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            y: ["-40px", "40px", "-40px"],
            x: ["-20px", "20px", "-20px"],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: b.duration, 
            repeat: Infinity, 
            delay: b.delay,
            ease: "easeInOut"
          }}
          style={{
            width: b.size,
            height: b.size,
          }}
          className="absolute rounded-full bg-primary/20 backdrop-blur-[2px] border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
        />
      ))}
      
      {/* Background Mesh Overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/15 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse delay-700" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </div>
  );
};
