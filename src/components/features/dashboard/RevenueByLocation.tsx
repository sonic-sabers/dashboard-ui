"use client";

import { motion } from "motion/react";
// @ts-ignore - react-simple-maps doesn't have types for React 19
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface LocationData {
  city: string;
  value: number;
  coordinates: [number, number];
}

const locationData: LocationData[] = [
  { city: "New York", value: 72, coordinates: [-74.006, 40.7128] },
  { city: "San Francisco", value: 39, coordinates: [-122.4194, 37.7749] },
  { city: "Sydney", value: 25, coordinates: [151.2093, -33.8688] },
  { city: "Singapore", value: 61, coordinates: [103.8198, 1.3521] },
];

export function RevenueByLocation() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Revenue by Location" className="mb-0" />

      {/* World Map */}
      <div className="w-full h-[100px] overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900/50 cursor-grab active:cursor-grabbing -mt-1">
        <ComposableMap
          projectionConfig={{
            scale: 80,
            center: [0, 20],
          }}
          width={400}
          height={200}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup zoom={1.6} center={[0, 20]} minZoom={0.8} maxZoom={3}>
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }: any) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#A8C5DA"
                    stroke="#E5E7EB"
                    strokeWidth={0.5}
                    className="outline-none hover:fill-[#8AB4D5] transition-colors"
                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Location Markers */}
            {locationData.map((location) => (
              <Marker key={location.city} coordinates={location.coordinates}>
                <circle
                  r={4}
                  fill="#1F2937"
                  className="dark:fill-white"
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Location List */}
      <div className="flex flex-col gap-2.5 -mt-1">
        {locationData.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="text-xs font-normal text-gray-900 dark:text-white mb-1">
                {location.city}
              </div>
              <div className="h-[2px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(location.value / 72) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className="h-full bg-[#A8C5DA] dark:bg-blue-500 rounded-full"
                />
              </div>
            </div>
            <div className="ml-4 text-xs font-normal text-gray-900 dark:text-white min-w-[40px] text-right">
              {location.value}K
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
