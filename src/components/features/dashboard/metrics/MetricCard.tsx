"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-2xl p-6 transition-all duration-200",
        "bg-gray-50 dark:bg-gray-800/50",
        "hover:shadow-lg dark:hover:shadow-gray-900/50",
        "border border-gray-100 dark:border-gray-700/50",
        "cursor-default",
        className
      )}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </p>
        <div className="flex items-end justify-between">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            {value}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
