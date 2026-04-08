"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
const AdminSidebarItems = dynamic(() => import("./AdminSidebarItems"), {
  ssr: false,
});
const UserSidebarItems = dynamic(() => import("./UserSidebarItems"), {
  ssr: false,
});

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { unreadCount } = useSocket();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = user?.role || "USER";
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

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
                {isAdmin ? "Admin Panel" : "User Portal"}
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
        {isAdmin ? (
          <AdminSidebarItems
            pathname={pathname}
            unreadCount={unreadCount}
            isCollapsed={isCollapsed}
          />
        ) : (
          <UserSidebarItems
            pathname={pathname}
            unreadCount={unreadCount}
            isCollapsed={isCollapsed}
          />
        )}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
