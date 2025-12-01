import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Bento Grid Container
 * Uses CSS Grid with 12-column system for flexible layouts
 * Responsive: 1 column mobile, 6 columns tablet, 12 columns desktop
 * Best practices: Consistent spacing (gap-4/gap-6), uniform padding
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6 lg:grid-cols-12 lg:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoBoxProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

/**
 * Bento Box Component
 * Implements best practices:
 * - Limit to 3-4 size variations (small, medium, large, wide, tall)
 * - Consistent spacing and padding
 * - Responsive: stacks on mobile, grid on larger screens
 * 
 * Size mappings (12-column desktop grid):
 * - small: 3 cols (1/4 width)
 * - medium: 4 cols (1/3 width)
 * - large: 6 cols (1/2 width)
 * - wide: 8 cols (2/3 width)
 * - tall: 4 cols (1/3 width, but taller content)
 */
export function BentoBox({
  children,
  className,
  size = "medium",
}: BentoBoxProps) {
  const sizeClasses = {
    small: "md:col-span-2 lg:col-span-3",
    medium: "md:col-span-3 lg:col-span-4",
    large: "md:col-span-6 lg:col-span-6",
    wide: "md:col-span-6 lg:col-span-8",
    tall: "md:col-span-3 lg:col-span-4",
  };

  return (
    <div
      className={cn(
        "col-span-1", // Mobile: always full width
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
