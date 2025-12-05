"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ProjectionData {
  month: string;
  projections: number;
  actuals: number;
}

interface ProjectionsChartProps {
  data: ProjectionData[];
}

export default function ProjectionsChart({ data }: ProjectionsChartProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl p-4 lg:p-6 bg-chart-bg  dark:bg-gray-800">
      <SectionHeader
        className="dark:text-gray-200 "
        title="Projections vs Actuals"
      />
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray=""
            stroke="#D0D5DD"
            vertical={false}
            strokeOpacity={0.5}
          />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "14px", fill: "#9CA3AF" }}
          />
          <YAxis
            width={40}
            ticks={[0, 10, 20, 30]}
            domain={[0, 30]}
            stroke="#9CA3AF"
            strokeOpacity={0}
            style={{ fontSize: "14px", fill: "#9CA3AF" }}
            tickFormatter={(v) => `${v}M`}
            tickLine={false}
            axisLine={false}
          />
          <RechartsTooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E5E5",
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#1C1C1C" }}
            itemStyle={{ color: "#1C1C1C" }}
          />
          <Bar
            dataKey="projections"
            name="Projections"
            stackId="a"
            radius={[0, 0, 0, 0]}
            barSize={24}
            fill="#A8C5DA"
          />
          <Bar
            dataKey="actuals"
            name="Actuals"
            stackId="a"
            radius={[6, 6, 0, 0]}
            barSize={24}
            fill="#C6D7E5"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
