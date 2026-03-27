'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import TableSearch from '../searching/TableSearch';
import TablePagination, { IMeta } from '../pagination/TablePagination';
import TableActions from '../table/TableActions';
import TableLimit from '../pagination/TableLimit';
import CenterSpinner from '../loader/CenterSpinner';
import { TableTransitionProvider, useTableTransition } from '@/context/TableTransitionContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section className={cn('relative space-y-6', className)}>
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
        <div className="flex items-center shrink-0">
          {action}
        </div>
      </div>

      {/* Filters/Search Section */}
      {showSearch && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-2">
          <TableSearch className="max-w-md w-full" />
          <div className="flex items-center gap-4">
            <TableLimit />
            <div className="w-px h-6 bg-white/10 hidden md:block" />
            <TableActions />
          </div>
        </div>
      )}

      {/* Table Content Section */}
      <div className="relative overflow-hidden rounded-sm border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm transition-all duration-500">
        <div 
          className={cn(
            'transition-all duration-700 ease-in-out', 
            isPending ? 'opacity-40 blur-[4px] scale-[0.99]' : 'opacity-100 blur-0 scale-100'
          )}
        >
          {children}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isPending && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none"
            >
              <CenterSpinner text={loadingText} />
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
