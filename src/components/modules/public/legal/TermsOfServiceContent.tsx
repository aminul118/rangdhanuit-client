"use client";

import { motion } from "framer-motion";
import { Scale, Sparkles, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export default function TermsOfServiceContent() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="w-6 h-6" />,
      content: "By accessing or using Rangdhanu IT's website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you should not use our services."
    },
    {
      title: "Use of Our Services",
      icon: <FileText className="w-6 h-6" />,
      content: "Our services are intended for professional and business use. You agree to use them for lawful purposes and in a way that does not infringe on the rights of others or restrict their use of the platform."
    },
    {
      title: "Intellectual Property",
      icon: <Scale className="w-6 h-6" />,
      content: "All content, logos, designs, and code on our website are the property of Rangdhanu IT and are protected by intellectual property laws. You may not reproduce or use our brand assets without explicit written permission."
    },
    {
      title: "Limitation of Liability",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: "Rangdhanu IT will not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our maximum liability shall not exceed the amount paid for the service in question."
    },
    {
      title: "Termination of Service",
      icon: <Scale className="w-6 h-6" />,
      content: "We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any violation of these Terms of Service or for any other reason we deem appropriate."
    }
  ];

  return (
    <div className="flex flex-col pb-24 font-sans border-t border-border/50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center bg-linear-to-b from-violet-50/50 to-transparent dark:from-violet-950/20">
        <Container>
          <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 text-[10px] md:text-xs font-bold mb-8 uppercase tracking-widest backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Usage Guidelines</span>
          </motion.div>

          <motion.h1 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-foreground"
          >
            Terms of <span className="text-violet-600">Service</span>
          </motion.h1>
          
          <motion.p 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Last Updated: March 31, 2026. Please read these terms carefully 
            before using our services or starting a project.
          </motion.p>
        </Container>
      </section>

      {/* Content Section */}
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.1 * index }}
              className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* FAQ/Support Link */}
          <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="p-12 rounded-[2.5rem] bg-zinc-900 text-white border border-white/10 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Need Clarification?</h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              If something isn&apos;t clear, our legal and support teams are here to help explain our terms.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
