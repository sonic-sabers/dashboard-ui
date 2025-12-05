import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { FavoritePage } from "../slices/favoritesSlice";

/**
 * Favorites Selectors
 * Memoized selectors for favorites state
 */

// Base selector
export const selectFavoritesState = (state: RootState) => state.favorites;

// Memoized selectors
export const selectAllFavorites = createSelector(
  [selectFavoritesState],
  (favorites) => favorites.items
);

export const selectFavoritesCount = createSelector(
  [selectAllFavorites],
  (items) => items.length
);

export const selectMaxFavorites = createSelector(
  [selectFavoritesState],
  (favorites) => favorites.maxFavorites
);

export const selectCanAddMoreFavorites = createSelector(
  [selectFavoritesCount, selectMaxFavorites],
  (count, max) => count < max
);

// Get first favorite page
export const selectFirstFavorite = createSelector(
  [selectAllFavorites],
  (items: FavoritePage[]): FavoritePage | null => items[0] || null
);

// Get second favorite page
export const selectSecondFavorite = createSelector(
  [selectAllFavorites],
  (items: FavoritePage[]): FavoritePage | null => items[1] || null
);

// Check if item is favorited
export const selectIsFavorited = createSelector(
  [selectAllFavorites, (_state: RootState, id: string) => id],
  (items: FavoritePage[], id: string) =>
    items.some((item: FavoritePage) => item.id === id)
);

// Get favorite by ID
export const selectFavoriteById = createSelector(
  [selectAllFavorites, (_state: RootState, id: string) => id],
  (items: FavoritePage[], id: string) =>
    items.find((item: FavoritePage) => item.id === id)
);

// Get recent favorites (last N items)
export const selectRecentFavorites = createSelector(
  [selectAllFavorites, (_state: RootState, limit: number = 5) => limit],
  (items: FavoritePage[], limit: number) => items.slice(0, limit)
);

// Get favorites sorted by name
export const selectFavoritesSortedByName = createSelector(
  [selectAllFavorites],
  (items: FavoritePage[]) =>
    [...items].sort((a: FavoritePage, b: FavoritePage) =>
      a.name.localeCompare(b.name)
    )
);

// Check if favorites are at max capacity (2 pages)
export const selectFavoritesAtMax = createSelector(
  [selectFavoritesCount, selectMaxFavorites],
  (count, max) => count >= max
);
