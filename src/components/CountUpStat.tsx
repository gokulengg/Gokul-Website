import { useEffect, useRef, useState } from 'react';

interface CountUpStatProps {
  value: string;
  label: string;
  description: string;
  duration?: number;
}

export const CountUpStat = ({ value, label, description, duration = 1500 }: CountUpStatProps) => {
  const [display, setDisplay] = useState('0');
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            
            // Extract numeric part and suffix (e.g., "35+" -> 35 and "+", "100%" -> 100 and "%")
            const match = value.match(/(\d+)/);
            const target = match ? parseInt(match[0], 10) : 0;
            const suffix = value.replace(/\d+/g, '');
            
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.floor(progress * target);
              setDisplay(current + suffix);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplay(value);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <div
      ref={elementRef}
      className="text-center p-6 rounded-xl border border-muted/20 bg-card/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
        {display}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{label}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
