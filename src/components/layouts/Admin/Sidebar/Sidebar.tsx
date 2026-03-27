"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import sidebarMenus from "./SidebarMenus";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative flex flex-col h-screen border-r border-white/10 bg-background/80 backdrop-blur-xl transition-colors duration-300 z-40",
        "before:absolute before:inset-0 before:bg-linear-to-b before:from-indigo-500/5 before:to-purple-500/5 before:-z-10",
      )}
    >
      <div className="flex items-center justify-between p-4 h-20 border-b border-white/5 shrink-0">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <Link
              href="/"
              className="font-bold text-lg tracking-tight bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
            >
              Rangdhanu{" "}
              <span className="text-foreground/80 font-medium text-sm block -mt-1 uppercase tracking-widest">
                Admin
              </span>
            </Link>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-xl hover:bg-white/5 transition-all duration-300",
            isCollapsed ? "mx-auto" : "ml-auto",
          )}
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-muted-foreground" />
          ) : (
            <ChevronLeft size={20} className="text-muted-foreground" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar min-h-0">
        {sidebarMenus.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden",
                  isActive
                    ? "bg-linear-to-r from-indigo-500/10 to-purple-500/10 text-indigo-500 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                  />
                )}
                <item.icon
                  size={22}
                  className={cn(
                    "transition-all duration-300",
                    isActive
                      ? "text-indigo-500 scale-110"
                      : "group-hover:text-indigo-500 group-hover:scale-110",
                  )}
                />
                {!isCollapsed && (
                  <span
                    className={cn(
                      "font-medium tracking-wide transition-opacity duration-300",
                      isActive
                        ? "opacity-100"
                        : "opacity-80 group-hover:opacity-100 text-sm",
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
