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
  const [isInitialized, setIsInitialized] = useState(false);

  // Initial mobile check and close drawers on mobile
  useEffect(() => {
    const mobile = window.innerWidth < 1024; // Changed to 1024px for tablet support
    setIsMobile(mobile);
    setIsInitialized(true);

    // Close drawers on initial mobile load
    if (mobile) {
      if (leftOpen) setLeftOpen(false);
      if (rightOpen) setRightOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Debounced mobile detection for resize events
  useEffect(() => {
    if (!isInitialized) return;

    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // Changed to 1024px for tablet support
      const prevMobileState = isMobile;

      // Only update if the state actually changed
      if (mobile !== prevMobileState) {
        setIsMobile(mobile);
      }
    };

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 200); // Increased to 200ms for better stability
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [isInitialized, isMobile]);

  // Close drawers only when transitioning from desktop to mobile
  useEffect(() => {
    if (!isInitialized) return;

    if (isMobile !== prevMobile) {
      if (isMobile) {
        // Transitioning from desktop to mobile - close both drawers
        if (leftOpen) setLeftOpen(false);
        if (rightOpen) setRightOpen(false);
      }
      // When transitioning from mobile to desktop, keep drawers closed
      // User can manually open them
      setPrevMobile(isMobile);
    }
  }, [
    isMobile,
    prevMobile,
    leftOpen,
    rightOpen,
    setLeftOpen,
    setRightOpen,
    isInitialized,
  ]);

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
