"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  /** Text shown when not loading */
  label: string;
  /** Text shown when loading (optional) */
  loadingLabel?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Left side icon (optional) */
  icon?: ReactNode;
  /** Right side icon (optional) */
  iconRight?: ReactNode;
  /** Extra class names */
  className?: string;
  /** Button size variant from shadcn button */
  size?: "default" | "sm" | "lg" | "xs" | "icon";
  /** Button type (defaults to submit) */
  type?: "submit" | "button" | "reset";
  /** Optional onClick handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export default function SubmitButton({
  label,
  loadingLabel,
  isLoading,
  icon,
  iconRight,
  className,
  size = "default",
  type = "submit",
  onClick,
  disabled,
}: SubmitButtonProps) {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        "w-full bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] transition-all duration-300 group rounded-2xl active:scale-[0.98]",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className={cn("animate-spin", size === "lg" ? "h-5 w-5 mr-2" : "h-4 w-4 mr-2")} />
          {loadingLabel || "Processing..."}
        </>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {icon}
          {label}
          {iconRight && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {iconRight}
            </span>
          )}
        </div>
      )}
    </Button>
  );
}
