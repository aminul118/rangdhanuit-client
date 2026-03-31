'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useTableTransition } from '@/context/TableTransitionContext';
import { motion, AnimatePresence } from 'framer-motion';
import { POP_IN, POP_IN_TRANSITION } from '@/constants/animations';

interface TableSearchProps {
  placeholder?: string;
  className?: string;
}

const TableSearch = ({
  placeholder = 'Search...',
  className,
}: TableSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchTerm') || '';
  const [query, setQuery] = useState(searchQuery);

  const { startTransitionWithText } = useTableTransition();

  // Debounced search update
  const updateSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('searchTerm', value);
      params.set('page', '1'); // Reset to first page on search
    } else {
      params.delete('searchTerm');
    }
    
    startTransitionWithText('Searching...', () => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [pathname, router, searchParams, startTransitionWithText]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query !== searchQuery) {
        updateSearch(query);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchQuery, updateSearch]);

  const handleClear = () => {
    setQuery('');
    updateSearch('');
  };

  return (
    <div className={cn("relative group max-w-md w-full", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full bg-muted/10 border border-border/50 hover:border-border focus:border-indigo-500/50 rounded-2xl pl-12 pr-10 py-2.5 text-sm outline-none transition-all duration-300 backdrop-blur-sm h-11"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <AnimatePresence>
        {query && (
          <motion.button
            variants={POP_IN}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={POP_IN_TRANSITION}
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
              <X size={16} strokeWidth={3} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableSearch;
