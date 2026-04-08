"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function FAQSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="relative flex items-center">
        <Search
          className={`absolute left-6 transition-colors ${
            isPending ? "text-primary animate-pulse" : "border-border/50 text-muted-foreground group-focus-within:text-primary"
          }`}
          size={22}
        />
        <input
          type="text"
          placeholder="Search for questions, categories, or keywords..."
          aria-label="Search FAQs"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-16 pr-8 py-5 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-hidden text-base font-medium transition-all shadow-lg"
        />
      </div>
    </div>
  );
}
