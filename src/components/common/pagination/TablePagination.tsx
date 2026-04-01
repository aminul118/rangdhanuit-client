'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import useSearchParamsValues from "@/hooks/useSearchParamsValues";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface TablePaginationProps {
  meta: IMeta;
  className?: string;
}

const TablePagination = ({ meta, className }: TablePaginationProps) => {
  const { setParams } = useSearchParamsValues();

  const { page, totalPage } = meta;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage || newPage === page) return;

    setParams({ page: newPage });
  };

  if (totalPage <= 1) return null;

  // Logic to generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;
    
    if (totalPage <= showMax) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('ellipsis');
      
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPage - 1, page + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (page < totalPage - 2) pages.push('ellipsis');
      if (!pages.includes(totalPage)) pages.push(totalPage);
    }
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-between py-6 px-2", className)}>
      <div className="text-sm text-muted-foreground font-medium">
        Showing page <span className="text-foreground">{page}</span> of{" "}
        <span className="text-foreground">{totalPage}</span>
      </div>

      <Pagination className="justify-end w-auto mx-0">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
          </PaginationItem>

          {getPageNumbers().map((p, idx) => (
            <PaginationItem key={idx}>
              {p === 'ellipsis' ? (
                <div className="flex h-10 w-10 items-center justify-center text-muted-foreground">
                  <MoreHorizontal size={18} />
                </div>
              ) : (
                <button
                  onClick={() => handlePageChange(p as number)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border transition-all text-sm font-bold",
                    page === p
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent"
                  )}
                >
                  {p}
                </button>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPage}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
