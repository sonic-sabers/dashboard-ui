"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector } from "@/lib/redux";
import { selectRecentHistory } from "@/lib/redux/selectors/navigationSelectors";
import { selectAllFavorites } from "@/lib/redux/selectors/favoritesSelectors";

interface FavoritesRecentlyTabsProps {
  showRecentlyTab: boolean;
}

export function FavoritesRecentlyTabs({
  showRecentlyTab,
}: FavoritesRecentlyTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"favorites" | "recently">(
    "favorites"
  );
  const [highlightRecently, setHighlightRecently] = useState(false);
  const recentlyTabRef = useRef<HTMLDivElement>(null);

  const favorites = useAppSelector(selectAllFavorites);
  const recentHistory = useAppSelector(selectRecentHistory);
  const hasRecentHistory = recentHistory.length > 0;

  // Auto-switch to Recently tab when new history is added
  useEffect(() => {
    if (showRecentlyTab && hasRecentHistory) {
      setActiveTab("recently");
      setHighlightRecently(true);

      const timer = setTimeout(() => {
        setHighlightRecently(false);
      }, 1000);

      if (recentlyTabRef.current) {
        recentlyTabRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }

      return () => clearTimeout(timer);
    }
  }, [showRecentlyTab, hasRecentHistory]);

  return (
    <motion.div
      ref={recentlyTabRef}
      className="space-y-3 rounded-lg"
      animate={{
        backgroundColor: highlightRecently
          ? "rgba(59, 130, 246, 0.1)"
          : "rgba(0, 0, 0, 0)",
        scale: highlightRecently ? 1.02 : 1,
        padding: highlightRecently ? "12px" : "0px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      layout={false}
    >
      {/* Tab Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => setActiveTab("favorites")}
          className={`text-[14px] font-normal leading-5 transition-all duration-200 ${
            activeTab === "favorites"
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-400 dark:text-gray-500"
          } hover:text-gray-900 dark:hover:text-white`}
        >
          Favorites
        </button>
        {hasRecentHistory && (
          <button
            onClick={() => setActiveTab("recently")}
            className={`text-[14px] font-normal leading-5 transition-all duration-200 ${
              activeTab === "recently"
                ? "text-gray-500 dark:text-gray-400"
                : "text-gray-400 dark:text-gray-500"
            } hover:text-gray-900 dark:hover:text-white`}
          >
            Recently
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "favorites" ? (
        <div className="space-y-3 min-h-5">
          {favorites.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                    scale: 0.95,
                    transition: {
                      duration: 0.15,
                      ease: "easeIn",
                    },
                  }}
                >
                  <FavoriteItem
                    label={favorite.name}
                    path={favorite.path}
                    onClick={() => router.push(favorite.path)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="h-5 text-center">
              <p className="text-[12px] text-gray-500 dark:text-gray-400">
                No favorites yet
              </p>
              <p className="text-[8px] text-gray-400 dark:text-gray-500 mt-1">
                Star pages to add them here
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {recentHistory.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {recentHistory.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                    scale: 0.95,
                    transition: {
                      duration: 0.15,
                      ease: "easeIn",
                    },
                  }}
                >
                  <FavoriteItem
                    label={item.title || item.path}
                    path={item.path}
                    onClick={() => router.push(item.path)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No recent pages
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Visit pages to see them here
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// FavoriteItem Component
function FavoriteItem({
  label,
  path,
  onClick,
}: {
  label: string;
  path?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="
        flex items-center gap-2 text-[14px] leading-5
        text-gray-900 dark:text-white cursor-pointer
        group
      "
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      />
      <span className="font-normal">{label}</span>
    </motion.div>
  );
}
