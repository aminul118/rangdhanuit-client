"use client";

import { Container } from "@/components/ui/Container";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/common/animations/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";

const ContactContent = () => {
  return (
    <Container>
      <PageHeader
        title="Get In Touch"
        subtitle="WHave a question or want to work together? I'd love to hear from you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Info */}
        <ContactInfo />

        {/* Right Column: Form */}
        <ScrollReveal animation="fade-left" delay={0.4}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </Container>
  );
};

export default ContactContent;
