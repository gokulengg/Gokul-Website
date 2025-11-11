import { useEffect, useState } from "react";

const StickyServicesBar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const services = [
    "HEAVY FABRICATION",
    "HEAVY MACHINING & PRECISION ENGINEERING",
    "TOOL ROOM",
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 border-t shadow-2xl ${
      isDark 
        ? "bg-black/30 border-white/10 backdrop-blur-lg" 
        : "bg-white/20 border-white/30 backdrop-blur-3xl backdrop-saturate-200 backdrop-brightness-110"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-0 py-2">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-center gap-0">
              <span className={`font-semibold text-[8px] sm:text-sm text-center px-1 sm:px-3 cursor-pointer transition-colors duration-200 ${
                isDark ? "text-[#FF6F00] hover:text-[#FF6F00]/80" : "text-primary hover:text-primary/80"
              }`}>
                {service}
              </span>
              {index < services.length - 1 && (
                <span className={`px-1 ${isDark ? "text-[#FF6F00]/40" : "text-primary/40"}`}>
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyServicesBar;
