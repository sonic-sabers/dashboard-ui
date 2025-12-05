"use client";

import { useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/redux";
import { navigateTo } from "@/lib/redux";

/**
 * Navigation Tracker Component
 * Lightweight async tracking - zero performance impact
 */
export function NavigationTracker() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Async, non-blocking tracking
    startTransition(() => {
      // Use pathname as title (simple & fast)
      const title = pathname.split("/").pop() || "Home";

      dispatch(
        navigateTo({
          path: pathname,
          title: title.charAt(0).toUpperCase() + title.slice(1),
        })
      );
    });
  }, [pathname, dispatch]);

  return null;
}
