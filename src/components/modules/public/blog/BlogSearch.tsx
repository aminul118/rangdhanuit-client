"use client";

import { Search } from "lucide-react";
import { useTransition, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSearchParamsValues from "@/hooks/useSearchParamsValues";

export default function BlogSearch() {
  const { values, setParams } = useSearchParamsValues("search");
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(values.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setParams({ search: searchValue });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, setParams]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative max-w-xl mx-auto"
    >
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
        <Search className={`w-5 h-5 ${isPending ? 'text-indigo-500 animate-pulse' : 'text-muted-foreground'}`} />
      </div>
      <input
        type="text"
        placeholder="Search for articles, technologies, and more..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-muted/10 border border-border/50 focus:border-indigo-500/50 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg font-medium"
      />
    </motion.div>
  );
}
