"use client";

import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

export function ServicesHero() {
  return (
    <PageHeader
      title="Tailored IT Solutions"
      subtitle="Exceed business goals with specialized digital services. From elegant UI/UX to robust cybersecurity, we redefine technical excellence."
      badge={{
        icon: Sparkles,
        text: "Our Digital Capabilities"
      }}
    />
  );
}
