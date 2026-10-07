import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { PROFILE, RESUME_URL } from "../data/profile";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Involvement", href: "#involvement" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E5E5] bg-[#F8F8F6]/85 backdrop-blur-md transition-colors duration-200 dark:border-white/10 dark:bg-[#111111]/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* LEFT: LOGO */}
        <a
          href="#"
          onClick={handleLinkClick}
          className="group flex items-center gap-3 "
          aria-label={`${PROFILE.name} - Home`}
        >
         
          <span className="hidden text-[14px] font-extrabold tracking-tight text-[#111111] transition-colors dark:text-[#F5F5F5] sm:inline-block">
            {PROFILE.name}
          </span>
        </a>

        {/* CENTER: DESKTOP NAVIGATION */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-[#6B6B6B] transition-colors duration-200 hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT: THEME TOGGLE & RESUME BUTTON */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-transparent text-[#6B6B6B] transition-colors duration-200 hover:border-[#E5E5E5] hover:bg-neutral-200/50 hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-[#F5F5F5]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.75 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.75 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Sun size={17} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.75 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.75 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Moon size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Desktop Resume Button */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-600 dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white sm:inline-flex"
          >
            <span>Resume</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="grid h-9 w-9 place-items-center rounded-lg border border-transparent text-[#111111] transition-colors hover:border-[#E5E5E5] hover:bg-neutral-200/50 dark:text-[#F5F5F5] dark:hover:border-white/10 dark:hover:bg-white/10 md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#E5E5E5] bg-[#F8F8F6] dark:border-white/10 dark:bg-[#111111] md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="py-2.5 text-sm font-semibold text-[#6B6B6B] transition-colors hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-[#E5E5E5] dark:border-white/10">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#111111] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <span>Resume</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}