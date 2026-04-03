"use client";

import { Zap } from "lucide-react";
import HtmlContent from "@/components/rich-text/core/html-content";

interface ServiceDetailsMainContentProps {
  content: string;
}

export const ServiceDetailsMainContent = ({
  content,
}: ServiceDetailsMainContentProps) => {
  return (
    <div className="lg:col-span-2 space-y-12">
      <div className="glass-premium p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-border/50 backdrop-blur-3xl shadow-2xl">
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-12">
          <Zap className="text-amber-400" size={24} />
          <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tighter">
            Service Breakdown
          </h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {/* Rich Text Content */}
        <HtmlContent
          className="prose prose-lg md:prose-xl max-w-none prose-indigo prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-strong:text-indigo-400 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 dark:prose-invert prose-blockquote:p-10 prose-blockquote:rounded-[2.5rem]"
          content={content}
        />
      </div>
    </div>
  );
};
