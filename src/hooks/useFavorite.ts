"use client";

import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { toggleFavorite } from "@/lib/redux/slices/favoritesSlice";
import { selectIsFavorited } from "@/lib/redux/selectors/favoritesSelectors";

interface PageInfo {
  id: string;
  name: string;
  path: string;
}

/**
 * Custom hook for managing page favorites
 * Handles current page detection and favorite toggle functionality
 */
export function useFavorite() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // Get current page info from pathname
  const getCurrentPageInfo = (): PageInfo => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "dashboard";
    const pageName =
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/-/g, " ");

    return {
      id: lastSegment,
      name: pageName === "Dashboard" ? "Default" : pageName,
      path: pathname,
    };
  };

  const currentPage = getCurrentPageInfo();
  const isFavorited = useAppSelector((state) =>
    selectIsFavorited(state, currentPage.id)
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(currentPage));
  };

  return {
    currentPage,
    isFavorited,
    toggleFavorite: handleToggleFavorite,
  };
}
