import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

/**
 * UI Selectors
 * Memoized selectors for efficient state access
 * Follows DRY principle - reusable selector logic
 */

// Base selectors
export const selectUIState = (state: RootState) => state.ui;

// Memoized selectors
export const selectLeftSidebarOpen = createSelector(
  [selectUIState],
  (ui) => ui.leftSidebarOpen
);

export const selectRightSidebarOpen = createSelector(
  [selectUIState],
  (ui) => ui.rightSidebarOpen
);

export const selectLeftSidebarWidth = createSelector(
  [selectUIState],
  (ui) => ui.leftSidebarWidth
);

export const selectRightSidebarWidth = createSelector(
  [selectUIState],
  (ui) => ui.rightSidebarWidth
);

export const selectTheme = createSelector([selectUIState], (ui) => ui.theme);

export const selectCompactMode = createSelector(
  [selectUIState],
  (ui) => ui.compactMode
);

export const selectNotificationsPanelOpen = createSelector(
  [selectUIState],
  (ui) => ui.notificationsPanelOpen
);

// Composite selectors
export const selectSidebarsState = createSelector(
  [selectLeftSidebarOpen, selectRightSidebarOpen],
  (leftOpen, rightOpen) => ({
    leftOpen,
    rightOpen,
    bothOpen: leftOpen && rightOpen,
    noneOpen: !leftOpen && !rightOpen,
  })
);

export const selectSidebarWidths = createSelector(
  [selectLeftSidebarWidth, selectRightSidebarWidth],
  (leftWidth, rightWidth) => ({
    left: leftWidth,
    right: rightWidth,
    total: leftWidth + rightWidth,
  })
);

// Content area width calculation
export const selectContentAreaWidth = createSelector(
  [
    selectLeftSidebarOpen,
    selectRightSidebarOpen,
    selectLeftSidebarWidth,
    selectRightSidebarWidth,
  ],
  (leftOpen, rightOpen, leftWidth, rightWidth) => {
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1920;
    let contentWidth = viewportWidth;

    if (leftOpen) contentWidth -= leftWidth;
    if (rightOpen) contentWidth -= rightWidth;

    return Math.max(320, contentWidth); // Minimum 320px
  }
);
