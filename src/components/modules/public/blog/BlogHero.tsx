"use client";

import { Sparkles } from "lucide-react";
import { Suspense } from "react";
import BlogSearch from "@/components/modules/public/blog/BlogSearch";
import { PageHeader } from "@/components/ui/PageHeader";

export const BlogHero = () => {
  return (
    <PageHeader
      title="Digital Insights & Innovation"
      subtitle="Latest from our creative minds. Explore our thoughts on technology, design, and the future of IT."
      badge={{
        icon: Sparkles,
        text: "Our Journal",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <Suspense
          fallback={
            <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
          }
        >
          <BlogSearch />
        </Suspense>
      </div>
    </PageHeader>
  );
};
