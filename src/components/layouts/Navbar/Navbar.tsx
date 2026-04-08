"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../ModeToggle";
import { useAuth } from "@/providers/AuthProvider";
import NavUser from "./NavUser";
import PortalButton from "./PortalButton";
import { NotificationDropdown } from "../Dashboard/Header/NotificationDropdown";
import Logo from "@/assets/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "glass py-4 shadow-sm border-border/50"
          : "bg-transparent py-6 border-transparent",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2.5 group whitespace-nowrap"
            aria-label="Rangdhanu IT Home"
          >
            <Logo className="w-8 h-8 sm:w-[42px] sm:h-[42px] relative" />
          </Link>
        </div>

        {/* Desktop Nav - Middle */}
        <div className="hidden md:flex items-center bg-background/40 backdrop-blur-xl border border-border/40 p-1.5 rounded-full shadow-lg shadow-black/5 mx-4">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-all relative px-5 py-2 rounded-full",
                  isActive
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground hover:bg-accent/50",
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-full shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions - Right */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {user && <NotificationDropdown />}
            <ModeToggle />
            {user ? (
              <NavUser
                user={
                  user as {
                    name: string;
                    email: string;
                    picture?: string;
                    role?: string;
                  }
                }
              />
            ) : (
              <PortalButton />
            )}
          </div>

          {/* Mobile Actions/Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <div className="hidden xs:flex items-center gap-1.5">
              {user && <NotificationDropdown />}
              <ModeToggle />
            </div>
            {user && (
              <NavUser
                user={
                  user as {
                    name: string;
                    email: string;
                    picture?: string;
                    role?: string;
                  }
                }
              />
            )}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-accent transition-all active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-primary" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
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
        )}
      </AnimatePresence>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-55 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
