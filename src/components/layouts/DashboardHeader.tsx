"use client";

import {
  PanelLeft,
  PanelRight,
  Star,
  Search,
  Bell,
  History,
  Command,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { useFavorite } from "@/hooks/useFavorite";

interface DashboardHeaderProps {
  leftOpen: boolean;
  rightOpen: boolean;
  onLeftToggle: () => void;
  onRightToggle: () => void;
  onNotificationClick: () => void;
  onHistoryClick: () => void;
}

export function DashboardHeader({
  leftOpen,
  rightOpen,
  onLeftToggle,
  onRightToggle,
  onNotificationClick,
  onHistoryClick,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const { isFavorited, toggleFavorite: handleToggleFavorite } = useFavorite();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    const routeNames: Record<string, string> = {
      dashboard: "Default",
      "order-list": "Order List",
      projects: "Projects",
      ecommerce: "eCommerce",
    };

    // Always add "Dashboards" as first breadcrumb
    breadcrumbs.push({
      label: "Dashboards",
      path: "/dashboard",
      key: "dashboards",
    });

    // Add subsequent segments
    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const label =
          routeNames[segment] ||
          segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        const path = "/" + segments.slice(0, i + 1).join("/");
        breadcrumbs.push({
          label,
          path,
          key: path,
        });
      }
    } else {
      // If only /dashboard, add "Default" as second breadcrumb
      breadcrumbs.push({
        label: "Default",
        path: "/dashboard",
        key: "default",
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Handle keyboard shortcut (Cmd+/ or Ctrl+/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between gap-4 px-4 lg:px-6 py-3 lg:py-3.5">
        {/* Left Section: Menu + Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors flex-shrink-0 relative overflow-hidden"
            onClick={onLeftToggle}
            aria-label="Toggle sidebar"
          >
            <motion.div
              animate={{
                rotate: leftOpen ? 0 : 180,
                scale: leftOpen ? 1 : 0.9,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <PanelLeft
                className={`w-5 h-5 transition-colors ${
                  leftOpen
                    ? "text-gray-600 dark:text-gray-500"
                    : "text-gray-700 dark:text-gray-400"
                }`}
              />
            </motion.div>
          </button>
          <IconButton
            variant="ghost"
            size="default"
            onClick={handleToggleFavorite}
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
            className="relative"
          >
            <motion.div
              animate={{
                scale: isFavorited ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <Star
                className={`transition-colors ${
                  isFavorited
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-700 dark:text-gray-400"
                }`}
              />
            </motion.div>
          </IconButton>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-2 text-sm min-w-0">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.key} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-[#1C1C1C]/20 dark:text-white/20 w-[5px] text-center font-normal text-sm leading-5">
                    /
                  </span>
                )}
                <span
                  className={`truncate font-normal text-sm leading-5 ${
                    index === breadcrumbs.length - 1
                      ? "text-[#1C1C1C] dark:text-white"
                      : "text-[#1C1C1C]/40 dark:text-white/40"
                  }`}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div
            className={`hidden md:flex items-center gap-2 rounded-lg px-2 py-1 w-40 h-7 transition-all ${
              isSearchFocused
                ? "bg-white dark:bg-gray-700 ring-2 ring-blue-500 dark:ring-blue-400"
                : "bg-[#1C1C1C]/5 dark:bg-white/5"
            }`}
          >
            <Search
              className={`w-[13px] h-[13px] flex-shrink-0 transition-colors ${
                isSearchFocused
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-[#1C1C1C]/20 dark:text-white/20"
              }`}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="bg-transparent border-none outline-none text-sm font-normal text-gray-700 dark:text-gray-300 placeholder:text-[#1C1C1C]/20 dark:placeholder:text-white/20 flex-1 min-w-0"
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            />
            <div className="hidden lg:flex items-center gap-0">
              <kbd
                className="flex items-center justify-center w-5 h-5 rounded text-[#1C1C1C]/20 dark:text-white/20"
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                <Command className="w-[13px] h-[13px]" />
              </kbd>
              <kbd
                className="flex items-center -ml-2 justify-center w-5 h-5 rounded text-[#1C1C1C]/20 dark:text-white/20"
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                /
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            <ThemeToggle />

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="History"
              onClick={onHistoryClick}
            >
              <History className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors relative"
                aria-label="Notifications"
                onClick={onNotificationClick}
              >
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                {/* Notification badge */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>
            </div>

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors relative overflow-hidden"
              onClick={onRightToggle}
              aria-label="Toggle sidebar"
            >
              <motion.div
                animate={{
                  rotate: rightOpen ? 0 : -180,
                  scale: rightOpen ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <PanelRight
                  className={`w-5 h-5 transition-colors ${
                    rightOpen
                      ? "text-gray-600 dark:text-gray-200"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
