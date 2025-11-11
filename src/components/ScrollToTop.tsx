import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * Scrolls to top on route changes. Respects user's reduced-motion preference.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // UseLayoutEffect runs before the browser paints — this ensures the new
  // route is rendered at the top immediately (no visible scroll animation)
  // which prevents the page from visibly animating from the previous scroll
  // position. We use `auto` behavior to jump instantly and avoid lag.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // immediate jump to top — keeps navigation feeling snappy
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
