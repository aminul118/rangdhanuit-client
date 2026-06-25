"use client";

import { m as m } from "framer-motion";
import { cn } from "@/lib/utils";
import { FADE_IN_UP } from "@/constants/animations";

interface SectionHeadingProps {
  heading: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const SectionHeading = ({
  heading,
  description,
  className,
  align = "center",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4 mb-12",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        className,
      )}
    >
      <m.h2
        variants={FADE_IN_UP}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black tracking-tighter text-foreground"
      >
        {heading}
      </m.h2>
      {description && (
        <m.p
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground font-medium leading-relaxed"
        >
          {description}
        </m.p>
      )}
    </div>
  );
};

export default SectionHeading;
