"use client";

import React from "react";
import CreationHeader from "@/components/common/layouts/CreationHeader";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  backLink: string;
  children: React.ReactNode;
  extraActions?: React.ReactNode;
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
  extraActions,
}: FormLayoutProps) {
  return (
    <div className="w-full">
      <CreationHeader
        title={title}
        subtitle={subtitle}
        backLink={backLink}
        extraActions={extraActions}
      />
      {children}
    </div>
  );
}
