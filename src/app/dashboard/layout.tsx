"use client";

import { useState } from "react";
import { useDrawer } from "@/hooks/useDrawer";
import { useResponsiveDrawers } from "@/hooks/useResponsiveDrawers";
import LeftDrawer from "@/components/layouts/LeftDrawer";
import RightDrawer from "@/components/layouts/RightDrawer";
import { DashboardHeader } from "@/components/layouts/DashboardHeader";
import { DrawerWrapper } from "@/components/layouts/DrawerWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { leftOpen, rightOpen, setLeftOpen, setRightOpen, leftRef, rightRef } =
    useDrawer();

  const { isMobile } = useResponsiveDrawers({
    leftOpen,
    rightOpen,
    setLeftOpen,
    setRightOpen,
  });

  const [highlightNotifications, setHighlightNotifications] = useState(false);
  const [showRecentlyTab, setShowRecentlyTab] = useState(false);

  const handleNotificationClick = () => {
    if (!rightOpen) {
      setRightOpen(true);
    }
    setHighlightNotifications(true);
    setTimeout(() => setHighlightNotifications(false), 2000);
  };

  const handleHistoryClick = () => {
    if (!leftOpen) {
      setLeftOpen(true);
    }
    setShowRecentlyTab(true);
    setTimeout(() => setShowRecentlyTab(false), 2000);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <DrawerWrapper
        drawerRef={leftRef}
        open={leftOpen}
        isMobile={isMobile}
        onClose={() => setLeftOpen(false)}
        position="left"
      >
        <LeftDrawer
          open={leftOpen}
          overlay={isMobile}
          showRecentlyTab={showRecentlyTab}
          onClose={() => setLeftOpen(false)}
          isMobile={isMobile}
        />
      </DrawerWrapper>

      <main className="flex-1 overflow-y-auto relative z-10 transition-all duration-300 ease-out bg-white dark:bg-gray-900">
        <DashboardHeader
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          onLeftToggle={() => setLeftOpen(!leftOpen)}
          onRightToggle={() => setRightOpen(!rightOpen)}
          onNotificationClick={handleNotificationClick}
          onHistoryClick={handleHistoryClick}
        />

        <div className="p-4 md:p-6">{children}</div>
      </main>

      <DrawerWrapper
        drawerRef={rightRef}
        open={rightOpen}
        isMobile={isMobile}
        onClose={() => setRightOpen(false)}
        position="right"
      >
        <RightDrawer
          open={rightOpen}
          overlay={isMobile}
          highlightNotifications={highlightNotifications}
        />
      </DrawerWrapper>
    </div>
  );
}
