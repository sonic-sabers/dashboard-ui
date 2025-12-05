"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import {
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
  type ThemeSelection,
  type Resolved,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { buttonVariants } from "@/components/animate-ui/components/buttons/icon";
import { cn } from "@/lib/utils";

const getIcon = (
  effective: ThemeSelection,
  resolved: Resolved,
  modes: ThemeSelection[]
) => {
  const theme = modes.includes("system") ? effective : resolved;
  return theme === "system" ? (
    <Monitor />
  ) : theme === "dark" ? (
    <Moon />
  ) : (
    <Sun />
  );
};

const getNextTheme = (
  effective: ThemeSelection,
  modes: ThemeSelection[]
): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    modes?: ThemeSelection[];
    onImmediateChange?: ThemeTogglerPrimitiveProps["onImmediateChange"];
    direction?: ThemeTogglerPrimitiveProps["direction"];
  };

function ThemeTogglerButton({
  variant = "default",
  size = "default",
  modes = ["light", "dark", "system"],
  direction = "ltr",
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);

  return (
    <ThemeTogglerPrimitive
      theme={theme as ThemeSelection}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <button
          data-slot="theme-toggler-button"
          className={cn(
            buttonVariants({ variant, size, className }),
            "relative overflow-hidden"
          )}
          onClick={(e) => {
            onClick?.(e);
            setIsAnimating(true);
            toggleTheme(getNextTheme(effective, modes));
            setTimeout(() => setIsAnimating(false), 1000);
          }}
          {...props}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={effective}
              initial={{
                scale: 0.5,
                rotate: -180,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.5,
                rotate: 180,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex items-center justify-center"
            >
              {getIcon(effective, resolved, modes)}
            </motion.div>
          </AnimatePresence>

          {/* Ripple effect on click */}
          {isAnimating && (
            <motion.span
              className="absolute inset-0 bg-current opacity-20 rounded-full"
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
