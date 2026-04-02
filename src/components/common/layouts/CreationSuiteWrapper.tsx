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
}

export const CreationSuiteWrapper = ({
  children,
  heroImage,
  heroLabel,
  loading,
  submitLabel,
  onSubmit,
}: CreationSuiteWrapperProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/30"
    >
      <div className="relative">
        <main className="min-h-[calc(100vh-73px)] pt-12 pb-24 px-6 sm:px-12 lg:px-24">
          <div className="max-w-[1000px] mx-auto space-y-12">
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
              <div className="rounded-[2rem] overflow-hidden border border-border/50 bg-muted/5 p-1 aspect-21/9 flex items-center justify-center">
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
              className="flex items-center justify-end pt-12 border-t border-border/50"
            >
              <FormSubmitButton loading={loading} submitLabel={submitLabel} />
            </motion.div>
          </div>
        </main>
      </div>
    </form>
  );
};
