"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  isMobile?: boolean;
  data: Array<{ week: string; current: number; previous: number }>;
  currentWeekTotal: string;
  previousWeekTotal: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    name: string;
    color: string;
  }>;
  label?: string;
}

// Custom Tooltip Component
function RevenueTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-2xl border border-gray-700 dark:border-gray-600 px-3 py-2.5 min-w-[150px]">
      <div className="text-xs font-semibold mb-2 text-white border-b border-gray-700 dark:border-gray-600 pb-1.5">
        {label}
      </div>
      {payload.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-3 mb-1.5 last:mb-0"
        >
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-300">{entry.name}</span>
          </div>
          <span className="text-xs font-bold text-white">${entry.value}M</span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart({
  isMobile = false,
  data,
  currentWeekTotal,
  previousWeekTotal,
}: RevenueChartProps) {
  const { theme: currentTheme } = useTheme();
  const darkMode = currentTheme === "dark";

  // Transform data for Recharts
  const chartData = useMemo(() => {
    return data.map((point, index) => ({
      name: point.week,
      prevWeek: point.previous,
      currentWeekSolid: index < data.length - 1 ? point.current : null,
      currentWeekDotted: index >= data.length - 2 ? point.current : null,
    }));
  }, [data]);

  // Memoize theme colors for performance
  const theme = useMemo(
    () => ({
      currentWeekColor: darkMode ? "#C6C7F8" : "#1F2937",
      previousWeekColor: "#A8C5DA",
      gridColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      textColor: darkMode ? "#9ca3af" : "#6b7280",
    }),
    [darkMode]
  );

  return (
    <div
      className={`w-full h-full relative bg-transparent rounded-lg overflow-visible ${
        isMobile ? "p-4" : "p-6"
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h3 className="text-sm font-semibold shrink-0 text-gray-900 dark:text-white m-0">
          Revenue
        </h3>

        {/* Partition Line - Only show on desktop */}
        <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700 shrink-0" />

        {/* Legends */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-[#C6C7F8] shrink-0" />
            <span className="text-gray-900 dark:text-white font-normal">
              Current Week <span className="font-bold">{currentWeekTotal}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#A8C5DA] shrink-0" />
            <span className="text-gray-900 dark:text-white font-normal">
              Previous Week{" "}
              <span className="font-bold">{previousWeekTotal}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[200px] sm:h-[240px] lg:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray=""
              stroke={theme.gridColor}
              vertical={false}
              strokeOpacity={0.15}
            />
            <XAxis
              dataKey="name"
              stroke="transparent"
              tick={{ fill: theme.textColor, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              width={45}
              ticks={[0, 10000, 20000, 30000]}
              domain={[0, 30000]}
              stroke="#1C1C1C"
              strokeOpacity={2}
              tick={{ fill: theme.textColor, fontSize: 12, fontWeight: 500 }}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}M`)}
              tickLine={false}
              axisLine={false}
              dx={-8}
              style={{ fontSize: "12px" }}
            />
            <RechartsTooltip
              cursor={{
                stroke: theme.gridColor,
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              content={<RevenueTooltip />}
            />
            <Line
              type="natural"
              dataKey="prevWeek"
              name="Previous Week"
              stroke={theme.previousWeekColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: darkMode ? "#1f2937" : "#ffffff",
                fill: theme.previousWeekColor,
              }}
            />
            <Line
              type="natural"
              dataKey="currentWeekSolid"
              name="Current Week"
              stroke={theme.currentWeekColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: darkMode ? "#1f2937" : "#ffffff",
                fill: theme.currentWeekColor,
              }}
              connectNulls={true}
            />
            <Line
              type="natural"
              dataKey="currentWeekDotted"
              name="Current Week (Projected)"
              stroke={theme.currentWeekColor}
              strokeWidth={2.5}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: darkMode ? "#1f2937" : "#ffffff",
                fill: theme.currentWeekColor,
              }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
