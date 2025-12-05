"use client";

import { memo } from "react";
import { useAppSelector } from "@/lib/redux";
import { selectRecentHistory } from "@/lib/redux";
import Link from "next/link";

interface RecentNavigationProps {
  limit?: number;
}

/**
 * Recent Navigation Component
 * Optimized for performance - memoized & minimal renders
 */
export const RecentNavigation = memo(function RecentNavigation({
  limit = 2,
}: RecentNavigationProps) {
  const recentPages = useAppSelector((state) =>
    selectRecentHistory(state, limit)
  );

  if (recentPages.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        No recent pages
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {recentPages.map((page) => (
        <Link
          key={page.id}
          href={page.path}
          className="block p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 truncate"
        >
          {page.title}
        </Link>
      ))}
    </div>
  );
});
