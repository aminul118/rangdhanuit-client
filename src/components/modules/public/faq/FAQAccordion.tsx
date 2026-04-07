"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQItem } from "@/constants/faq.constants";

interface FAQAccordionProps {
  items: FAQItem[];
  activeCategory: string;
  searchQuery: string;
}

const FAQAccordion = ({ items, activeCategory, searchQuery }: FAQAccordionProps) => {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 bg-card/20 rounded-[3rem] border border-dashed border-border/50"
      >
        <p className="text-muted-foreground text-lg font-medium italic">
          No questions found matching your criteria. Try adjusting your search or category filter.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="px-6 rounded-3xl bg-card/30 border border-border/50 hover:border-primary/20 transition-all duration-500 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex flex-col items-start gap-2 pr-4 text-left">
                    <Badge
                      variant="secondary"
                      className="text-[10px] uppercase tracking-widest font-black py-0.5 px-2 bg-primary/5 text-primary border-primary/10"
                    >
                      {faq.category}
                    </Badge>
                    <span className="text-xl md:text-2xl font-black text-foreground">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground leading-relaxed pt-2 pb-8 border-t border-border/10 mt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FAQAccordion;
