"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTableTransition } from "@/context/TableTransitionContext";
import { cn } from "@/lib/utils";

interface TableLimitProps {
  label?: string;
  options?: number[];
  className?: string;
}

const TableLimit = ({
  className,
  options = [10, 20, 30, 50],
}: Omit<TableLimitProps, "label">) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { startTransitionWithText, isPending } = useTableTransition();

  const limit = searchParams.get("limit") ?? "10";

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");

    startTransitionWithText("Updating page size...", () => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative group w-[120px]">
        <Select
          onValueChange={handleLimitChange}
          value={limit}
          disabled={isPending}
        >
          <SelectTrigger className="px-4 h-11 rounded-2xl border-white/10 bg-background/50 backdrop-blur-sm hover:bg-white/5 transition-all font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-xs">
            <span className="text-muted-foreground mr-1 font-medium italic">Show:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white rounded-2xl p-1 shadow-2xl">
            <SelectGroup>
              {options.map((opt) => (
                <SelectItem
                  key={opt}
                  value={opt.toString()}
                  className="rounded-xl hover:bg-white/10 transition-colors cursor-pointer font-bold py-2 px-3 text-xs"
                >
                  {opt}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TableLimit;
