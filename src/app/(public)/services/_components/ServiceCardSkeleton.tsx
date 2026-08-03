const ServiceCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-sm glass border-border/50 backdrop-blur-xl h-full flex flex-col">
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden bg-muted/30 animate-pulse" />

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-20 rounded bg-muted/40 animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-7 w-3/4 rounded-lg bg-muted/40 animate-pulse mb-3" />

        {/* Description - 3 lines */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full rounded bg-muted/30 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-muted/30 animate-pulse" />
          <div className="h-4 w-4/6 rounded bg-muted/30 animate-pulse" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="h-3 w-28 rounded bg-muted/40 animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-muted/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
