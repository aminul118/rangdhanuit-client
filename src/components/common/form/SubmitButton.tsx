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
  size?: "default" | "sm" | "lg" | "xl" | "xs" | "icon";
  /** Button type (defaults to submit) */
  type?: "submit" | "button" | "reset";
  /** Optional onClick handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

const SubmitButton = ({
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
}: SubmitButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        "w-full bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold transition-all duration-300 group active:scale-[0.98]",
        size === "xl" ? "h-14 rounded-2xl text-lg shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)]" : "shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] rounded-2xl",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className={cn("animate-spin", (size === "lg" || size === "xl") ? "h-5 w-5 mr-3" : "h-4 w-4 mr-2")} />
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
};

export default SubmitButton;
