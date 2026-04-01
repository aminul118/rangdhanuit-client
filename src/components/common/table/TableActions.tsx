"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw, FilterX } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTableTransition } from "@/context/TableTransitionContext";
import { cn } from "@/lib/utils";

interface TableActionsProps {
  className?: string;
}

const TableActions = ({ className }: TableActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { startTransitionWithText, isPending } = useTableTransition();

  const handleRefresh = () => {
    startTransitionWithText("Refreshing...", () => {
      router.refresh();
    });
  };

  const handleClearFilters = () => {
    startTransitionWithText("Clearing filters...", () => {
      router.push(pathname);
    });
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="outline"
        onClick={handleClearFilters}
        disabled={isPending}
        className="h-11 rounded-2xl border-white/10 bg-background/50 backdrop-blur-sm hover:bg-white/5 text-muted-foreground font-bold transition-all px-5"
      >
        <FilterX size={18} className="mr-2" />
        Clear Filters
      </Button>

      <Button
        variant="outline"
        onClick={handleRefresh}
        disabled={isPending}
        className="h-11 w-11 p-0 rounded-2xl border-white/10 bg-background/50 backdrop-blur-sm hover:bg-white/5 text-primary transition-all shadow-[0_0_15px_-5px_rgba(var(--primary),0.3)]"
      >
        <RefreshCcw
          size={18}
          className={cn(
            isPending
              ? "animate-spin"
              : "transition-transform hover:rotate-180 duration-500",
          )}
        />
      </Button>
    </div>
  );
};

export default TableActions;
