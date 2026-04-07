"use client";

import { useState } from "react";
import FAQHero from "./FAQHero";
import FAQContent from "./FAQContent";

export default function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <FAQHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FAQContent searchQuery={searchQuery} />
    </main>
  );
}
