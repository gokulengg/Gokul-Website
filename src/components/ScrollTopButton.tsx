import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollTopButton
 * Floating button that appears after the user scrolls a bit.
 * Respects prefers-reduced-motion and provides an accessible label.
 */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setVisible(y > 300);
    };

    // initialize
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window === "undefined") return;
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      // keep in DOM for accessibility but hide visually when not visible
      className={
        "fixed z-50 right-6 bottom-6 p-3 rounded-full shadow-lg bg-primary text-primary-foreground " +
        "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-all duration-200 " +
        (visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none")
      }
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
