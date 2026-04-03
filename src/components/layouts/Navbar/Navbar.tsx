"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../ModeToggle";
import { useAuth } from "@/providers/AuthProvider";
import NavUser from "./NavUser";
import PortalButton from "./PortalButton";
import { NotificationDropdown } from "../Dashboard/Header/NotificationDropdown";

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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden lg:block">
              Rangdhanu <span className="text-primary font-black">IT</span>
            </span>
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
            {user && <NotificationDropdown />}
            <ModeToggle />
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
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-accent transition-all"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 glass border-b md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium px-4 py-3 rounded-xl transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-foreground/70 hover:bg-accent hover:text-primary font-medium",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="h-px bg-border/50 my-2" />
              {!user && (
                <Link
                  href="/login"
                  className="bg-primary text-white p-4 rounded-xl text-center font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Portal / Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
