"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon, Send, RefreshCw } from "lucide-react";

interface FormSubmitButtonProps extends ButtonProps {
  loading: boolean;
  submitLabel: string;
  icon?: LucideIcon;
}

const FormSubmitButton = ({
  loading,
  submitLabel,
  icon: Icon = Send,
  className,
  ...props
}: FormSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={loading || props.disabled}
      className={cn(
        "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 rounded-full transition-all active:scale-95 flex items-center gap-2",
        "h-10 px-10 ", // Default large size for Creation Suite
        className,
      )}
      {...props}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center justify-center"
        >
          <RefreshCw size={20} />
        </motion.div>
      ) : (
        <>
          <Icon size={20} />
          <span>{submitLabel}</span>
        </>
      )}
    </Button>
  );
};

export default FormSubmitButton;
