"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { getSidebarMenus } from "./SidebarMenus";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { unreadCount } = useSocket();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = user?.role || "USER";

  const menus = getSidebarMenus(role);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative flex flex-col h-screen border-r border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-300 z-40",
        "before:absolute before:inset-0 before:bg-linear-to-b before:from-primary/5 before:to-purple-500/5 before:-z-10",
      )}
    >
      <div className="flex items-center justify-between p-4 h-20 border-b border-border/50 shrink-0">
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <Link href="/" className="flex flex-col leading-none group">
              <Logo
                width={36}
                height={36}
                textClassName="text-lg"
                className="gap-2.5 mb-1"
              />
              <span className="text-muted-foreground/60 font-medium text-[10px] uppercase tracking-widest ml-[46px]">
                {role === "ADMIN" || role === "SUPER_ADMIN"
                  ? "Admin Panel"
                  : "User Portal"}
              </span>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto"
          >
            <Link href="/">
              <Logo className="w-8 h-8" />
            </Link>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-xl hover:bg-accent transition-all duration-300",
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

      <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-2 custom-scrollbar min-h-0">
        {menus.map((item) => {
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
      </nav>
    </motion.div>
  );
};

export default Sidebar;
