"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fade as Hamburger } from "hamburger-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ModeToggle } from "../ModeToggle";
import dynamic from "next/dynamic";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/assets/Logo";
import { cn } from "@/lib/utils";

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

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      if (!hidden) setHidden(true);
    } else {
      if (hidden) setHidden(false);
    }
    if (latest > 50) {
      if (!scrolled) setScrolled(true);
    } else {
      if (scrolled) setScrolled(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-background/80 py-4 shadow-lg backdrop-blur-md"
          : "bg-transparent py-4",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex-1 flex justify-start relative z-[80]">
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
    </motion.header>
  );
};

export default Navbar;
