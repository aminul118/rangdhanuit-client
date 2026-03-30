import { Skeleton } from "@/components/ui/skeleton";

export default function UserMessagesLoading() {
  return (
    <div className="max-w-5xl mx-auto p-12 min-h-[calc(100vh-120px)] animate-in fade-in duration-700">
      <div className="flex flex-col h-[calc(100vh-180px)] bg-card border rounded-[3rem] border-border/60 shadow-2xl overflow-hidden relative">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-10 border-b border-border/40 bg-muted/10 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <Skeleton className="w-20 h-20 rounded-full bg-primary/10 shadow-2xl border-4 border-background" />
            <div className="space-y-3">
              <Skeleton className="w-64 h-10 rounded-xl bg-foreground/10" />
              <div className="flex items-center gap-3">
                <Skeleton className="w-4 h-4 rounded-full bg-green-500/30" />
                <Skeleton className="w-32 h-5 rounded-lg bg-muted-foreground/20" />
              </div>
            </div>
          </div>
          <Skeleton className="w-16 h-16 rounded-full bg-muted/60" />
        </div>

        {/* Chat Content Skeleton */}
        <div className="flex-1 p-10 space-y-12 overflow-hidden bg-dot-white/[0.2]">
          <div className="flex flex-col items-start gap-5">
            <Skeleton className="w-full max-w-[550px] h-28 rounded-[2rem] bg-muted/40 rounded-tl-none shadow-md" />
            <Skeleton className="w-[200px] h-12 rounded-2xl bg-muted/30 rounded-tl-none shadow-sm" />
          </div>
          <div className="flex flex-col items-end gap-5">
            <Skeleton className="w-[450px] h-32 rounded-[2rem] bg-primary/10 rounded-tr-none shadow-md" />
            <Skeleton className="w-[150px] h-10 rounded-2xl bg-primary/5 rounded-tr-none shadow-sm" />
          </div>
          <div className="flex flex-col items-start gap-5 pt-6">
            <Skeleton className="w-full max-w-[600px] h-40 rounded-[2.5rem] bg-muted/25 rounded-tl-none shadow-md" />
          </div>
        </div>

        {/* Input Area Skeleton */}
        <div className="p-10 border-t border-border/40 flex items-center gap-6 bg-muted/5">
          <Skeleton className="w-16 h-16 rounded-full bg-muted/80 shadow-inner" />
          <div className="flex-1 relative">
            <Skeleton className="w-full h-20 rounded-3xl bg-muted/30 border border-border/30 shadow-inner" />
          </div>
          <Skeleton className="w-40 h-20 rounded-3xl bg-linear-to-br from-primary/30 to-primary/10 shadow-2xl shadow-primary/20" />
        </div>
      </div>
    </div>
  );
}
