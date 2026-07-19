"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InwardLogo } from "@/components/icons/InwardLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-warm-cream/90 backdrop-blur-md border-b border-muted-border/50 py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
          aria-label="Inward Home"
        >
          <InwardLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-sans font-medium text-sm transition-colors relative py-1 hover:text-primary-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent rounded-sm ${
                pathname === item.href || (item.href.startsWith("/#") && pathname === "/")
                  ? "text-primary-forest"
                  : "text-muted-text"
              }`}
            >
              {item.name}
              {(pathname === item.href || (item.href.startsWith("/#") && pathname === "/")) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ochre-accent rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary-forest text-warm-cream font-sans font-bold text-sm tracking-wide transition-all hover:bg-dark-green hover:shadow-md hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden p-2 text-primary-forest hover:bg-muted-border/30 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 height-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-[60px] p-6 bg-light-card border-b border-muted-border/60 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`font-sans font-semibold text-lg py-2 transition-colors border-b border-muted-border/20 ${
                pathname === item.href
                  ? "text-primary-forest"
                  : "text-muted-text"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="mt-2 inline-flex items-center justify-center w-full py-3.5 rounded-full bg-ochre-accent text-white font-sans font-bold text-base tracking-wide transition-all hover:bg-ochre-accent/95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-forest"
          >
            Book a Call
          </Link>
        </nav>
      </div>
    </header>
  );
}
