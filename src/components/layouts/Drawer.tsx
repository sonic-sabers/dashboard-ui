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

  useEffect(() => {
    if (!drawerRef.current || !contentRef.current) return;
    const width = 280;

    // Reset isFirstRender when switching between desktop/mobile
    if (prevOverlay.current !== overlay) {
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

      // Fade content
      gsap.to(contentRef.current, {
        opacity: open ? 1 : 0,
        ...fadePreset,
      });
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
        className="opacity-0 h-full px-2"
        style={{ width: 280, minWidth: 280 }}
      >
        {children}
      </div>
    </div>
  );
}
