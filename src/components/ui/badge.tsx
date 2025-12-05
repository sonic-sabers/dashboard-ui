import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 text-xs font-normal transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
      color: {
        blue: "text-[#8A8CD999] dark:text-[#8A8CD9]",
        green: "text-[#4AA78599] dark:text-[#4AA785]",
        yellow: "text-[#FFC55599] dark:text-[#FFC555]",
        purple: "text-purple-600 dark:text-purple-400",
        red: "text-red-600 dark:text-red-400",
        gray: "text-gray-500 dark:text-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, color, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
}

function BadgeDot({
  color,
  className,
}: {
  color?: "blue" | "green" | "yellow" | "purple" | "red" | "gray";
  className?: string;
}) {
  return (
    <span className={cn("w-1.5 h-1.5 rounded-full bg-current", className)} />
  );
}

export { Badge, BadgeDot, badgeVariants };
