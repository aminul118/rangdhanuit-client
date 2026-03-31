"use client";

import { motion } from "framer-motion";
import { Save, Sparkles } from "lucide-react";
import FormSubmitButton from "@/components/common/form/FormSubmitButton";
import { Button } from "@/components/ui/button";

interface FloatingCreationBarProps {
  loading: boolean;
  submitLabel: string;
  onSaveDraft?: () => void;
}

const FloatingCreationBar = ({
  loading,
  submitLabel,
  onSaveDraft,
}: FloatingCreationBarProps) => {
  return (
    <motion.div
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
      className="fixed bottom-8 left-1/2 z-50 w-full max-w-lg px-4"
    >
      <div className="glass-premium rounded-[2.5rem] p-3 flex items-center justify-between gap-4 border-indigo-500/20 shadow-[0_0_50px_-12px_rgba(99,102,241,0.4)]">
        <div className="flex items-center gap-3 ml-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <Sparkles size={18} className="text-indigo-400 animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/60">
              Creative Mode
            </p>
            <p className="text-xs font-bold text-white/90">Draft autosaved</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSaveDraft && (
            <Button
              type="button"
              variant="ghost"
              onClick={onSaveDraft}
              className="h-12 px-6 rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </Button>
          )}

          <FormSubmitButton
            loading={loading}
            submitLabel={submitLabel}
            className="h-14 px-8 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-500 text-sm uppercase tracking-wider"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCreationBar;
