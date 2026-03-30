import { Skeleton } from "@/components/ui/skeleton";

export default function AdminUsersLoading() {
  return (
    <div className="min-h-[calc(100vh-80px)] p-6 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 pb-4 border-b border-border/20">
        <div className="space-y-4 flex-1">
          <Skeleton className="w-[380px] h-14 rounded-2xl bg-linear-to-r from-primary/30 to-primary/10 shadow-2xl shadow-primary/5" />
          <Skeleton className="w-full max-w-3xl h-6 rounded-xl bg-muted/70" />
        </div>
        <Skeleton className="w-48 h-16 rounded-[2rem] bg-foreground/5 dark:bg-foreground/10 shadow-xl border border-border/20" />
      </div>

      {/* Filters/Search Skeleton Section */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 bg-card/10 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-border/30 shadow-inner">
        <Skeleton className="max-w-xl w-full h-16 rounded-[1.5rem] bg-muted/40 shadow-inner" />
        <div className="flex items-center gap-6">
          <Skeleton className="w-32 h-14 rounded-2xl bg-muted/60" />
          <div className="w-1 h-8 bg-border/40 rounded-full" />
          <Skeleton className="w-40 h-14 rounded-2xl bg-muted/60" />
        </div>
      </div>

      {/* Modern Table Skeleton */}
      <div className="relative overflow-hidden rounded-[3rem] border border-border/40 bg-card/20 backdrop-blur-2xl shadow-2xl">
        <div className="grid grid-cols-[80px_1fr_180px_150px_150px] gap-10 bg-muted/80 p-10 items-center">
          <Skeleton className="w-12 h-12 rounded-xl bg-muted shadow-sm" />
          <Skeleton className="w-48 h-8 rounded-xl bg-muted shadow-sm" />
          <Skeleton className="w-32 h-8 rounded-xl bg-muted shadow-sm ml-auto" />
          <Skeleton className="w-24 h-8 rounded-xl bg-muted shadow-sm ml-auto" />
          <Skeleton className="w-20 h-8 rounded-xl bg-muted shadow-sm ml-auto" />
        </div>
        
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="grid grid-cols-[80px_1fr_180px_150px_150px] gap-10 p-10 border-b border-border/20 last:border-0 hover:bg-white/5 transition-all duration-300">
            <Skeleton className="w-16 h-16 rounded-[1.25rem] bg-muted/70 shadow-inner" />
            <div className="space-y-3">
              <Skeleton className="w-1/2 h-7 rounded-xl bg-muted" />
              <Skeleton className="w-1/4 h-4 rounded-lg bg-muted/40" />
            </div>
            <Skeleton className="w-36 h-12 rounded-2xl bg-muted/50 ml-auto shadow-sm" />
            <Skeleton className="w-28 h-10 rounded-xl bg-muted/40 ml-auto shadow-sm" />
            <div className="flex justify-end gap-3">
               <Skeleton className="w-12 h-12 rounded-[1rem] bg-muted/60" />
               <Skeleton className="w-12 h-12 rounded-[1rem] bg-muted/60" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-4 px-6 mb-8">
        <Skeleton className="w-72 h-14 rounded-2xl bg-muted/40 border border-border/10 shadow-sm" />
        <div className="flex items-center gap-4">
           <Skeleton className="w-16 h-16 rounded-2xl bg-muted/30" />
           <Skeleton className="w-48 h-16 rounded-2xl bg-muted/30 shadow-lg" />
           <Skeleton className="w-16 h-16 rounded-2xl bg-muted/30" />
        </div>
      </div>
    </div>
  );
}
