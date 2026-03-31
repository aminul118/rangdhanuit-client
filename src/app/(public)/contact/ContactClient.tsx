"use client";

import { ContactHero } from "@/components/modules/public/contact/ContactHero";
import { ContactContent } from "@/components/modules/public/contact/ContactContent";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <ContactHero />
      <ContactContent />
    </div>
  );
}
