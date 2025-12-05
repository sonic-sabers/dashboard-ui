import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Navigation History Item
 * Tracks page visits for recent navigation
 */
export interface NavigationHistoryItem {
  id: string;
  path: string;
  title: string;
  timestamp: number;
  params?: Record<string, string>;
  metadata?: {
    icon?: string;
    category?: string;
  };
}

/**
 * Breadcrumb Item
 * Represents a breadcrumb in the navigation trail
 */
export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
}

/**
 * Navigation State Interface
 * Manages navigation history and current location
 */
export interface NavigationState {
  currentPath: string;
  previousPath: string | null;
  history: NavigationHistoryItem[];
  maxHistorySize: number;
  breadcrumbs: BreadcrumbItem[];
  activeSection: string | null;
}

const initialState: NavigationState = {
  currentPath: "/",
  previousPath: null,
  history: [],
  maxHistorySize: 2, // Store last 3 navigation items
  breadcrumbs: [],
  activeSection: null,
};

/**
 * Navigation Slice
 * Handles navigation state, history, and breadcrumbs
 * Follows Dependency Inversion Principle - depends on abstractions
 */
const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    // Navigate to a new path
    navigateTo: (
      state,
      action: PayloadAction<{
        path: string;
        title: string;
        params?: Record<string, string>;
        metadata?: NavigationHistoryItem["metadata"];
      }>
    ) => {
      const { path, title, params, metadata } = action.payload;

      // Update paths
      state.previousPath = state.currentPath;
      state.currentPath = path;

      // Remove any existing entry with the same path to ensure uniqueness
      state.history = state.history.filter((item) => item.path !== path);

      // Create new history item
      const historyItem: NavigationHistoryItem = {
        id: `${path}-${Date.now()}`,
        path,
        title,
        timestamp: Date.now(),
        params,
        metadata,
      };

      // Add to beginning of history
      state.history.unshift(historyItem);

      // Trim history to max size
      if (state.history.length > state.maxHistorySize) {
        state.history = state.history.slice(0, state.maxHistorySize);
      }
    },

    // Go back to previous path
    goBack: (state) => {
      if (state.previousPath) {
        const temp = state.currentPath;
        state.currentPath = state.previousPath;
        state.previousPath = temp;
      }
    },

    // Clear navigation history
    clearHistory: (state) => {
      state.history = [];
    },

    // Remove specific item from history
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(
        (item) => item.id !== action.payload
      );
    },

    // Clear old history items (older than X days)
    clearOldHistory: (state, action: PayloadAction<number>) => {
      const cutoffTime = Date.now() - action.payload * 24 * 60 * 60 * 1000;
      state.history = state.history.filter(
        (item) => item.timestamp > cutoffTime
      );
    },

    // Set breadcrumbs
    setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.breadcrumbs = action.payload;
    },

    // Add breadcrumb
    addBreadcrumb: (state, action: PayloadAction<BreadcrumbItem>) => {
      state.breadcrumbs.push(action.payload);
    },

    // Remove breadcrumb at index
    removeBreadcrumb: (state, action: PayloadAction<number>) => {
      state.breadcrumbs.splice(action.payload, 1);
    },

    // Clear breadcrumbs
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },

    // Set active section
    setActiveSection: (state, action: PayloadAction<string | null>) => {
      state.activeSection = action.payload;
    },

    // Set max history size
    setMaxHistorySize: (state, action: PayloadAction<number>) => {
      state.maxHistorySize = Math.max(10, Math.min(100, action.payload));

      // Trim if necessary
      if (state.history.length > state.maxHistorySize) {
        state.history = state.history.slice(0, state.maxHistorySize);
      }
    },

    // Reset navigation state
    resetNavigation: () => initialState,
  },
});

export const {
  navigateTo,
  goBack,
  clearHistory,
  removeFromHistory,
  clearOldHistory,
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,
  setActiveSection,
  setMaxHistorySize,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer;
