'use client';

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CenterSpinnerProps {
  className?: string;
  size?: number;
  text?: string;
}

const CenterSpinner = ({ className, size = 32, text = 'Loading data...' }: CenterSpinnerProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 p-4", className)}>
      <div className="relative">
        <Loader2 className="animate-spin text-primary" size={size} strokeWidth={2.5} />
        <div className="absolute inset-0 blur-3xl bg-primary/40 animate-pulse rounded-full" />
      </div>
      <p className="text-sm font-black text-white animate-pulse tracking-[0.3em] uppercase text-center drop-shadow-lg">
        {text}
      </p>
    </div>
  );
};

export default CenterSpinner;
