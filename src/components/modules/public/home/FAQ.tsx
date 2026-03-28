'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, feel free to contact us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
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
                    <div className="px-8 pb-8 text-muted-foreground leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
