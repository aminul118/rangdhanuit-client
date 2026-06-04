"use client";

import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export const AboutHero = () => {
  return (
    <PageHeader
      title="Empowering Digital Transformation"
      subtitle="We are a team of passionate developers, designers, and digital strategists committed to helping businesses scale through technology and innovation."
      badge={{
        icon: Sparkles,
        text: "Our Vision & Story",
      }}
    />
  );
};
