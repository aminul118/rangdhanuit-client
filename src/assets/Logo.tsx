import Image from "next/image";
import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width = 45, height = 45, className }: LogoProps) => {
  return (
    <Image
      src="/images/logo.svg"
      width={width}
      height={height}
      alt="Logo of Rangdhanu IT"
      className={className}
      priority
    />
  );
};

export default Logo;
