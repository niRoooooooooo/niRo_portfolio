"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "work",     href: "#projects"     },
  { label: "about",    href: "#about"        },
  { label: "services", href: "#services"     },
  { label: "contact",  href: "#contact"      },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-[rgba(10,10,15,0.85)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm font-medium text-purple hover:text-white transition-colors"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            // niRo.dev
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-mono text-xs text-[var(--text-muted)] hover:text-warm transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => handleNavClick("#contact")}
            >
              hire me
            </Button>
            <button
              className="md:hidden text-[var(--text-muted)] hover:text-warm transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[rgba(10,10,15,0.97)] backdrop-blur-xl border-b border-[var(--border)] px-6 py-8 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-mono text-sm text-[var(--text-muted)] hover:text-warm transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="self-start mt-2"
              onClick={() => handleNavClick("#contact")}
            >
              hire me
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
