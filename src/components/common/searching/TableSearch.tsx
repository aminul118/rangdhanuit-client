'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useTableTransition } from '@/context/TableTransitionContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className={cn("relative group max-w-sm w-full", className)}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search size={18} strokeWidth={2.5} />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-10 h-11 bg-background/50 backdrop-blur-sm border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="p-1 rounded-full hover:bg-white/10">
              <X size={16} strokeWidth={3} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableSearch;
