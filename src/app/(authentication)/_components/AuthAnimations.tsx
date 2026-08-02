"use client";

import React from "react";

export const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return <div>{children}</div>;
};

export const FadeInLeft = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export const FadeInUp = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export const FadeInScale = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export const AnimatedGradientBg = () => {
  return (
    <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 via-transparent to-purple-500/10" />
  );
};

export const HoverScaleLogo = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};
