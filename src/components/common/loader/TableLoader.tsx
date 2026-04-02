"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TableLoaderProps {
  className?: string;
  text?: string;
}

const TableLoader = ({ className, text = "Updating..." }: TableLoaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-6 transition-all duration-300",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Modern Sleek Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-t-2 border-r-2 border-indigo-500 border-b-transparent border-l-transparent shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)]"
        />
        
        {/* Inner Gradient Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute h-8 w-8 rounded-full border-b-2 border-l-2 border-purple-500 border-t-transparent border-r-transparent opacity-40"
        />

        {/* Center Point */}
        <div className="absolute h-1.5 w-1.5 bg-pink-500 rounded-full animate-pulse" />
      </div>

      {text && (
        <div className="flex flex-col items-center gap-1.5 ml-1">
          <p className="text-sm font-semibold text-foreground/80 tracking-wide">
            {text}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-pink-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableLoader;
