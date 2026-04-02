"use client";

import { Container } from "@/components/common/Container";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";

export function ContactContent() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <Container>
        <SectionHeading 
          heading="Ready to Start Your Project?"
          description="Whether you have a specific project in mind or just want to explore the possibilities, we're here to help you navigate the digital landscape."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Info */}
          <ContactInfo />

          {/* Right Column: Form */}
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
