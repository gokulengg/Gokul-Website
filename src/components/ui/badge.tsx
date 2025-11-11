import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Use a visible border and softer background in dark mode for better contrast
        default:
          "border border-border bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-primary/20 dark:border-border dark:text-primary-foreground",
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/20 dark:border-border dark:text-secondary-foreground",
        destructive:
          "border border-border bg-destructive text-destructive-foreground hover:bg-destructive/80 dark:bg-destructive/20 dark:border-border dark:text-destructive-foreground",
        outline: "text-foreground bg-transparent border border-border dark:bg-transparent dark:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
