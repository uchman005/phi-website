"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TbChevronDown, TbMenu2, TbX } from "react-icons/tb";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Meet the Team", href: "/team" },
      { label: "Our Legacy", href: "/legacy" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Strategic Goals", href: "/strategic-goals" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    label: "Programs",
    dropdown: [
      { label: "ChakulaBora Digital Network", href: "/programs/chakula-bora" },
      { label: "Kilimo Bunifu Workshop", href: "/programs/kilimo-bunifu" },
      { label: "FEED Africa", href: "/programs/feed-africa" },
      { label: "Jiimarishe Enterprise", href: "/programs/jiimarishe" },
    ],
  },
  { label: "Think Global", href: "/programs/think-global" },
  { label: "Our Hubs", href: "/programs/hubs" },
  {
    label: "Impact",
    dropdown: [
      { label: "Impact Stories", href: "/impact" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.1 } },
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, ease: easeOut },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.18 } },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-line">
      <nav
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Passion of Hope International — home"
        >
          <Image
            src="/images/logos/phi-logo.jpeg"
            alt=""
            width={36}
            height={36}
            className="rounded-xl shrink-0 object-cover"
          />
          <span className="font-sans font-semibold text-sm text-ink leading-tight hidden sm:block">
            Passion of Hope International
            <span className="block font-normal text-xs text-ink-3">
              501(c)(3)
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-sans font-medium text-ink-2 hover:text-ink hover:bg-cream transition-colors"
                >
                  {item.label}
                  <TbChevronDown
                    className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.ul
                      role="menu"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-1 w-48 bg-paper rounded-lg shadow-lg border border-line py-1 z-50"
                    >
                      {item.dropdown.map((sub) => (
                        <li key={sub.href} role="none">
                          <Link
                            href={sub.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-sm font-sans hover:bg-green-ll hover:text-green-dd transition-colors ${
                              pathname === sub.href
                                ? "text-green-d font-semibold"
                                : "text-ink-2"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className={`px-3 py-2 rounded-md text-sm font-sans font-medium transition-colors ${
                    pathname === item.href
                      ? "text-green-d font-semibold bg-green-ll"
                      : "text-ink-2 hover:text-ink hover:bg-cream"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/donate"
            className="px-5 py-2.5 bg-terra text-white rounded-pill text-sm font-sans font-semibold hover:bg-terra-d transition-colors shadow-sm"
          >
            Donate
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink-2 hover:bg-cream transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <TbX className="text-xl" aria-hidden />
          ) : (
            <TbMenu2 className="text-xl" aria-hidden />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: "hidden" }}
            className="lg:hidden border-t border-line bg-paper"
          >
            <ul className="px-4 py-3 flex flex-col gap-0.5" role="list">
              {navItems.map((item) =>
                item.dropdown ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-sans font-medium text-ink-2 hover:bg-cream transition-colors"
                    >
                      {item.label}
                      <TbChevronDown
                        className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18, ease: easeOut }}
                          style={{ overflow: "hidden" }}
                          className="ml-4 mt-0.5 flex flex-col gap-0.5"
                        >
                          {item.dropdown.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className={`block px-3 py-2.5 rounded-lg text-sm font-sans hover:bg-green-ll hover:text-green-dd transition-colors ${
                                  pathname === sub.href
                                    ? "text-green-d font-semibold bg-green-ll"
                                    : "text-ink-2"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-colors ${
                        pathname === item.href
                          ? "text-green-d font-semibold bg-green-ll"
                          : "text-ink-2 hover:bg-cream"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
              <li className="mt-2 pt-2 border-t border-line">
                <Link
                  href="/donate"
                  className="block w-full text-center px-5 py-2.5 bg-terra text-white rounded-pill text-sm font-sans font-semibold hover:bg-terra-d transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
