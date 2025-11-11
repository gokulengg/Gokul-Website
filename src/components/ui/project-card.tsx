"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ProjectCardProps {
  title: string;
  image: string;
  category: string;
  description?: string;
  className?: string;
  cardClassName?: string;
  loading?: "eager" | "lazy";
  [key: string]: any;
}

export function ProjectCard({
  title,
  image,
  category,
  description,
  className,
  cardClassName,
  loading = "lazy",
  ...props
}: ProjectCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[150] p-4 overflow-y-auto">
            <motion.div
              layoutId={`project-card-${title}-${id}`}
              ref={cardRef}
              className="w-full max-w-3xl bg-background rounded-3xl shadow-2xl overflow-hidden border border-border my-auto"
              {...props}
            >
              <motion.div 
                layoutId={`project-image-${title}-${id}`}
                className="relative w-full h-[60vh] sm:h-[65vh]"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain bg-muted"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.div>

              <div className="relative p-5 sm:p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <motion.span
                      layoutId={`project-category-${title}-${id}`}
                      className="inline-block px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2"
                    >
                      {category}
                    </motion.span>
                    <motion.h3
                      layoutId={`project-title-${title}-${id}`}
                      className="text-2xl sm:text-3xl font-bold text-foreground"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close"
                    onClick={() => setActive(false)}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors duration-200 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`project-card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "group project-card flex flex-col rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] shadow-soft hover:shadow-xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 cursor-pointer",
          cardClassName
        )}
      >
        <motion.div 
          layoutId={`project-image-${title}-${id}`}
          className="relative overflow-hidden h-56 sm:h-60 md:h-64 lg:h-56 xl:h-60 bg-muted"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
            loading={loading}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div 
            layoutId={`project-category-${title}-${id}`}
            className="absolute top-3 left-3"
          >
            <span className="inline-block px-3 py-1 bg-primary/95 text-primary-foreground text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
              {category}
            </span>
          </motion.div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center p-5 sm:p-6">
          <motion.h3 
            layoutId={`project-title-${title}-${id}`}
            className="text-base sm:text-lg font-bold text-[hsl(var(--card-foreground))] leading-tight text-center group-hover:text-primary transition-colors duration-300"
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>
    </>
  );
}
