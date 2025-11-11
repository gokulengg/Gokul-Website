import { useEffect, useState } from "react";

// Logo paths from public folder
const lightLogo = "/images/logo/lightlogo.png";
const darkLogo = "/images/logo/darklogo.png";

/**
 * PageHero: Header section for inner pages that shows logo with white background + border-radius on load.
 * On scroll, the background fades away and logo hides, matching the regular header behavior.
 */
const PageHero = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showHeroBg, setShowHeroBg] = useState(true);

  // Detect theme changes
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDarkNow = root.classList.contains("dark");
      setTheme(isDarkNow ? "dark" : "light");
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Handle scroll to remove background and logo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowHeroBg(false);
      } else {
        setShowHeroBg(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`transition-all duration-300 ease-in-out ${
        showHeroBg
          ? "bg-white dark:bg-foreground/8 rounded-b-3xl shadow-sm py-6 md:py-8"
          : "bg-transparent py-0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-auto">
        {showHeroBg && (
          <img
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Sri Gokul Engineering Works"
            className="h-10 lg:h-12 w-auto transition-all duration-300"
          />
        )}
      </div>
    </section>
  );
};

export default PageHero;
