"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { slidePreset, fadePreset } from "@/utils/gsapPresets";

export default function Drawer({
  side = "left",
  open,
  overlay,
  children,
}: {
  side: "left" | "right";
  open: boolean;
  overlay: boolean;
  children: React.ReactNode;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const prevOverlay = useRef(overlay);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (!drawerRef.current || !contentRef.current) return;
    const width = 280;

    // Reset isFirstRender when switching between desktop/mobile
    if (prevOverlay.current !== overlay) {
      // If drawer is open during overlay change, ensure content stays visible
      if (open) {
        gsap.set(contentRef.current, { opacity: 1 });
      }
      isFirstRender.current = true;
      prevOverlay.current = overlay;
    }

    if (isFirstRender.current) {
      // Set initial state without animation
      if (overlay) {
        gsap.set(drawerRef.current, {
          width: width,
          x: open ? 0 : side === "left" ? -width : width,
        });
      } else {
        gsap.set(drawerRef.current, {
          width: open ? width : 0,
        });
      }
      gsap.set(contentRef.current, {
        opacity: open ? 1 : 0,
      });
      isFirstRender.current = false;
      prevOpen.current = open;
    } else {
      // Animate subsequent changes
      if (overlay) {
        // Mobile: Slide animation
        gsap.to(drawerRef.current, {
          x: open ? 0 : side === "left" ? -width : width,
          ...slidePreset,
        });
      } else {
        // Desktop: Width animation (collapse to 0)
        gsap.to(drawerRef.current, {
          width: open ? width : 0,
          ...slidePreset,
        });
      }

      // Fade content - only if open state actually changed
      if (prevOpen.current !== open) {
        gsap.to(contentRef.current, {
          opacity: open ? 1 : 0,
          ...fadePreset,
        });
        prevOpen.current = open;
      } else if (open) {
        // If drawer is open but overlay changed, ensure content is visible
        gsap.set(contentRef.current, { opacity: 1 });
      }
    }
  }, [open, overlay, side]);

  return (
    <div
      ref={drawerRef}
      className={`h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden ${
        side === "right"
          ? "border-l border-gray-200 dark:border-gray-700"
          : "border-r border-gray-200 dark:border-gray-700"
      } ${overlay ? "fixed top-0 z-50" : "relative"}`}
      style={{
        [side === "right" ? "right" : "left"]: overlay ? 0 : "auto",
      }}
    >
      <div
        ref={contentRef}
        className="h-full px-2"
        style={{ width: 280, minWidth: 280, opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
