"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { m as m, AnimatePresence } from "framer-motion";
import { adminMenu } from "./adminMenu";
import { ChevronDown, ChevronRight, Dot } from "lucide-react";

interface SidebarItemsProps {
  pathname: string;
  unreadCount: number;
  isCollapsed: boolean;
}

const checkChildActive = (pathname: string, childHref: string) => {
  if (childHref === "/admin/licenses") {
    return pathname === "/admin/licenses";
  }
  return pathname === childHref || pathname.startsWith(childHref);
};

const AdminSidebarItems = ({
  pathname,
  unreadCount,
  isCollapsed,
}: SidebarItemsProps) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    adminMenu.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((child) =>
          checkChildActive(pathname, child.href),
        );
        if (isChildActive) {
          setOpenItems((prev) => ({ ...prev, [item.label]: true }));
        }
      }
    });
  }, [pathname]);

  const toggleItem = (label: string) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {adminMenu.map((item) => {
        const hasChildren = Boolean(item.children && item.children.length > 0);

        if (hasChildren && item.children) {
          const isAnyChildActive = item.children.some((child) =>
            checkChildActive(pathname, child.href),
          );
          const isOpen = openItems[item.label] ?? isAnyChildActive;
          const firstChildHref = item.children[0]?.href || "#";

          return (
            <div key={item.label} className="space-y-1">
              {/* Parent Accordion Header */}
              {isCollapsed ? (
                <Link href={firstChildHref}>
                  <div
                    className={cn(
                      "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden",
                      isAnyChildActive
                        ? "bg-linear-to-r from-primary/15 to-purple-500/15 text-primary shadow-[inset_0_0_0_1px_hsla(var(--primary),0.2)]"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                    title={item.label}
                  >
                    {isAnyChildActive && (
                      <m.div
                        layoutId="active-pill-collapsed"
                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                      />
                    )}
                    <item.icon
                      size={22}
                      className={cn(
                        "transition-all duration-300 shrink-0 mx-auto",
                        isAnyChildActive
                          ? "text-primary scale-110"
                          : "group-hover:text-primary group-hover:scale-110",
                      )}
                    />
                  </div>
                </Link>
              ) : (
                <div
                  onClick={() => toggleItem(item.label)}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden select-none",
                    isAnyChildActive
                      ? "bg-linear-to-r from-primary/10 to-purple-500/10 text-primary shadow-[inset_0_0_0_1px_hsla(var(--primary),0.2)] font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {isAnyChildActive && (
                    <m.div
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    />
                  )}
                  <div className="relative">
                    <item.icon
                      size={22}
                      className={cn(
                        "transition-all duration-300 shrink-0",
                        isAnyChildActive
                          ? "text-primary scale-110"
                          : "group-hover:text-primary group-hover:scale-110",
                      )}
                    />
                  </div>

                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span
                      className={cn(
                        "font-medium tracking-wide transition-opacity duration-300 truncate text-sm",
                        isAnyChildActive
                          ? "opacity-100 font-semibold"
                          : "opacity-80 group-hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </span>
                    {isOpen ? (
                      <ChevronDown
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Sub-Items Dropdown List */}
              {!isCollapsed && (
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="ml-4 pl-3.5 border-l-2 border-primary/20 space-y-1.5 py-1"
                    >
                      {item.children.map((child) => {
                        const isChildActive = checkChildActive(
                          pathname,
                          child.href,
                        );
                        const ChildIcon = child.icon;

                        return (
                          <Link key={child.href} href={child.href}>
                            <div
                              className={cn(
                                "relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer group",
                                isChildActive
                                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 translate-x-0.5"
                                  : "text-muted-foreground hover:bg-accent/80 hover:text-foreground font-medium hover:translate-x-0.5",
                              )}
                            >
                              {ChildIcon ? (
                                <ChildIcon
                                  size={16}
                                  className={cn(
                                    "shrink-0 transition-transform duration-200",
                                    isChildActive
                                      ? "text-primary-foreground scale-110"
                                      : "group-hover:scale-110 text-muted-foreground group-hover:text-foreground",
                                  )}
                                />
                              ) : (
                                <Dot
                                  size={16}
                                  className={cn(
                                    "shrink-0",
                                    isChildActive
                                      ? "text-primary-foreground scale-125"
                                      : "text-muted-foreground",
                                  )}
                                />
                              )}
                              <span className="truncate">{child.label}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </m.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        }

        const isActive = pathname === item.href;
        const showBadge = item.badgeKey === "messages" && unreadCount > 0;

        return (
          <Link key={item.href || item.label} href={item.href || "#"}>
            <div
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden",
                isActive
                  ? "bg-linear-to-r from-primary/10 to-purple-500/10 text-primary shadow-[inset_0_0_0_1px_hsla(var(--primary),0.2)]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {isActive && (
                <m.div
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
