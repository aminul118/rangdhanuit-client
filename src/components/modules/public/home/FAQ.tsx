"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const faqs = [
  {
    question: "What services does Rangdhanu IT provide?",
    answer:
      "We offer a comprehensive suite of IT solutions, including Web Development (React, Next.js), Mobile App Development (React Native), Digital Marketing, UI/UX Design, and SEO Services.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on complexity. A simple website might take 2-4 weeks, while a complex enterprise application or mobile app could take 3-6 months. We provide detailed timelines during the discovery phase.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, we provide ongoing maintenance and support packages to ensure your digital products remain secure, up-to-date, and performant.",
  },
  {
    question: "Can you help with digital strategy?",
    answer:
      "Absolutely. We don't just build code; we help you define your digital roadmap, identify growth opportunities, and implement data-driven strategies.",
  },
];

const FAQ = () => {
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
            Got questions? We&apos;ve got answers. If you don&apos;t find what
            you&apos;re looking for, feel free to contact us.
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
              className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                openIndex === index 
                  ? "border-primary/40 glow-primary bg-card/80" 
                  : "border-border/50 glass-premium hover:border-primary/30"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left transition-colors relative"
              >
                {openIndex === index && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-violet-500" />
                )}
                <span className={`text-xl font-black tracking-tight transition-colors ${openIndex === index ? "text-primary" : "text-foreground"}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-xl transition-all duration-500 ${openIndex === index ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-8 text-muted-foreground leading-relaxed text-lg font-medium">
                      <div className="pt-4 border-t border-border/50">
                        {faq.answer}
                      </div>
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
};

export default FAQ;
