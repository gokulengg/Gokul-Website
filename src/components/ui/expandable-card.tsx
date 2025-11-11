"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  imageFit?: "contain" | "cover";
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  imageFit = "contain",
  ...props
}: ExpandableCardProps) {
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

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 grid place-items-center z-[100] sm:mt-16 before:pointer-events-none",
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-[850px] h-full flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] sm:rounded-t-3xl bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 relative border-l border-r border-b border-gray-200 dark:border-white/15 sm:border-l sm:border-r sm:border-b sm:border-gray-200 dark:sm:border-white/15",
                classNameExpanded,
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[70px] before:z-50 before:bg-gradient-to-t dark:before:from-zinc-950 before:from-zinc-50">
                  {/** allow image fit control: cover (fill) or contain (no crop) */}
                  <img
                    src={src}
                    alt={title}
                    className={`w-full h-80 ${imageFit === "cover" ? "object-cover" : "object-contain"} object-center bg-muted`}
                  />
                </div>
              </motion.div>
              <div className="relative h-full before:fixed before:inset-x-0 before:bottom-0 before:h-[70px] before:z-50 before:bg-gradient-to-t dark:before:from-zinc-950 before:from-zinc-50">
                <div className="flex justify-between items-start p-8 h-auto">
                  <div>
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-zinc-500 dark:text-zinc-400 text-lg"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-semibold text-black dark:text-white text-4xl sm:text-4xl mt-0.5"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none"
                    onClick={() => setActive(false)}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
                <div className="relative px-6 sm:px-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-500 dark:text-zinc-400 text-base pb-10 flex flex-col items-start gap-4 overflow-auto "
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "p-4 md:p-5 flex flex-col justify-between items-center bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 rounded-2xl cursor-pointer border border-gray-200/70 dark:border-zinc-900 h-full min-h-[280px] md:min-h-[320px]",
          className,
        )}
      >
        <div className="flex gap-3 md:gap-4 flex-col w-full">
          <motion.div layoutId={`image-${title}-${id}`}>
            <img
              src={src}
              alt={title}
              className={`w-full h-48 md:h-56 rounded-lg ${imageFit === "cover" ? "object-cover" : "object-contain"} object-center bg-muted`}
            />
          </motion.div>
          <div className="flex justify-between items-start gap-3 md:gap-4 px-1 md:px-0 min-h-0">
            <div className="flex flex-col min-w-0 flex-1">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium truncate"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-black dark:text-white font-semibold text-sm md:text-base line-clamp-2 leading-tight"
              >
                {title}
              </motion.h3>
            </div>
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className={cn(
                "h-8 md:h-9 w-8 md:w-9 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none mt-auto",
                className,
              )}
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
