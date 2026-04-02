"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import TableSearch from "../searching/TableSearch";
import TablePagination, { IMeta } from "../pagination/TablePagination";
import TableActions from "../table/TableActions";
import TableLimit from "../pagination/TableLimit";
import TableLoader from "../loader/TableLoader";
import {
  TableTransitionProvider,
  useTableTransition,
} from "@/context/TableTransitionContext";
import { motion, AnimatePresence } from "framer-motion";
import { TOP_PROGRESS_BAR, FADE_IN } from "@/constants/animations";

interface TableWrapperProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  meta?: IMeta;
  className?: string;
  showSearch?: boolean;
}

const TableWrapperContent = ({
  title,
  description,
  action,
  children,
  meta,
  className,
  showSearch = true,
}: TableWrapperProps) => {
  const { isPending, loadingText } = useTableTransition();

  return (
    <section className={cn("relative space-y-6", className)}>
      {/* Header Section: Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-foreground drop-shadow-sm">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground font-medium max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center shrink-0">{action}</div>
      </div>

      {/* Filters/Search Section */}
      {showSearch && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-2">
          <TableSearch className="max-w-md w-full" />
          <div className="flex items-center gap-4">
            <TableLimit />
            <div className="w-px h-6 bg-border/50 hidden md:block" />
            <TableActions />
          </div>
        </div>
      )}

      {/* Table Content Section */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-500">
        {/* Loading Progress Bar */}
        <AnimatePresence mode="wait">
          {isPending && (
            <motion.div
              variants={TOP_PROGRESS_BAR}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 z-60"
            />
          )}
        </AnimatePresence>

        <div
          className={cn(
            "transition-all duration-500 ease-in-out",
            isPending ? "opacity-40 grayscale-[0.2] pointer-events-none" : "opacity-100 grayscale-0"
          )}
        >
          {children}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isPending && (
            <motion.div
              variants={FADE_IN}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-xs pointer-events-none"
            >
              <TableLoader text={loadingText} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Footer */}
      {meta && (
        <div className="mt-4">
          <TablePagination meta={meta} />
        </div>
      )}
    </section>
  );
};

const TableWrapper = (props: TableWrapperProps) => {
  return (
    <TableTransitionProvider>
      <TableWrapperContent {...props} />
    </TableTransitionProvider>
  );
};

export default TableWrapper;
