const AuthLayoutSkeleton = () => {
  return (
    <div className="relative grid lg:max-w-none lg:grid-cols-2 h-screen overflow-hidden bg-background">
      {/* Left Panel Skeleton */}
      <div className="sticky top-0 hidden h-screen flex-col bg-background p-10 lg:flex border-r border-border/50">
        <div className="relative z-20 flex items-center">
          <div className="h-12 w-12 animate-pulse rounded-full bg-muted/50" />
        </div>
        <div className="relative z-20 mt-auto max-w-md space-y-6">
          <div className="h-1 w-12 rounded-full bg-muted/50" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-muted/50" />
            <div className="h-8 w-1/2 animate-pulse rounded-lg bg-muted/50" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted/30" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted/30" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted/30" />
          </div>
        </div>
      </div>

      {/* Right Panel Skeleton */}
      <div className="relative overflow-y-auto h-screen flex items-center justify-center bg-background lg:bg-transparent">
        <div className="w-full max-w-[420px] space-y-6 px-6">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-8 space-y-6">
            <div className="mx-auto h-16 w-16 animate-pulse rounded-2xl bg-muted/50" />
            <div className="space-y-2 text-center">
              <div className="mx-auto h-7 w-32 animate-pulse rounded-lg bg-muted/50" />
              <div className="mx-auto h-4 w-48 animate-pulse rounded bg-muted/30" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-14 animate-pulse rounded-2xl bg-muted/30" />
              <div className="h-14 animate-pulse rounded-2xl bg-muted/30" />
            </div>
            <div className="h-14 animate-pulse rounded-2xl bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutSkeleton;
