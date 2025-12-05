"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";
import { RevenueData } from "@/types";
import { motion } from "framer-motion";

interface RevenueChartProps {
  data: RevenueData[];
  currentWeek: string;
  previousWeek: string;
}

export function RevenueChart({
  data,
  currentWeek,
  previousWeek,
}: RevenueChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700/50"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Revenue
        </h3>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black dark:bg-white" />
            <span className="text-gray-600 dark:text-gray-400">
              Current Week
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentWeek}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">
              Previous Week
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {previousWeek}
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#e5e7eb"}
            vertical={false}
          />
          <XAxis
            dataKey="week"
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: "8px",
              color: isDark ? "#ffffff" : "#000000",
            }}
          />
          <Line
            type="monotone"
            dataKey="current"
            stroke={isDark ? "#ffffff" : "#000000"}
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="previous"
            stroke={isDark ? "#93c5fd" : "#bfdbfe"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
