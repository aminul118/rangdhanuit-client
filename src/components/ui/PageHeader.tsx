"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP } from "@/constants/animations";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  subtitle,
  badge,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <section
      className={cn(
        "relative pt-32 pb-16 overflow-hidden bg-background/50",
        className,
      )}
    >
      {/* Subtle Background Mesh */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-full bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:32px_32px] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            {badge && (
              <motion.div
                variants={FADE_IN_UP}
                initial={false}
                animate="animate"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
              >
                {badge.icon && <badge.icon className="w-3.5 h-3.5" />}
                <span>{badge.text}</span>
              </motion.div>
            )}

            <motion.h1
              variants={FADE_IN_UP}
              initial={false}
              animate="animate"
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter leading-none text-foreground"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                variants={FADE_IN_UP}
                initial={false}
                animate="animate"
                transition={{ delay: 0.2 }}
                className="text-lg  text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {children && (
            <motion.div
              variants={FADE_IN_UP}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};
