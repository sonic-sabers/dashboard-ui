import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded border border-gray-300 dark:border-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#1C1C1C] data-[state=checked]:border-[#1C1C1C] data-[state=checked]:text-white dark:data-[state=checked]:bg-[#C6C7F8] dark:data-[state=checked]:border-[#C6C7F8] dark:data-[state=checked]:text-[#1C1C1C] data-[state=indeterminate]:bg-white data-[state=indeterminate]:border-[#1C1C1C] data-[state=indeterminate]:text-[#1C1C1C] dark:data-[state=indeterminate]:bg-gray-800 dark:data-[state=indeterminate]:border-[#C6C7F8] dark:data-[state=indeterminate]:text-[#C6C7F8]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {props.checked === "indeterminate" ? (
        <Minus className="h-3.5 w-3.5 stroke-[3]" />
      ) : (
        <Check className="h-3.5 w-3.5 stroke-[3]" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
