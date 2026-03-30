"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CenterSpinnerProps {
  className?: string;
  size?: number;
  text?: string;
}

const CenterSpinner = ({
  className,
  text = "Loading...",
}: CenterSpinnerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 p-8",
        className,
      )}
    >
      <div className="relative flex items-center justify-center scale-110">
        {/* Outer Rotating Rainbow Ring */}
        <div className="absolute h-24 w-24 animate-[spin_3s_linear_infinite] rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500 border-b-pink-500 opacity-60" />

        {/* Inner Pulsing Glow */}
        <div className="absolute h-16 w-16 animate-pulse rounded-full bg-indigo-500/20 blur-2xl" />

        {/* Center Core */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl">
          <Loader2
            className="text-white/80 animate-spin"
            size={28}
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        {text && (
          <p className="text-xs font-bold text-muted-foreground/80 tracking-widest uppercase opacity-90 animate-pulse">
            {text}
          </p>
        )}

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-500" />
        </div>
      </div>
    </div>
  );
};

export default CenterSpinner;
