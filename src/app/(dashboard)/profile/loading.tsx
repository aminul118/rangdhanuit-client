import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="container max-w-6xl py-10 px-4">
      {/* Header Skeleton */}
      <div className="mb-10 text-center md:text-left space-y-3">
        <Skeleton className="h-10 w-64 bg-linear-to-r from-primary/20 to-primary/10 rounded-md mx-auto md:mx-0" />
        <Skeleton className="h-6 w-full max-w-2xl bg-muted rounded-md mx-auto md:mx-0" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar Skeleton */}
        <div className="lg:w-72 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-full h-[52px] rounded-2xl bg-muted/50" />
          ))}
        </div>

        {/* Content Area Skeleton */}
        <div className="flex-1 bg-card border rounded-[2.5rem] p-8 md:p-12 shadow-sm relative space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="pb-8 border-b border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-10 h-10 rounded-lg bg-primary/10" />
              <Skeleton className="w-48 h-8 rounded-md bg-muted" />
            </div>
            <Skeleton className="w-full h-4 rounded-md bg-muted/60" />
            <Skeleton className="w-2/3 h-4 mt-2 rounded-md bg-muted/60" />
          </div>

          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <Skeleton className="w-32 h-32 rounded-full bg-muted shadow-inner" />
              <div className="flex-1 space-y-4 pt-4 w-full">
                <Skeleton className="w-1/2 h-5 rounded-md bg-muted mx-auto sm:mx-0" />
                <Skeleton className="w-1/3 h-4 rounded-md bg-muted/80 mx-auto sm:mx-0" />
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3 pt-2">
                <Skeleton className="w-32 h-5 rounded-md bg-muted/70" />
                <Skeleton className="w-full h-12 rounded-xl bg-muted/40 border border-border/50" />
              </div>
            ))}
            <div className="pt-4">
              <Skeleton className="w-40 h-11 rounded-xl bg-primary/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
