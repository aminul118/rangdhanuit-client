import { Container } from "@/components/ui/Container";

export const SidebarSkeleton = () => {
  return (
    <aside className="space-y-8 lg:w-[380px] animate-pulse">
      {/* Recent Articles Skeleton */}
      <div className="space-y-6">
        <div className="h-7 w-48 bg-muted/20 rounded-lg mb-6" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="h-20 w-24 bg-muted/20 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 w-full bg-muted/20 rounded" />
              <div className="h-4 w-2/3 bg-muted/20 rounded" />
              <div className="h-3 w-20 bg-muted/20 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Block Skeleton */}
      <div className="p-10 rounded-[3.5rem] bg-muted/10 h-64 flex flex-col justify-end">
        <div className="h-8 w-2/3 bg-muted/20 rounded mb-4" />
        <div className="h-4 w-full bg-muted/20 rounded mb-2" />
        <div className="h-4 w-full bg-muted/20 rounded mb-8" />
        <div className="h-14 w-full bg-muted/20 rounded-2xl" />
      </div>
    </aside>
  );
};
