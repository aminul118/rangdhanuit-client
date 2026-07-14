"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fade as Hamburger } from "hamburger-react";
import { AnimatePresence, m } from "framer-motion";
import { ModeToggle } from "./ModeToggle";
import dynamic from "next/dynamic";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/assets/Logo";
import { cn } from "@/lib/utils";

const NotificationDropdown = dynamic(
  () =>
    import("@/components/layouts/Dashboard/Header/NotificationDropdown").then(
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
  const [isMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  /* Scroll-based hide/show — disabled on mobile to avoid scroll jank */
  const [hidden, setHidden] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    let rafId: number;
    let prevY = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const shouldHide = currentY > prevY && currentY > 150;
        const shouldScroll = currentY > 50;
        if (shouldHide !== hidden) setHidden(shouldHide);
        if (shouldScroll !== scrolled) setScrolled(shouldScroll);
        prevY = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, hidden, scrolled]);

  /* On mobile, just toggle scrolled state for background blur */
  useEffect(() => {
    if (!isMobile) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-background/80 py-4 shadow-lg backdrop-blur-md"
          : "bg-transparent py-4",
        !isMobile && hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex justify-start relative z-[80]">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2.5 group whitespace-nowrap"
            aria-label="Rangdhanu IT Home"
          >
            <Logo className="w-8 h-8 sm:w-[42px] sm:h-[42px] relative" />
          </Link>
        </div>

        {/* Desktop Nav - Middle */}
        <div className="hidden md:flex items-center bg-background/40 backdrop-blur-xl border border-border/40 p-1.5 rounded-full shadow-lg shadow-black/5">
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
                  <m.div
                    layoutId="active-pill"
                    initial={false}
                    className="absolute inset-0 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-full shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions - Right */}
        <div className="flex justify-end items-center gap-3">
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
            <div className="z-[80] scale-90 sm:scale-100">
              <Hamburger
                toggled={isOpen}
                toggle={setIsOpen}
                size={20}
                duration={0.4}
                distance="sm"
                color={
                  isOpen ? "hsl(var(--foreground))" : "hsl(var(--primary))"
                }
                label="Toggle menu"
                rounded
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
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
    </header>
  );
};

export default Navbar;
