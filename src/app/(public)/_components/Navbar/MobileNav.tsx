"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";

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
    <m.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden border-b border-white/10 bg-background/95 backdrop-blur-xl md:hidden"
    >
      <div className="container mx-auto flex flex-col items-center gap-1 p-6">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative w-full rounded-lg py-2.5 text-center text-base font-medium transition-all",
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}

        {/* Mobile Portal / User Section */}
        <div className="mt-4 flex w-full justify-center border-t border-border/40 pt-6">
          {!user ? (
            <Link
              href="/login"
              className="group relative flex w-full max-w-xs items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-[2px] font-bold shadow-lg active:scale-95 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-center w-full rounded-full bg-background py-3">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Portal / Login
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col w-full items-center gap-4">
              <Link
                href="/dashboard"
                className="group relative flex w-full max-w-xs items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-[2px] font-bold shadow-lg active:scale-95 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center w-full rounded-full bg-background py-3">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </div>
              </Link>
              <div className="flex items-center justify-center gap-6 mt-2">
                <ModeToggle />
                <NotificationDropdown />
              </div>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default MobileNav;
