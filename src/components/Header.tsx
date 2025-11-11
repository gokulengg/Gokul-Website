import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";

// Logo paths from public folder
const lightLogo = "/images/logo/lightlogo.png";
const darkLogo = "/images/logo/darklogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [hasBg, setHasBg] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Navigation links used in header and mobile menu
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/facilities", label: "Facilities" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  // Compact/mobile mode for viewports below 1130px
  const [isCompact, setIsCompact] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1130 : false
  );

  useEffect(() => {
    let t: any = null;
    const onResize = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        setIsCompact(window.innerWidth < 1130);
      }, 100);
    };

    // initialize
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Measure header height so mobile menu can sit directly below it
  useLayoutEffect(() => {
    const measure = () => {
      const el = headerRef.current as HTMLElement | null;
      // Use the header's bottom coordinate so the mobile menu sits exactly below the header
      // (getBoundingClientRect().bottom is distance from viewport top to header bottom)
      setHeaderHeight(el ? Math.round(el.getBoundingClientRect().bottom) : 0);
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isCompact, hasBg, isHome]);

  // Update a small dynamic stylesheet so the portal overlay & panel can be positioned
  // directly below the header without using inline style props on elements.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "header-mobile-menu-style";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    const css = `
      .mobile-menu-overlay { top: ${headerHeight}px; }
      .mobile-menu-panel { top: ${headerHeight}px; }
    `;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.innerHTML = css;
      document.head.appendChild(styleEl);
    } else {
      styleEl.innerHTML = css;
    }

    return () => {
      // keep stylesheet for subsequent opens; do not remove immediately to avoid flicker
    };
  }, [headerHeight]);

  // Small scroll listener to decide when header should get background
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 20;
      setHasBg(scrolled || location.pathname !== "/");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Choose logo source depending on page, scroll state and current document theme.
  const getLogoSrc = () => {
    const docTheme =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";

    // On the Home hero (before scroll) show theme-appropriate logo
    if (isHome && !hasBg) return docTheme === "dark" ? darkLogo : lightLogo;
    // For other states, if header has no bg (inner pages) keep light logo, otherwise follow theme
    if (!hasBg && location.pathname !== "/") return lightLogo;
    return docTheme === "dark" ? darkLogo : lightLogo;
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
        hasBg
          ? "border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm"
          : "bg-transparent border-0 shadow-none"
      }`}
    >
      <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tablet & Small Desktop Fallback (md to lg) */}
        <div
          className={`${
            isCompact ? "hidden" : "hidden md:flex lg:hidden"
          } items-center justify-between ${
            isHome && !hasBg ? "h-16" : "h-12"
          } transition-all duration-500 ease-in-out px-2 gap-2`}
        >
          {/* Left: Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="hover:bg-transparent flex-shrink-0"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Center: Logo (tablet) */}
          <Link
            to="/"
            className={`flex items-center flex-shrink-0 ${isHome && !hasBg ? 'scale-125' : 'scale-100'} transition-all duration-500 ease-in-out px-2 py-1 rounded-xl`}
          >
            <img
              src={getLogoSrc()}
              alt="Sri Gokul Engineering Works"
              className="h-8 w-auto rounded-md object-contain"
            />
          </Link>

          {/* Right: Theme Toggle & Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <ThemeToggle hasBg={hasBg} />
            <Button
              size="default"
              className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => setQuoteOpen(true)}
              aria-label="Get Quote"
            >
              Get Quote
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div
          className={`${
            isCompact ? "flex" : "flex md:hidden"
          } items-center justify-between ${
            isHome && !hasBg ? "h-20" : "h-16"
          } transition-all duration-500 ease-in-out`}
        >
          {/* Left: Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="hover:bg-transparent"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Center: Logo (mobile) */}
          <Link
            to="/"
            className={`flex items-center absolute left-1/2 ${isHome && !hasBg ? 'top-[50%]' : 'top-1/2'} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out px-2 py-1 rounded-xl ${
              !hasBg && location.pathname !== "/"
                ? "bg-white shadow-sm"
                : "bg-transparent"
            }`}
          >
            <img
              src={getLogoSrc()}
              alt="Sri Gokul Engineering Works"
              className={`${
                isHome && !hasBg
                  ? "h-12 w-auto max-w-[160px] rounded-md transition-all duration-500 ease-in-out object-contain"
                  : "h-10 w-auto rounded-md object-contain transition-all duration-500 ease-in-out"
              } ${isHome && !hasBg ? 'mt-1' : ''}`}
            />
          </Link>

          {/* Right: Theme Toggle */}
          <ThemeToggle hasBg={hasBg} />
        </div>

        {/* Desktop Layout */}
        <div
          className={`${
            isCompact ? "hidden" : "hidden lg:flex"
          } items-center justify-between ${
            isHome && !hasBg ? "h-20" : "h-14"
          } transition-all duration-500 ease-in-out`}
        >
          {/* Left: Logo Container */}
          <div className="flex items-center flex-shrink-0 gap-3">
            {/* Main logo with scroll-dependent white background (hidden on Home) */}
              <Link
                to="/"
                className={`flex items-center transition-all duration-500 ease-in-out px-3 py-2 rounded-xl ${
                  !hasBg && location.pathname !== "/"
                    ? "bg-white shadow-sm"
                    : "bg-transparent"
                } ${isHome && !hasBg ? 'mt-2' : ''}`}
              >
                <img
                    src={getLogoSrc()}
                  alt="Sri Gokul Engineering Works"
                  className={`${
                    isHome && !hasBg
                      ? "h-16 lg:h-20 xl:h-24 w-auto max-w-[280px] transition-all duration-500 ease-in-out object-contain"
                      : "h-10 lg:h-12 xl:h-14 w-auto hover:scale-105 rounded-md object-contain transition-all duration-500 ease-in-out"
                  }`}
                />
              </Link>


          </div>

          {/* Left-aligned Navigation */}
          <div className="flex items-center gap-1 lg:gap-2 ml-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-2 lg:px-3 py-1.5 text-sm lg:text-base font-medium transition-all duration-200 focus:outline-none ${
                  hasBg
                    ? isActive(link.to)
                      ? "text-foreground"
                      : "text-muted-foreground"
                    : isActive(link.to)
                    ? "text-white"
                    : "text-white/80"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 rounded-full transition-colors duration-200 ${
                      hasBg ? "bg-foreground" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Certificate Logos & Actions */}
          <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
            {/* Certificate logos (right side) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <img
                src="/images/logo/ISO.png"
                alt="ISO Certificate"
                className="h-10 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-500 ease-in-out hover:scale-110"
              />
              <img
                src="/images/logo/MCS.png"
                alt="MCS Certificate"
                className="h-10 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-500 ease-in-out hover:scale-110"
              />
              <img
                src="/images/logo/QAC.png"
                alt="QAC Certificate"
                className="h-10 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-500 ease-in-out hover:scale-110"
              />
            </div>
            <ThemeToggle hasBg={hasBg} />
            <Button
              size="default"
              className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => setQuoteOpen(true)}
              aria-label="Get Quote"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu via Portal */}
      {isMenuOpen &&
        createPortal(
          <>
            {/* Click-catcher overlay (transparent): starts below header so header itself isn't blocked */}
            <div
              className="fixed left-0 right-0 bottom-0 md:hidden z-[60] bg-transparent mobile-menu-overlay"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel: limit height and add rounded bottom corners. Positioned directly below measured header */}
            <div
              className="fixed inset-x-0 bg-background border-t border-border md:hidden z-[60] max-h-[80vh] overflow-y-auto rounded-b-2xl mobile-menu-panel"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      isActive(link.to)
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground active:scale-95"
                    }`}
                  >
                    <span
                      className={`w-1 h-6 rounded-full mr-3 transition-all ${
                        isActive(link.to) ? "bg-primary" : "bg-transparent"
                      }`}
                    />
                    {link.label}
                  </Link>
                ))}
                {/* Mobile certificate icons (centered) */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <img
                    src="/images/logo/ISO.png"
                    alt="ISO"
                    className="h-8 w-auto object-contain"
                  />
                  <img
                    src="/images/logo/MCS.png"
                    alt="MCS"
                    className="h-8 w-auto object-contain"
                  />
                  <img
                    src="/images/logo/QAC.png"
                    alt="QAC"
                    className="h-8 w-auto object-contain"
                  />
                </div>

                {/* Mobile Get Quote Button */}
                <div className="pt-4 pb-2">
                  <Button
                    size="default"
                    className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => setQuoteOpen(true), 50);
                    }}
                    aria-label="Get Quote"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}

      {/* Centralized controlled Quote modal (no trigger rendered here) */}
      <QuoteModal open={quoteOpen} onOpenChange={(open) => setQuoteOpen(open)} renderTrigger={false} />
    </header>
  );
};

export default Header;

function ThemeToggle({ hasBg }: { hasBg?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Default to dark mode for all devices
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const moonClass = hasBg
    ? "h-5 w-5 text-muted-foreground"
    : "h-5 w-5 text-white";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle color theme"
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="transition-all duration-200 hover:scale-105 hover:bg-muted/10 rounded-md"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className={moonClass} />
      )}
    </Button>
  );
}
