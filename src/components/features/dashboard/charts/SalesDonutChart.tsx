"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { SalesData } from "@/types";
import { motion } from "framer-motion";

interface SalesDonutChartProps {
  data: SalesData[];
}

export function SalesDonutChart({ data }: SalesDonutChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700/50"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Total Sales
      </h3>

      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDark ? "#ffffff" : "#000000",
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="w-full mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.channel}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ${item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
