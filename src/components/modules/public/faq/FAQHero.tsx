"use client";

import { HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import FAQSearch from "./FAQSearch";

const FAQHero = () => {
  return (
    <PageHeader
      title="Knowledge & Digital Support"
      subtitle="Insights from our technical experts. Explore everything you need to know about our services, professional process, and implementation strategies."
      badge={{
        icon: HelpCircle,
        text: "Help Center",
      }}
    >
      <FAQSearch />
    </PageHeader>
  );
};

export default FAQHero;
