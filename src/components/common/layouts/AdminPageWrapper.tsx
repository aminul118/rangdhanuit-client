import { ReactNode, Suspense } from "react";
import { TableSkeleton } from "@/components/common/loader/TableSkeleton";

interface AdminPageWrapperProps {
  children: ReactNode;
  padding?: string;
  skeletonColumns?: { width: string }[];
  customSkeleton?: ReactNode;
}

export const AdminPageWrapper = ({
  children,
  padding = "p-6 md:p-12",
  skeletonColumns,
  customSkeleton,
}: AdminPageWrapperProps) => {
  const fallback = customSkeleton || <TableSkeleton columns={skeletonColumns} />;
  
  return (
    <div className={`min-h-[calc(100vh-80px)] ${padding}`}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};
