"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/* =============================================
   FormField — reusable labeled input with icon
   and animated error message
   ============================================= */

interface FormFieldProps extends Omit<React.ComponentProps<"input">, "size"> {
  /** Label text shown above the input */
  label: string;
  /** Unique id for the input (also tied to label htmlFor) */
  id: string;
  /** Icon rendered on the left inside the input */
  icon?: ReactNode;
  /** Right-side slot (e.g. show/hide password toggle) */
  rightSlot?: ReactNode;
  /** Error message from react-hook-form or similar */
  error?: string;
  /** Extra class names forwarded to the wrapper div */
  wrapperClassName?: string;
  /** Size variant */
  size?: "default" | "xl";
}

export default function FormField({
  label,
  id,
  icon,
  rightSlot,
  error,
  wrapperClassName,
  className,
  size = "default",
  ...inputProps
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2.5", wrapperClassName)}>
      <Label
        htmlFor={id}
        className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500/80 ml-1.5"
      >
        {label}
      </Label>

      <div className="relative group/input">
        {icon && (
          <span className={cn(
            "absolute left-4 text-zinc-600 transition-colors group-focus-within/input:text-indigo-500 pointer-events-none flex items-center",
            size === "xl" ? "top-5 h-5 w-5" : "top-3 h-4 w-4"
          )}>
            {icon}
          </span>
        )}

        <Input
          id={id}
          className={cn(
            "bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700/50 focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-2xl placeholder:text-zinc-700/50 font-medium",
            size === "xl" ? "h-14 text-lg pl-12" : "h-11 pl-11",
            !icon && (size === "xl" ? "pl-5" : "pl-4"),
            rightSlot && "pr-12",
            className
          )}
          aria-invalid={!!error}
          {...inputProps}
        />

        {rightSlot && (
          <span className="absolute right-3.5 top-3 flex items-center">
            {rightSlot}
          </span>
        )}

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key={`${id}-error`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-red-400 mt-1.5 ml-1 font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
