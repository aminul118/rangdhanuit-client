import { Skeleton } from "@/components/ui/skeleton";

export const MessagingSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] gap-6 p-6">
      {/* Sidebar Skeleton (Conversation List) */}
      <div className="flex-1 max-w-[350px] space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex gap-4 p-4 items-center bg-card/30 border border-border/50 rounded-2xl"
          >
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-2/3 h-4 rounded-md" />
              <Skeleton className="w-1/2 h-3 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window Skeleton */}
      <div className="flex-2 flex flex-col items-stretch space-y-6 bg-card border rounded-2xl border-white/10 shadow-xl shadow-indigo-500/5 p-6 h-full">
        <div className="flex items-center gap-4 pb-4 border-b border-white/10">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-4 rounded-md" />
            <Skeleton className="w-20 h-3 rounded-md" />
          </div>
        </div>
        <div className="flex-1 space-y-6 overflow-hidden pt-4">
          <div className="flex flex-col items-start space-y-3">
            <Skeleton className="w-64 h-12 rounded-2xl" />
            <Skeleton className="w-48 h-10 rounded-2xl" />
          </div>
          <div className="flex flex-col items-end space-y-3">
            <Skeleton className="w-56 h-12 rounded-2xl" />
            <Skeleton className="w-32 h-10 rounded-2xl" />
          </div>
          <div className="flex flex-col items-start space-y-3 pt-4">
            <Skeleton className="w-72 h-16 rounded-2xl" />
          </div>
        </div>
        <div className="pt-4 flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="flex-1 h-12 rounded-xl" />
          <Skeleton className="w-24 h-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
