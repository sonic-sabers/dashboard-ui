"use client";

import { LocationData } from "@/types";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface RevenueByLocationProps {
  locations: LocationData[];
}

export function RevenueByLocation({ locations }: RevenueByLocationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700/50"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Revenue by Location
      </h3>

      {/* Simplified world map placeholder */}
      <div className="mb-6 h-32 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <circle cx="20" cy="15" r="2" fill="currentColor" />
            <circle cx="45" cy="20" r="2" fill="currentColor" />
            <circle cx="75" cy="25" r="2" fill="currentColor" />
            <circle cx="85" cy="30" r="2" fill="currentColor" />
          </svg>
        </div>
        <MapPin className="w-8 h-8 text-blue-400 dark:text-blue-300" />
      </div>

      <div className="space-y-3">
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <span className="text-sm text-gray-900 dark:text-white font-medium">
              {location.city}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {location.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
