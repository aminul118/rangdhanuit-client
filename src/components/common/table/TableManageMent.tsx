"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Eye,
  MoreHorizontal,
  Trash,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTableTransition } from "@/context/TableTransitionContext";
import { cn } from "@/lib/utils";

/* =======================
   Column Type
 ======================= */
export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => ReactNode);
  className?: string;
  sortKey?: string;
}

/* =======================
   Props Type
 ======================= */
interface TableManageMentProps<T> {
  data?: T[] | unknown;
  columns: Column<T>[];
  getRowKey: (row: T) => string;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

/* =======================
   Component
 ======================= */
function TableManageMent<T>({
  data,
  columns,
  getRowKey,
  onView,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isRefreshing = false,
}: TableManageMentProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startTransitionWithText } = useTableTransition();

  const currentSort = searchParams.get("sort") || "";
  const isAsc = !currentSort.startsWith("-");
  const activeSortKey = isAsc ? currentSort : currentSort.slice(1);

  const handleSort = (sortKey: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeSortKey === sortKey) {
      if (isAsc) {
        params.set("sort", `-${sortKey}`);
      } else {
        params.delete("sort");
      }
    } else {
      params.set("sort", sortKey);
    }

    startTransitionWithText("Sorting...", () => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const hasActions = Boolean(onView || onEdit || onDelete);

  const safeData: T[] = Array.isArray(data) ? data : [];

  return (
    <section>
      <div className="relative rounded-sm border">
        <Table>
          {/* ===== Header ===== */}
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "h-9 px-4 py-2 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/80 whitespace-nowrap",
                    column.className,
                    column.sortKey &&
                      "cursor-pointer hover:bg-muted/50 transition-colors select-none group",
                  )}
                  onClick={() => column.sortKey && handleSort(column.sortKey)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortKey && (
                      <span className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">
                        {activeSortKey === column.sortKey ? (
                          isAsc ? (
                            <ChevronUp size={12} className="text-primary" />
                          ) : (
                            <ChevronDown size={12} className="text-primary" />
                          )
                        ) : (
                          <ChevronsUpDown size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}

              {hasActions && (
                <TableHead className="w-[70px] h-9 px-4 py-2 text-[11px] uppercase tracking-wider font-semibold text-center">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          {/* ===== Body ===== */}
          <TableBody>
            {safeData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-muted-foreground py-8 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              safeData.map((item, rowIndex) => (
                <TableRow key={getRowKey(item)}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn("px-4 py-2.5 text-sm", col.className)}
                    >
                      {typeof col.accessor === "function"
                        ? col.accessor(item, rowIndex)
                        : (((item as Record<string, unknown>)[
                            col.accessor as string
                          ] as ReactNode) ?? "")}
                    </TableCell>
                  ))}

                  {hasActions && (
                    <TableCell className="text-center px-4 py-2.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          )}

                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}

                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default TableManageMent;
