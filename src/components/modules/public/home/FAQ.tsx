'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const faqs = [
  {
    question: "What services does Rangdhanu IT provide?",
    answer: "We offer a comprehensive suite of IT solutions, including Web Development (React, Next.js), Mobile App Development (React Native), Digital Marketing, UI/UX Design, and SEO Services.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity. A simple website might take 2-4 weeks, while a complex enterprise application or mobile app could take 3-6 months. We provide detailed timelines during the discovery phase.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we provide ongoing maintenance and support packages to ensure your digital products remain secure, up-to-date, and performant.",
  },
  {
    question: "Can you help with digital strategy?",
    answer: "Absolutely. We don't just build code; we help you define your digital roadmap, identify growth opportunities, and implement data-driven strategies.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative bg-background text-foreground transition-colors duration-500">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium"
          >
            Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, feel free to contact us.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-border/50 overflow-hidden glass backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-accent transition-colors"
              >
                <span className="text-xl font-bold">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-muted-foreground leading-relaxed text-lg font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
