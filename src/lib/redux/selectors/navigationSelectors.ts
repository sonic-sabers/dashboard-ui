import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { NavigationHistoryItem } from "../slices/navigationSlice";

/**
 * Navigation Selectors
 * Memoized selectors for navigation state
 */

// Base selector
export const selectNavigationState = (state: RootState) => state.navigation;

// Memoized selectors
export const selectCurrentPath = createSelector(
  [selectNavigationState],
  (navigation) => navigation.currentPath
);

export const selectPreviousPath = createSelector(
  [selectNavigationState],
  (navigation) => navigation.previousPath
);

export const selectNavigationHistory = createSelector(
  [selectNavigationState],
  (navigation) => navigation.history
);

export const selectBreadcrumbs = createSelector(
  [selectNavigationState],
  (navigation) => navigation.breadcrumbs
);

export const selectActiveSection = createSelector(
  [selectNavigationState],
  (navigation) => navigation.activeSection
);

export const selectMaxHistorySize = createSelector(
  [selectNavigationState],
  (navigation) => navigation.maxHistorySize
);

// Get recent history (last N items)
export const selectRecentHistory = createSelector(
  [selectNavigationHistory, (_state: RootState, limit: number = 10) => limit],
  (history: NavigationHistoryItem[], limit: number) => history.slice(0, limit)
);

// Get history count
export const selectHistoryCount = createSelector(
  [selectNavigationHistory],
  (history) => history.length
);

// Check if can go back
export const selectCanGoBack = createSelector(
  [selectPreviousPath],
  (previousPath) => previousPath !== null
);

// Get history by path
export const selectHistoryByPath = createSelector(
  [selectNavigationHistory, (_state: RootState, path: string) => path],
  (history: NavigationHistoryItem[], path: string) =>
    history.filter((item: NavigationHistoryItem) => item.path === path)
);

// Get unique visited paths
export const selectUniqueVisitedPaths = createSelector(
  [selectNavigationHistory],
  (history: NavigationHistoryItem[]) => {
    const paths = new Set(
      history.map((item: NavigationHistoryItem) => item.path)
    );
    return Array.from(paths);
  }
);

// Get history grouped by date
export const selectHistoryGroupedByDate = createSelector(
  [selectNavigationHistory],
  (history: NavigationHistoryItem[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return {
      today: history.filter(
        (item: NavigationHistoryItem) => item.timestamp >= today.getTime()
      ),
      yesterday: history.filter(
        (item: NavigationHistoryItem) =>
          item.timestamp >= yesterday.getTime() &&
          item.timestamp < today.getTime()
      ),
      older: history.filter(
        (item: NavigationHistoryItem) => item.timestamp < yesterday.getTime()
      ),
    };
  }
);

// Get breadcrumb count
export const selectBreadcrumbCount = createSelector(
  [selectBreadcrumbs],
  (breadcrumbs) => breadcrumbs.length
);

// Get last breadcrumb
export const selectLastBreadcrumb = createSelector(
  [selectBreadcrumbs],
  (breadcrumbs) => breadcrumbs[breadcrumbs.length - 1] || null
);
