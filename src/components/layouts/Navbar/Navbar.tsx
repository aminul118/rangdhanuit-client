"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../ModeToggle";
import dynamic from "next/dynamic";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/assets/Logo";

const NotificationDropdown = dynamic(
  () =>
    import("../Dashboard/Header/NotificationDropdown").then(
      (mod) => mod.NotificationDropdown,
    ),
  { ssr: false },
);
const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });
const NavUser = dynamic(() => import("./NavUser"), { ssr: false });
const PortalButton = dynamic(() => import("./PortalButton"), { ssr: false });

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
          <MobileNav
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            navLinks={navLinks}
            pathname={pathname}
            user={user}
            NotificationDropdown={NotificationDropdown}
            PortalButton={PortalButton}
          />
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
