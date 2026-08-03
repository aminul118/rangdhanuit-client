"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  Search,
  ChevronDown,
  Settings,
  User as UserIcon,
  LogOut,
  X,
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
import { Input } from "@/components/ui/input";
import { m as m, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarItem } from "../Sidebar/SidebarMenus";
import { NotificationDropdown } from "./NotificationDropdown";
import { useTableTransition } from "@/context/TableTransitionContext";
import { POP_IN, POP_IN_TRANSITION } from "@/constants/animations";
import useSearchParamsValues from "@/hooks/useSearchParamsValues";
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

const placeholderMap: Record<string, string> = {
  "/admin/users": "Search users by name or email...",
  "/admin/blogs": "Search blogs by title...",
  "/admin/services": "Search services by title...",
  "/admin/partners": "Search partners by name...",
  "/admin/portfolios": "Search portfolios by title...",
  "/admin/quotations": "Search quotations...",
  "/admin/invoices": "Search invoices...",
};

const getPlaceholder = (pathname: string) => {
  for (const [path, placeholder] of Object.entries(placeholderMap)) {
    if (pathname.startsWith(path)) return placeholder;
  }
  return null;
};

const pagesWithSearch = Object.keys(placeholderMap);

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<SidebarItem[]>([]);

  const { values, setParams } = useSearchParamsValues("searchTerm");
  const searchQuery = values.searchTerm || "";
  const [query, setQuery] = useState(searchQuery);
  const { startTransitionWithText } = useTableTransition();

  const showSearch = pagesWithSearch.some((p) => pathname.startsWith(p));
  const searchPlaceholder = getPlaceholder(pathname);

  const updateSearch = useCallback(
    (value: string) => {
      startTransitionWithText("Searching...", () => {
        setParams({ searchTerm: value || null, page: 1 });
      });
    },
    [setParams, startTransitionWithText],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query !== searchQuery) {
        updateSearch(query);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchQuery, updateSearch]);

  const handleClear = () => {
    setQuery("");
    updateSearch("");
  };

  // Dynamic menu loading for search
  useEffect(() => {
    if (open) {
      const loadMenus = async () => {
        if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
          const { adminMenu } = await import("../Sidebar/adminMenu");
          setMenuItems(adminMenu);
        } else {
          const { userMenu } = await import("../Sidebar/userMenu");
          setMenuItems(userMenu);
        }
      };
      loadMenus();
    }
  }, [open, user?.role]);

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

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="h-20 border-b border-border/50 bg-background/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-6 flex-1 relative">
        {showSearch && searchPlaceholder ? (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md w-full"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full bg-muted/10 border border-border/50 hover:border-border focus:border-indigo-500/50 rounded-2xl pl-12 pr-10 py-2.5 text-sm outline-none transition-all duration-300 backdrop-blur-sm h-11"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <AnimatePresence>
              {query && (
                <m.button
                  variants={POP_IN}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={POP_IN_TRANSITION}
                  onClick={handleClear}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                    <X size={16} strokeWidth={3} />
                  </div>
                </m.button>
              )}
            </AnimatePresence>
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md w-full hidden md:block"
          >
            <Button
              variant="outline"
              className="relative h-11 w-full justify-start rounded-2xl bg-muted/10 border-border/50 text-sm text-muted-foreground hover:bg-accent hover:border-border transition-all duration-300 px-4 group"
              onClick={() => setOpen(true)}
            >
              <Search className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              <span>Search menu items or actions...</span>
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border border-border/50 bg-muted/20 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
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
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon size={18} />
                      </div>
                      <span className="text-sm font-semibold">
                        {item.label}
                      </span>
                      <CommandShortcut className="text-[10px] text-muted-foreground ml-auto uppercase opacity-50">
                        {item.href.split("/").pop() || "home"}
                      </CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator className="bg-border/50" />

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
          </m.div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <m.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                className="pl-1 pr-3 gap-3 h-12 rounded-2xl hover:bg-accent transition-all duration-300 border border-transparent hover:border-border/50"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-border/50 shadow-lg">
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback className="bg-linear-to-br from-primary to-purple-600 text-white text-xs font-bold">
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
            </m.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 p-2 rounded-2xl bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl"
          >
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Account Central
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <Link href="/profile">
              <DropdownMenuItem className="rounded-xl px-3 py-2.5 gap-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors">
                <UserIcon size={18} />
                <span className="font-medium text-sm">View Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile?tab=theme">
              <DropdownMenuItem className="rounded-xl px-3 py-2.5 gap-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors">
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
};

export default AdminHeader;
