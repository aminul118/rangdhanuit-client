"use client";

import React from "react";
import CreationHeader from "@/components/common/layouts/CreationHeader";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  backLink: string;
  children: React.ReactNode;
}

/**
 * A standard layout component for admin creation and editing pages.
 * It provides a consistent container and visual header.
 */
export default function FormLayout({
  title,
  subtitle,
  backLink,
  children,
}: FormLayoutProps) {
  return (
    <div className="container mx-auto pb-32 px-4 md:px-0">
      <CreationHeader
        title={title}
        subtitle={subtitle}
        backLink={backLink}
      />
      {children}
    </div>
  );
}
