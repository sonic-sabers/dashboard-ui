import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/lib/redux";
import { selectRecentHistory } from "@/lib/redux/selectors/navigationSelectors";
import Image from "next/image";
import ByeWindLogo from "@/assets/ByeWind.svg";
import { FavoritesRecentlyTabs } from "./LeftDrawer/FavoritesRecentlyTabs";

// Lazy load heavy components with dynamic import for better code splitting
const Drawer = dynamic(() => import("./Drawer"), {
  loading: () => <DrawerSkeleton />,
  ssr: true,
});

const DashboardsSection = dynamic(
  () =>
    import("./LeftDrawer/DashboardsSection").then((mod) => ({
      default: mod.DashboardsSection,
    })),
  {
    // loading: () => (
    //   <div className="space-y-1 animate-pulse">
    //     <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
    //     <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
    //   </div>
    // ),
    ssr: true,
  }
);

const PagesSection = dynamic(
  () =>
    import("./LeftDrawer/PagesSection").then((mod) => ({
      default: mod.PagesSection,
    })),
  {
    // loading: () => (
    //   <div className="space-y-1 animate-pulse">
    //     <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
    //     <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
    //   </div>
    // ),
    ssr: true,
  }
);

// Loading fallback component
function DrawerSkeleton() {
  return (
    <div className="h-full md:w-[280px] bg-white dark:bg-gray-900 animate-pulse">
      <div className="p-7 space-y-7">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>

        {/* Favorites/Recently tabs skeleton */}
        <div className="space-y-3 mt-2">
          <div className="flex gap-6">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
          {/* Favorite items */}
          <div className="space-y-3 ml-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>

        {/* Dashboards section skeleton */}
        <div className="space-y-3">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="space-y-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Pages section skeleton */}
        <div className="space-y-3 mt-3">
          <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="space-y-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeftDrawer({
  open,
  overlay,
  showRecentlyTab,
  onClose,
  isMobile,
}: {
  open: boolean;
  overlay: boolean;
  showRecentlyTab?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const router = useRouter();

  // Get recent navigation history (limit to 2 items)
  const recentHistory = useAppSelector((state) =>
    selectRecentHistory(state, 2)
  );
  const hasRecentHistory = recentHistory.length > 0;

  return (
    <Drawer side="left" open={open} overlay={overlay}>
      <div className="h-full overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E3E8EF] dark:bg-[#E3E8EF] flex items-center justify-center overflow-hidden">
              <Image
                src={ByeWindLogo}
                alt="ByeWind"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <h2 className="text-[14px] font-normal leading-5 text-gray-900 dark:text-white">
              ByeWind
            </h2>
          </div>

          {/* Favorites & Recently Tabs */}
          <FavoritesRecentlyTabs showRecentlyTab={showRecentlyTab || false} />

          {/* Dashboards Section - Lazy Loaded */}
          <DashboardsSection onClose={onClose} isMobile={isMobile} />

          {/* Pages Section - Lazy Loaded */}
          <PagesSection onClose={onClose} isMobile={isMobile} />
        </div>
      </div>
    </Drawer>
  );
}
