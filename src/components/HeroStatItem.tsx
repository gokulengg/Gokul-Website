import { useEffect, useRef, useState } from "react";

interface HeroStatItemProps {
  value: string; // e.g. "35+" or "100%"
  label: string;
  duration?: number;
}

const HeroStatItem = ({ value, label, duration = 1500 }: HeroStatItemProps) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !played.current) {
            played.current = true;

            const match = value.match(/(\d+)/);
            const target = match ? parseInt(match[0], 10) : 0;
            const suffix = value.replace(/\d+/g, "");
            const start = performance.now();

            const step = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.floor(progress * target);
              setDisplay(String(current) + suffix);

              if (progress < 1) requestAnimationFrame(step);
              else setDisplay(value);
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-white drop-shadow-lg">{display}</div>
      <div className="text-xs sm:text-sm text-primary/90 dark:text-[#FF6F00]/90 mt-1 font-semibold drop-shadow-md">{label}</div>
    </div>
  );
};

export default HeroStatItem;
