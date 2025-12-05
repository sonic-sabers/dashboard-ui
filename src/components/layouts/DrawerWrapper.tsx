"use client";

import { ReactNode, RefObject } from "react";

interface DrawerWrapperProps {
  children: ReactNode;
  drawerRef: RefObject<HTMLDivElement | null>;
  open: boolean;
  isMobile: boolean;
  onClose: () => void;
  position: "left" | "right";
}

export function DrawerWrapper({
  children,
  drawerRef,
  open,
  isMobile,
  onClose,
  position,
}: DrawerWrapperProps) {
  return (
    <>
      <div ref={drawerRef}>{children}</div>

      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
          onClick={onClose}
          aria-label={`Close ${position} drawer`}
        />
      )}
    </>
  );
}
