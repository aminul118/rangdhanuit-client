import { Skeleton } from "@/components/ui/skeleton";

export default function AdminMessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-120px)] gap-6 p-6 animate-in fade-in duration-500">
      {/* Sidebar Skeleton (Conversation List) */}
      <div className="flex-1 max-w-[380px] flex flex-col gap-4">
        <Skeleton className="h-10 w-full rounded-xl bg-muted/40 mb-2" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex gap-4 p-4 items-center bg-card/40 border border-border/50 rounded-[1.25rem] shadow-sm"
          >
            <Skeleton className="w-14 h-14 rounded-full shrink-0 bg-muted shadow-inner" />
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="w-2/3 h-5 rounded-md bg-muted" />
                <Skeleton className="w-12 h-3 rounded-full bg-muted/60" />
              </div>
              <Skeleton className="w-full h-4 rounded-md bg-muted/40" />
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window Skeleton */}
      <div className="flex-2 flex flex-col items-stretch space-y-6 bg-card border rounded-[2.5rem] border-border/50 shadow-2xl relative overflow-hidden p-8 h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-border/40">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-full bg-primary/10 shadow-lg" />
            <div className="space-y-2.5">
              <Skeleton className="w-48 h-6 rounded-md bg-muted" />
              <Skeleton className="w-24 h-4 rounded-md bg-muted/60" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="w-10 h-10 rounded-full bg-muted" />
            <Skeleton className="w-10 h-10 rounded-full bg-muted" />
          </div>
        </div>

        {/* Messages List Skeleton */}
        <div className="flex-1 flex flex-col space-y-8 overflow-hidden pt-6">
          <div className="flex flex-col items-start gap-4">
            <Skeleton className="w-2/3 max-w-[450px] h-20 rounded-2xl bg-muted/40 rounded-tl-none mr-20" />
            <Skeleton className="w-[180px] h-12 rounded-2xl bg-muted/30 rounded-tl-none" />
          </div>
          <div className="flex flex-col items-end gap-4">
            <Skeleton className="w-1/2 max-w-[400px] h-24 rounded-2xl bg-primary/10 rounded-tr-none ml-20" />
            <Skeleton className="w-[140px] h-10 rounded-2xl bg-primary/5 rounded-tr-none" />
          </div>
          <div className="flex flex-col items-start gap-4 pt-4">
            <Skeleton className="w-3/4 max-w-[500px] h-32 rounded-2xl bg-muted/20 rounded-tl-none" />
          </div>
        </div>

        {/* Input Area Skeleton */}
        <div className="pt-6 mt-auto border-t border-border/40 flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full bg-muted shrink-0" />
          <Skeleton className="flex-1 h-14 rounded-2xl bg-muted/30 border border-border/30" />
          <Skeleton className="w-28 h-14 rounded-2xl bg-primary/20 shadow-lg" />
        </div>
      </div>
    </div>
  );
}
