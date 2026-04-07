import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPortfoliosLoading() {
  return (
    <div className="min-h-[calc(100vh-80px)] p-6 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
        <div className="space-y-4 flex-1">
          <Skeleton className="w-[320px] h-12 rounded-xl bg-linear-to-r from-primary/30 to-primary/10 shadow-lg" />
          <Skeleton className="w-full max-w-2xl h-5 rounded-lg bg-muted/60" />
        </div>
        <Skeleton className="w-44 h-14 rounded-2xl bg-primary/20 shadow-2xl shadow-primary/10 border border-primary/10" />
      </div>

      {/* Filters/Search Skeleton */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 py-4 bg-muted/5 p-6 rounded-[2rem] border border-border/40 backdrop-blur-sm">
        <Skeleton className="max-w-md w-full h-14 rounded-2xl bg-muted/40 shadow-inner border border-border/30" />
        <div className="flex items-center gap-6">
          <Skeleton className="w-28 h-12 rounded-xl bg-muted/60" />
          <div className="w-px h-8 bg-border/40 hidden md:block" />
          <Skeleton className="w-36 h-12 rounded-xl bg-muted/60" />
        </div>
      </div>

      {/* Table Content Skeleton */}
      <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl transition-all duration-500">
        <div className="flex items-center gap-6 bg-muted/50 p-8 border-b border-border/40">
          <Skeleton className="w-10 h-10 rounded-lg bg-muted" />
          <Skeleton className="w-48 h-6 rounded-md bg-muted" />
          <Skeleton className="flex-1 h-6 rounded-md bg-muted/80" />
          <Skeleton className="w-40 h-6 rounded-md bg-muted/80" />
          <Skeleton className="w-32 h-6 rounded-md bg-muted/80" />
          <Skeleton className="w-24 h-6 rounded-md bg-muted/80" />
        </div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex items-center gap-6 p-8 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors"
          >
            <Skeleton className="w-12 h-12 rounded-xl bg-muted/70 shadow-sm" />
            <div className="flex-1 space-y-3">
              <Skeleton className="w-2/3 h-6 rounded-lg bg-muted" />
              <Skeleton className="w-1/3 h-4 rounded-lg bg-muted/40" />
            </div>
            <Skeleton className="w-40 h-10 rounded-xl bg-muted/50" />
            <Skeleton className="w-32 h-8 rounded-lg bg-muted/40" />
            <Skeleton className="w-24 h-5 rounded-lg bg-muted/40" />
            <Skeleton className="w-20 h-10 rounded-xl bg-muted/60" />
          </div>
        ))}
      </div>

      {/* Pagination Footer Skeleton */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
        <Skeleton className="w-56 h-12 rounded-xl bg-muted/50 shadow-sm" />
        <div className="flex gap-3">
          <Skeleton className="w-12 h-12 rounded-xl bg-muted/40" />
          <Skeleton className="w-32 h-12 rounded-xl bg-muted/40" />
          <Skeleton className="w-12 h-12 rounded-xl bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
