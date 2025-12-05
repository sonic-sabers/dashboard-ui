import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Favorite Page Interface
 * Represents a favorited page for quick navigation
 */
export interface FavoritePage {
  id: string;
  name: string;
  path: string;
  icon?: string;
  addedAt: number;
}

/**
 * Favorites State Interface
 * Manages user's favorite pages (max 2 pages)
 */
export interface FavoritesState {
  items: FavoritePage[];
  maxFavorites: number;
}

const initialState: FavoritesState = {
  items: [
    {
      id: "overview",
      name: "Overview",
      path: "/dashboard",
      icon: "LayoutDashboard",
      addedAt: Date.now(),
    },
    {
      id: "projects",
      name: "Projects",
      path: "/dashboard/projects",
      icon: "FolderKanban",
      addedAt: Date.now(),
    },
  ],
  maxFavorites: 2,
};

/**
 * Favorites Slice
 * Handles favorite items management
 * Follows Interface Segregation Principle - focused on favorites only
 */
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Add a favorite page (max 2)
    addFavorite: (
      state,
      action: PayloadAction<Omit<FavoritePage, "addedAt">>
    ) => {
      // Check if already exists
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) return;

      // If at max limit (2), remove the oldest one
      if (state.items.length >= state.maxFavorites) {
        // Remove the oldest favorite (first item)
        state.items.shift();
      }

      const newFavorite: FavoritePage = {
        ...action.payload,
        addedAt: Date.now(),
      };

      state.items.push(newFavorite);
    },

    // Remove a favorite page
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Toggle favorite (add if not exists, remove if exists)
    toggleFavorite: (
      state,
      action: PayloadAction<Omit<FavoritePage, "addedAt">>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        // Remove if exists
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        // Add if doesn't exist
        // If at max limit (2), remove the oldest one
        if (state.items.length >= state.maxFavorites) {
          state.items.shift();
        }

        const newFavorite: FavoritePage = {
          ...action.payload,
          addedAt: Date.now(),
        };
        state.items.push(newFavorite);
      }
    },

    // Swap favorites (swap positions of two favorites)
    swapFavorites: (state) => {
      if (state.items.length === 2) {
        [state.items[0], state.items[1]] = [state.items[1], state.items[0]];
      }
    },

    // Update favorite page
    updateFavorite: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<FavoritePage> }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },

    // Reset to default favorites (Overview and Projects)
    resetToDefaults: (state) => {
      state.items = [
        {
          id: "overview",
          name: "Overview",
          path: "/dashboard",
          icon: "LayoutDashboard",
          addedAt: Date.now(),
        },
        {
          id: "projects",
          name: "Projects",
          path: "/dashboard/projects",
          icon: "FolderKanban",
          addedAt: Date.now(),
        },
      ];
    },

    // Set max favorites limit
    setMaxFavorites: (state, action: PayloadAction<number>) => {
      state.maxFavorites = Math.max(1, Math.min(50, action.payload));
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  swapFavorites,
  updateFavorite,
  resetToDefaults,
  setMaxFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
