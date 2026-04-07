"use client";

import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/Container";
import { FAQS, FAQ_CATEGORIES } from "@/constants/faq.constants";
import FAQAccordion from "./FAQAccordion";
import FAQCTA from "./FAQCTA";

interface FAQContentProps {
  search: string;
  category: string;
}

const FAQContent = ({ search, category }: FAQContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val && val !== "All") {
      params.set("category", val);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || faq.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className={`pb-32 relative transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
      <Container>
        <Tabs
          defaultValue="All"
          value={category}
          onValueChange={handleCategoryChange}
          className="w-full"
        >
          {/* Category Tabs */}
          <div className="flex justify-center mb-16">
            <TabsList className="flex-wrap h-auto gap-2 px-2 py-2">
              {FAQ_CATEGORIES.map((categoryItem) => (
                <TabsTrigger
                  key={categoryItem}
                  value={categoryItem}
                  className="px-6 py-2.5"
                >
                  {categoryItem}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        {/* FAQ Modular Results */}
        <FAQAccordion 
          items={filteredFaqs} 
          activeCategory={category} 
          searchQuery={search} 
        />

        {/* Modular CTA Section */}
        <FAQCTA />
      </Container>
    </section>
  );
};

export default FAQContent;
