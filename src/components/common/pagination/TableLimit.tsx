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
import { Hash } from "lucide-react";

interface TableLimitProps {
  label?: string;
  options?: number[];
  className?: string;
}

const TableLimit = ({
  label = "Show",
  className,
  options = [10, 20, 30, 50],
}: TableLimitProps) => {
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
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] whitespace-nowrap ml-1 mb-0.5">
        {label}
      </span>
      <div className="relative group w-24">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors z-10">
          <Hash size={14} strokeWidth={3} />
        </div>
        <Select
          onValueChange={handleLimitChange}
          value={limit}
          disabled={isPending}
        >
          <SelectTrigger className="pl-9 h-11 rounded-2xl border-white/10 bg-background/50 backdrop-blur-sm hover:bg-white/5 transition-all font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white rounded-2xl p-1 shadow-2xl">
            <SelectGroup>
              {options.map((opt) => (
                <SelectItem
                  key={opt}
                  value={opt.toString()}
                  className="rounded-xl hover:bg-white/10 transition-colors cursor-pointer font-bold py-2.5"
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
