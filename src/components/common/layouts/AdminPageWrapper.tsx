import { ReactNode, Suspense } from "react";
import {
  ColumnSkeletonProps,
  TableSkeleton,
} from "@/components/common/loader/TableSkeleton";

interface AdminPageWrapperProps {
  children: ReactNode;
  padding?: string;
  skeletonColumns?: ColumnSkeletonProps[];
  customSkeleton?: ReactNode;
}

export const AdminPageWrapper = ({
  children,
  padding = "",
  skeletonColumns,
  customSkeleton,
}: AdminPageWrapperProps) => {
  const fallback = customSkeleton || (
    <TableSkeleton columns={skeletonColumns} />
  );

  return (
    <div className={`min-h-[calc(100vh-80px)] ${padding}`}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  );
};
