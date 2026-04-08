"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ModeToggle";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navLinks: { name: string; href: string }[];
  pathname: string;
  user: any;
  NotificationDropdown: any;
  PortalButton: any;
}

const MobileNav = ({
  isOpen,
  setIsOpen,
  navLinks,
  pathname,
  user,
  NotificationDropdown,
  PortalButton,
}: MobileNavProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-x-4 top-24 bottom-auto z-60 bg-background/98 dark:bg-card/98 backdrop-blur-3xl border border-border/60 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] md:hidden overflow-hidden"
    >
      <div className="flex flex-col p-8 gap-4">
        <div className="xs:hidden flex items-center justify-between px-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
            System
          </span>
          <div className="flex items-center gap-4">
            {user && <NotificationDropdown />}
            <ModeToggle />
          </div>
        </div>

        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-xl font-bold px-6 py-4 rounded-2xl transition-all flex items-center justify-between group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-accent/50 hover:text-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              <ChevronRight
                className={cn(
                  "w-5 h-5 opacity-0 -translate-x-2 transition-all duration-300",
                  isActive
                    ? "opacity-40 translate-x-0"
                    : "group-hover:opacity-40 group-hover:translate-x-0",
                )}
              />
            </Link>
          );
        })}
        <div className="h-px bg-border/40 my-2" />
        {!user ? (
          <Link
            href="/login"
            className="bg-primary text-primary-foreground p-5 rounded-2xl text-center font-bold shadow-[0_20px_40px_-10px_hsl(var(--primary)/0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            Portal / Login
            <PortalButton />
          </Link>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="p-5 rounded-2xl border border-border/60 text-center font-bold hover:bg-accent transition-all"
              onClick={() => setIsOpen(false)}
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNav;
