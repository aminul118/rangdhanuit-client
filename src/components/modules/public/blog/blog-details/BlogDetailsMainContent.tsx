import HtmlContent from "@/components/rich-text/core/html-content";

interface BlogDetailsMainContentProps {
  content: string;
  tags: string[];
}

export const BlogDetailsMainContent = ({
  content,
  tags,
}: BlogDetailsMainContentProps) => {
  return (
    <div className="lg:col-span-2 space-y-12">
      <div className="glass-premium p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-border/50 backdrop-blur-3xl shadow-2xl overflow-hidden">
        {/* Rich Text Content */}
        <HtmlContent
          className="prose prose-lg md:prose-xl max-w-none prose-indigo prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-strong:text-indigo-400 prose-blockquote:border-indigo-600 prose-blockquote:bg-indigo-600/5 dark:prose-invert prose-blockquote:p-10 prose-blockquote:rounded-[2.5rem]"
          content={content}
        />

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="pt-12 border-t border-border/50 mt-16">
            <h3 className="text-xl font-bold mb-6 text-foreground uppercase tracking-widest">
              Explore Related Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-xs font-bold text-indigo-400 uppercase tracking-widest hover:bg-indigo-500/10 transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
