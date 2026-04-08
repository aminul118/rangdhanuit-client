import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  iconClassName?: string;
}

const Logo = ({
  width = 45,
  height = 45,
  className,
  showText = true,
  textClassName,
  iconClassName,
}: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative shrink-0", iconClassName)}>
        <Image
          src="/logo.svg"
          width={width}
          height={height}
          alt="Logo of Rangdhanu IT"
          priority
          style={{ height: "auto" }}
          className="relative"
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tighter flex items-center leading-none whitespace-nowrap",
            textClassName || "text-lg sm:text-2xl",
          )}
        >
          <span className="bg-linear-to-r from-primary via-primary to-primary bg-clip-text text-transparent drop-shadow-sm">
            Rangdhanu
          </span>
          <span className="ml-1 text-[#6d28d9] font-black relative flex items-center">
            IT
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#6d28d9] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-300 shadow-[0_0_8px_rgba(109,40,217,0.5)]" />
          </span>
        </span>
      )}
    </div>
  );
};

export default Logo;
