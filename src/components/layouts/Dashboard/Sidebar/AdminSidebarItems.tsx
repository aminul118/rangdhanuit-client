"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { adminMenu } from "./adminMenu";

interface SidebarItemsProps {
  pathname: string;
  unreadCount: number;
  isCollapsed: boolean;
}

const AdminSidebarItems = ({
  pathname,
  unreadCount,
  isCollapsed,
}: SidebarItemsProps) => {
  return (
    <>
      {adminMenu.map((item) => {
        const isActive = pathname === item.href;
        const showBadge = item.badgeKey === "messages" && unreadCount > 0;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden",
                isActive
                  ? "bg-linear-to-r from-primary/10 to-purple-500/10 text-primary shadow-[inset_0_0_0_1px_hsla(var(--primary),0.2)]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
              <div className="relative">
                <item.icon
                  size={22}
                  className={cn(
                    "transition-all duration-300",
                    isActive
                      ? "text-primary scale-110"
                      : "group-hover:text-primary group-hover:scale-110",
                  )}
                />
                {showBadge && isCollapsed && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span
                    className={cn(
                      "font-medium tracking-wide transition-opacity duration-300 truncate",
                      isActive
                        ? "opacity-100 text-sm"
                        : "opacity-80 group-hover:opacity-100 text-sm",
                    )}
                  >
                    {item.label}
                  </span>
                  {showBadge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-lg shadow-red-500/20">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default AdminSidebarItems;
