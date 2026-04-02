"use client";

import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export function PortfolioHero() {
  return (
    <PageHeader
      title="Our Portfolio"
      subtitle="Explore our recent projects and see how we've helped our clients achieve their digital goals with premium IT solutions."
      badge={{
        icon: Sparkles,
        text: "Case Studies & Success",
      }}
    />
  );
}
