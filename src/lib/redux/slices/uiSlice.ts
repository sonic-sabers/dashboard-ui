import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * UI State Interface
 * Manages global UI state following Single Responsibility Principle
 */
export interface UIState {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  leftSidebarWidth: number;
  rightSidebarWidth: number;
  theme: "light" | "dark" | "system";
  compactMode: boolean;
  notificationsPanelOpen: boolean;
}

const initialState: UIState = {
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  leftSidebarWidth: 240,
  rightSidebarWidth: 320,
  theme: "light",
  compactMode: false,
  notificationsPanelOpen: false,
};

/**
 * UI Slice
 * Handles all UI-related state management
 * Follows Open/Closed Principle - open for extension, closed for modification
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Left Sidebar Actions
    toggleLeftSidebar: (state) => {
      state.leftSidebarOpen = !state.leftSidebarOpen;
    },
    setLeftSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.leftSidebarOpen = action.payload;
    },
    setLeftSidebarWidth: (state, action: PayloadAction<number>) => {
      state.leftSidebarWidth = Math.max(200, Math.min(400, action.payload));
    },

    // Right Sidebar Actions
    toggleRightSidebar: (state) => {
      state.rightSidebarOpen = !state.rightSidebarOpen;
    },
    setRightSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.rightSidebarOpen = action.payload;
    },
    setRightSidebarWidth: (state, action: PayloadAction<number>) => {
      state.rightSidebarWidth = Math.max(280, Math.min(480, action.payload));
    },

    // Theme Actions
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload;
    },

    // Compact Mode
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
    },
    setCompactMode: (state, action: PayloadAction<boolean>) => {
      state.compactMode = action.payload;
    },

    // Notifications Panel
    toggleNotificationsPanel: (state) => {
      state.notificationsPanelOpen = !state.notificationsPanelOpen;
    },
    setNotificationsPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.notificationsPanelOpen = action.payload;
    },

    // Reset UI State
    resetUIState: () => initialState,
  },
});

export const {
  toggleLeftSidebar,
  setLeftSidebarOpen,
  setLeftSidebarWidth,
  toggleRightSidebar,
  setRightSidebarOpen,
  setRightSidebarWidth,
  setTheme,
  toggleCompactMode,
  setCompactMode,
  toggleNotificationsPanel,
  setNotificationsPanelOpen,
  resetUIState,
} = uiSlice.actions;

export default uiSlice.reducer;
