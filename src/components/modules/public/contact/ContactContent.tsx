"use client";

import { Container } from "@/components/ui/Container";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import ScrollReveal from "@/components/common/animations/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";

const ContactContent = () => {
  return (
    <main className="min-h-screen pb-32 overflow-x-hidden">
      <PageHeader
        title="Get In Touch"
        subtitle="Have a question or want to work together? I'd love to hear from you."
      />

      <Container className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Info */}
          <ContactInfo />

          {/* Right Column: Form */}
          <ScrollReveal animation="fade-left" delay={0.4}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </Container>
    </main>
  );
};

export default ContactContent;
