"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  Headset,
  FileText,
  RotateCcw,
  User,
  BookOpen,
  Shield,
  Palette,
  LogOut,
} from "lucide-react";

const navigationLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Active Projects", href: "/dashboard/projects", icon: Briefcase },
  { name: "Support Tickets", href: "/dashboard/messages", icon: Headset },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Service Requests", href: "/dashboard/requests", icon: RotateCcw },
  { name: "My Profile", href: "/profile", icon: User },
  { name: "Security", href: "/settings/security", icon: Shield },
  { name: "Appearance", href: "/settings/appearance", icon: Palette },
];

export const UserAccountSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-full flex flex-col bg-card/40 backdrop-blur-3xl border border-border/50 rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
      {/* Profile Section */}
      <div className="p-6 border-b border-border/40 flex items-center gap-4 bg-black/20">
        <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0 overflow-hidden">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name || "User Avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-primary">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-lg text-foreground truncate uppercase tracking-tight">
            {user?.name || "GUEST USER"}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {user?.email || "guest@example.com"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
        {navigationLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname?.startsWith(link.href));

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-inner"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <link.icon
                size={18}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border/40 bg-black/10">
        <Button
          onClick={logout}
          className="w-full rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 transition-all duration-300 h-12 font-bold"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserAccountSidebar;
