"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Hook to manage responsive drawer behavior
 * Handles mobile detection, escape key, body scroll lock, and auto-close on resize
 * Uses debouncing for resize events to improve performance
 */
export function useResponsiveDrawers({
  leftOpen,
  rightOpen,
  setLeftOpen,
  setRightOpen,
}: {
  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: (open: boolean) => void;
  setRightOpen: (open: boolean) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [prevMobile, setPrevMobile] = useState(false);

  // Initial mobile check and close drawers on mobile
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Close drawers on initial mobile load
    if (mobile) {
      if (leftOpen) setLeftOpen(false);
      if (rightOpen) setRightOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Debounced mobile detection for resize events
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150); // 150ms debounce
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Close right drawer only when transitioning from desktop to mobile
  useEffect(() => {
    if (isMobile !== prevMobile) {
      if (isMobile && rightOpen) {
        // Transitioning from desktop to mobile with right drawer open
        setRightOpen(false);
      }
      setPrevMobile(isMobile);
    }
  }, [isMobile, prevMobile, rightOpen, setRightOpen]);

  // Handle escape key to close drawers
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (leftOpen) setLeftOpen(false);
        if (rightOpen) setRightOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [leftOpen, rightOpen, setLeftOpen, setRightOpen]);

  // Prevent body scroll on mobile when drawers are open
  useEffect(() => {
    if (isMobile && (leftOpen || rightOpen)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, leftOpen, rightOpen]);

  // Prevent both drawers from being open simultaneously on mobile
  useEffect(() => {
    if (isMobile) {
      if (leftOpen && rightOpen) {
        // If both are open, close the one that was opened first (keep most recent)
        // Since we can't track which was opened last, close left drawer by default
        setLeftOpen(false);
      }
    }
  }, [isMobile, leftOpen, rightOpen, setLeftOpen]);

  return { isMobile };
}
