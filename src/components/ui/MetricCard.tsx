"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  className,
}: MetricCardProps) {
  const isPositive = trend === "up";
  const changeColor = isPositive
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-200",
        "bg-gray-50 dark:bg-gray-800/50",
        "hover:shadow-md dark:hover:shadow-gray-900/50",
        "border border-gray-100 dark:border-gray-700/50",
        className
      )}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              changeColor
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
