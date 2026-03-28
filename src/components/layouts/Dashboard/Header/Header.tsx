"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  Search,
  ChevronDown,
  Settings,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { adminMenu } from "../Sidebar/adminMenu";
import { userMenu } from "../Sidebar/userMenu";
import Link from "next/link";
import { NotificationDropdown } from "./NotificationDropdown";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Keyboard shortcut Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const menuItems =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
      ? adminMenu
      : userMenu;

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="h-20 border-b border-white/5 bg-background/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-6 flex-1 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-md w-full hidden md:block"
        >
          <Button
            variant="outline"
            className="relative h-11 w-full justify-start rounded-2xl bg-white/5 border-white/5 text-sm text-muted-foreground hover:bg-white/10 hover:border-white/10 transition-all duration-300 px-4 group"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4 group-hover:text-indigo-500 transition-colors" />
            <span>Search menu items or actions...</span>
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search menu items or actions..." />
            <CommandList className="max-h-[80vh] custom-scrollbar">
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Navigation" className="px-2">
                {menuItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => handleNavigate(item.href)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                      <item.icon size={18} />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                    <CommandShortcut className="text-[10px] text-muted-foreground ml-auto uppercase opacity-50">
                      {item.href.split("/").pop() || "home"}
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator className="bg-white/5" />

              <CommandGroup heading="Settings & Account" className="px-2">
                <CommandItem
                  onSelect={() => handleNavigate("/profile")}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <UserIcon size={18} />
                  </div>
                  <span className="text-sm font-semibold">View Profile</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => handleNavigate("/profile?tab=theme")}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <Settings size={18} />
                  </div>
                  <span className="text-sm font-semibold">
                    Account Settings
                  </span>
                </CommandItem>
                <CommandItem
                  onSelect={logout}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-red-500 hover:text-red-500"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <LogOut size={18} />
                  </div>
                  <span className="text-sm font-semibold">Sign Out</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                className="pl-1 pr-3 gap-3 h-12 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-white/10 shadow-lg">
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="hidden md:flex flex-col items-start gap-0">
                  <span className="text-sm font-semibold text-foreground/90">
                    {user?.name || "Admin User"}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    {user?.role || "Administrator"}
                  </span>
                </div>
                <ChevronDown size={14} className="text-muted-foreground ml-1" />
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 p-2 rounded-2xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl"
          >
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Account Central
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <Link href="/profile">
              <DropdownMenuItem className="rounded-xl px-3 py-2.5 gap-3 focus:bg-indigo-500/10 focus:text-indigo-500 cursor-pointer transition-colors">
                <UserIcon size={18} />
                <span className="font-medium text-sm">View Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile?tab=theme">
              <DropdownMenuItem className="rounded-xl px-3 py-2.5 gap-3 focus:bg-indigo-500/10 focus:text-indigo-500 cursor-pointer transition-colors">
                <Settings size={18} />
                <span className="font-medium text-sm">Account Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem
              onClick={logout}
              className="rounded-xl px-3 py-2.5 gap-3 text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium text-sm">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
