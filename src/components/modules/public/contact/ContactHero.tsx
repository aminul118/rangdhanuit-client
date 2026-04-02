"use client";

import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

const ContactHero = () => {
  return (
    <PageHeader
      title="Get in Touch"
      subtitle="Have a project in mind or want to learn more about our services? We'd love to hear from you. Fill out the form below and we'll get back to you shortly."
      badge={{
        icon: Sparkles,
        text: "Let's Connect",
      }}
    />
  );
};

export default ContactHero;
