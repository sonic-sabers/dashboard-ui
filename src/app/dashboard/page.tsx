"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense } from "react";
import Link from "next/link";
import {
  dashboardMetrics,
  projectionsData,
  revenueByLocation,
  totalSalesData,
  topProducts,
  currentWeekRevenue,
  previousWeekRevenue,
  revenueData,
} from "@/data/dashboardData";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ProjectionsChart from "@/components/features/dashboard/ProjectionsChart";

// Lazy load heavy chart components
const RevenueChart = lazy(
  () => import("@/components/features/dashboard/RevenueChart")
);
const RevenueByLocationComponent = lazy(() =>
  import("@/components/features/dashboard/RevenueByLocation").then((mod) => ({
    default: mod.RevenueByLocation,
  }))
);
const TotalSalesComponent = lazy(() =>
  import("@/components/features/dashboard/TotalSales").then((mod) => ({
    default: mod.TotalSales,
  }))
);

// Chart loading placeholder
const ChartSkeleton = () => (
  <div className="w-full h-full p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-6">
      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
    <div className="h-[240px] bg-gray-100 dark:bg-gray-800 rounded" />
  </div>
);

// Animation variants
const staggerParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function Dashboard() {
  return (
    <motion.div
      className="p-4 space-y-6"
      initial="hidden"
      animate="show"
      variants={staggerParent}
    >
      {/* Page Title */}
      <motion.h1
        className="text-xl font-semibold text-gray-900 dark:text-white"
        variants={fadeInUp}
      >
        eCommerce
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerParent}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={staggerParent}
        >
          {dashboardMetrics.map((metric) => {
            const content = (
              <motion.div
                key={metric.label}
                variants={fadeInUp}
                className={cn(
                  "rounded-2xl min-h-[100px] p-4 lg:p-6 flex flex-col gap-2 overflow-hidden",
                  metric.link &&
                    "cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                )}
                style={{
                  backgroundColor: metric.bgColor || "hsl(var(--secondary))",
                  color: metric.textColor || "hsl(var(--foreground))",
                }}
              >
                <p className="text-[14px] font-semibold leading-5 whitespace-nowrap">
                  {metric.label}
                </p>

                <div className="flex h-full items-center gap-2 justify-between flex-col md:flex-row ">
                  <p className="text-xl sm:text-2xl font-semibold break-words">
                    {metric.value}
                  </p>
                  <p className="text-xs flex items-center gap-1 whitespace-nowrap shrink-0">
                    <span>
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 shrink-0" />
                    ) : (
                      <TrendingDown className="h-4 w-4 shrink-0" />
                    )}
                  </p>
                </div>
              </motion.div>
            );

            return content;
          })}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ProjectionsChart data={projectionsData} />
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        variants={staggerParent}
      >
        {/* Revenue Line Chart */}
        <motion.div
          className="lg:col-span-2 bg-chart-bg dark:bg-gray-800 rounded-2xl "
          variants={fadeInUp}
          style={{ overflow: "hidden" }}
        >
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart
              data={revenueData}
              currentWeekTotal={currentWeekRevenue}
              previousWeekTotal={previousWeekRevenue}
            />
          </Suspense>
        </motion.div>

        {/* Revenue by Location */}
        <motion.div
          className="bg-chart-bg dark:bg-gray-800 rounded-2xl p-6 "
          variants={fadeInUp}
        >
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueByLocationComponent />
          </Suspense>
        </motion.div>
      </motion.div>

      {/* Products and Sales Row */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        variants={staggerParent}
      >
        {/* Top Selling Products Table */}
        <motion.div
          className="lg:col-span-2 bg-chart-bg  dark:bg-gray-800  rounded-2xl p-6 "
          variants={fadeInUp}
        >
          <SectionHeader title="Top Selling Products" className="mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-3 text-xs font-normal text-gray-500/60 dark:text-gray-400/60 border-b border-gray-200 dark:border-gray-700">
                    Name
                  </th>
                  <th className="text-left pb-3 text-xs font-normal text-gray-500/60 dark:text-gray-400/60 border-b border-gray-200 dark:border-gray-700">
                    Price
                  </th>
                  <th className="text-left pb-3 text-xs font-normal text-gray-500/60 dark:text-gray-400/60 border-b border-gray-200 dark:border-gray-700">
                    Quantity
                  </th>
                  <th className="text-left pb-3 text-xs font-normal text-gray-500/60 dark:text-gray-400/60 border-b border-gray-200 dark:border-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="text-sm py-3 text-gray-900 dark:text-white truncate max-w-[150px]">
                      {product.name}
                    </td>
                    <td className="text-sm py-3 text-gray-900 dark:text-white truncate">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="text-sm py-3 text-gray-900 dark:text-white truncate">
                      {product.quantity}
                    </td>
                    <td className="text-sm py-3 text-gray-900 dark:text-white truncate">
                      $
                      {product.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Total Sales Donut */}
        <motion.div
          className="bg-chart-bg  dark:bg-gray-800  rounded-2xl p-6 "
          variants={fadeInUp}
        >
          <Suspense fallback={<ChartSkeleton />}>
            <TotalSalesComponent data={totalSalesData} />
          </Suspense>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
