const PortfolioCardSkeleton = () => {
  return (
    <div className="glass-premium rounded-sm border border-border/50 overflow-hidden bg-card/40 flex flex-col h-full shadow-2xl">
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden bg-muted/30 animate-pulse" />

      {/* Content */}
      <div className="p-8 flex flex-col grow space-y-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 rounded-full bg-muted/40 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-muted/40 animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-7 w-5/6 rounded-lg bg-muted/40 animate-pulse" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="h-3 w-32 rounded bg-muted/40 animate-pulse" />
          <div className="h-10 w-10 rounded-full bg-muted/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardSkeleton;
