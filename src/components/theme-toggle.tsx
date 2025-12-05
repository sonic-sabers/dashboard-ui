"use client";

import {
  ThemeTogglerButton,
  type ThemeTogglerButtonProps,
} from "@/components/animate-ui/components/buttons/theme-toggler";

interface ThemeToggleProps {
  variant?: ThemeTogglerButtonProps["variant"];
  size?: ThemeTogglerButtonProps["size"];
  direction?: ThemeTogglerButtonProps["direction"];
  includeSystem?: boolean;
}

export function ThemeToggle({
  variant = "ghost",
  size = "default",
  direction = "ltr",
  includeSystem = true,
}: ThemeToggleProps) {
  return (
    <ThemeTogglerButton
      variant={variant}
      size={size}
      direction={direction}
      modes={includeSystem ? ["light", "dark"] : ["light", "dark"]}
    />
  );
}
