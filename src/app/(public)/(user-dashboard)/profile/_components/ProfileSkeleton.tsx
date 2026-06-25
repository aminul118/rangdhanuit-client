import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Navigation Sidebar Skeleton */}
      <div className="lg:w-72 space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="w-full h-12 rounded-2xl" />
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="flex-1 bg-card border rounded-[2.5rem] p-8 md:p-12 shadow-sm relative space-y-8">
        <div className="pb-8 border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="w-48 h-8 rounded-md" />
          </div>
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-2/3 h-4 mt-2 rounded-md" />
        </div>

        <div className="pt-2 space-y-6">
          <div className="flex gap-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex-1 space-y-4 pt-4">
              <Skeleton className="w-1/2 h-4 rounded-md" />
              <Skeleton className="w-1/3 h-4 rounded-md" />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="w-24 h-4 rounded-md" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
          ))}
          <Skeleton className="w-32 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
