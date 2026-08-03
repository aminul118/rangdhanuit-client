const BlogCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-sm glass border-border/50 backdrop-blur-xl h-full flex flex-col">
      {/* Image area */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-muted/30 animate-pulse" />
        <div className="absolute top-4 left-4 h-7 w-24 rounded-full bg-muted/40 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col grow">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="h-3 w-24 rounded bg-muted/40 animate-pulse" />
          <div className="h-3 w-20 rounded bg-muted/40 animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-7 w-5/6 rounded-lg bg-muted/40 animate-pulse mb-3" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-border/50">
          <div className="h-3 w-36 rounded bg-muted/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
