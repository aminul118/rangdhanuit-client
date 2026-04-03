import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface ColumnSkeletonProps {
  width?: string;
  className?: string;
  isCircle?: boolean;
}

interface TableSkeletonProps {
  columns?: ColumnSkeletonProps[];
  rowCount?: number;
  showHeader?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  className?: string;
}

export const TableSkeleton = ({
  columns,
  rowCount = 5,
  showHeader = true,
  showFilters = true,
  showPagination = true,
  className,
}: TableSkeletonProps) => {
  // Default columns if none provided
  const defaultColumns: ColumnSkeletonProps[] = [
    { width: "w-12", isCircle: true }, // Avatar/Icon
    { width: "w-[250px]" }, // Title/Main Info
    { width: "w-32" }, // Category/Status
    { width: "w-24" }, // Date/Small text
    { width: "w-20" }, // Small text
    { width: "w-10" }, // Actions
  ];

  const displayColumns = columns || defaultColumns;

  return (
    <section className={cn("space-y-6", className)}>
      {/* Header Skeleton */}
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="space-y-3 flex-1">
            <Skeleton className="w-64 h-10 rounded-md" />
            <Skeleton className="w-full max-w-lg h-4 rounded-md" />
          </div>
          <Skeleton className="w-32 h-12 rounded-xl" />
        </div>
      )}

      {/* Filters/Search Skeleton */}
      {showFilters && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-2">
          <Skeleton className="max-w-md w-full h-12 rounded-xl" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-24 h-10 rounded-lg" />
            <div className="w-px h-6 bg-border/50 hidden md:block" />
            <Skeleton className="w-32 h-10 rounded-lg" />
          </div>
        </div>
      )}

      {/* Table Content Skeleton */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm p-1">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
              {displayColumns.map((col, idx) => (
                <TableHead key={idx} className="h-9 px-4 py-2">
                  <Skeleton className={cn("h-4 rounded", col.width || "w-24")} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {displayColumns.map((col, colIdx) => (
                  <TableCell key={colIdx} className="px-4 py-2.5">
                    <Skeleton
                      className={cn(
                        "h-8",
                        col.isCircle ? "rounded-full aspect-square" : "rounded-lg",
                        col.width || "w-full",
                        col.className
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer Skeleton */}
      {showPagination && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <Skeleton className="w-48 h-10 rounded-md" />
          <Skeleton className="w-64 h-10 rounded-md" />
        </div>
      )}
    </section>
  );
};
