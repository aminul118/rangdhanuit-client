import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TableBadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  status?: string;
  className?: string;
}

export function TableBadge({
  children,
  variant = "outline",
  status,
  className,
}: TableBadgeProps) {
  const statusStyles: Record<string, string> = {
    PUBLISHED:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 shadow-none",
    DRAFT:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 shadow-none",
    ACTIVE:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 shadow-none",
    INACTIVE:
      "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 shadow-none",
    PENDING:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 shadow-none",
  };

  const baseStyle = status
    ? statusStyles[status.toUpperCase()]
    : "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors";

  return (
    <Badge variant={variant} className={cn(baseStyle, className)}>
      {children}
    </Badge>
  );
}
