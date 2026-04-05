"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import FormSubmitButton from "@/components/common/form/FormSubmitButton";

interface CreationSuiteWrapperProps {
  children: ReactNode;
  heroImage: ReactNode;
  heroLabel: string;
  loading: boolean;
  submitLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  variant?: "hero" | "compact";
}

export const CreationSuiteWrapper = ({
  children,
  heroImage,
  heroLabel,
  loading,
  submitLabel,
  onSubmit,
  variant = "hero",
}: CreationSuiteWrapperProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="text-foreground transition-colors duration-500 selection:bg-primary/30"
    >
      <div className="relative">
        <main className="space-y-6">
          <div className="mx-auto space-y-10">
            {/* Cover Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1.5 flex items-center gap-2">
                {heroLabel}
              </label>
              <div
                className={`${
                  variant === "compact" ? "min-h-[180px]" : "min-h-[320px]"
                } rounded-[2rem] overflow-hidden flex items-center justify-center bg-zinc-950/40 border border-white/5 backdrop-blur-3xl shadow-2xl relative group/hero`}
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700" />
                {heroImage}
              </div>
            </motion.div>

            {/* Standardized Content Flow */}
            {children}

            {/* Bottom Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-end pt-8 border-t border-border/50"
            >
              <FormSubmitButton loading={loading} submitLabel={submitLabel} />
            </motion.div>
          </div>
        </main>
      </div>
    </form>
  );
};
