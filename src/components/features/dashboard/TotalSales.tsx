"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Plugin } from "chart.js";
import { useTheme } from "next-themes";
import { SectionHeader } from "@/components/ui/SectionHeader";

const createCurvedDoughnutPlugin = (
  endCircleColor: string
): Plugin<"doughnut"> => ({
  id: "curvedDoughnutPlugin",
  afterDatasetDraw(chart, args) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(args.index);
    if (!meta?.data) return;

    const getCirclePositions = (arc: {
      x: number;
      y: number;
      startAngle: number;
      endAngle: number;
      innerRadius: number;
      outerRadius: number;
    }) => {
      const { x, y, startAngle, endAngle, innerRadius, outerRadius } = arc;
      const midRadius = innerRadius + (outerRadius - innerRadius) * 0.68;
      const capRadius = (outerRadius - innerRadius) / 2;
      const segmentSpan = endAngle - startAngle;
      const minAbsoluteOffset = Math.PI / 3.5;
      const percentageOffset = 0.5;
      const startOffset = Math.max(
        minAbsoluteOffset,
        segmentSpan * percentageOffset
      );
      const endOffset = Math.max(
        minAbsoluteOffset,
        segmentSpan * percentageOffset
      );
      const START = startAngle + startOffset * 0.07;
      const END = endAngle - endOffset * 0.02;

      return {
        startX: x + Math.cos(START) * midRadius,
        startY: y + Math.sin(START) * midRadius,
        endX: x + Math.cos(END) * midRadius,
        endY: y + Math.sin(END) * midRadius,
        capRadius,
      };
    };

    ctx.save();

    meta.data.forEach((arc) => {
      const a = arc as unknown as {
        x: number;
        y: number;
        startAngle: number;
        endAngle: number;
        innerRadius: number;
        outerRadius: number;
      };
      const { endX, endY, capRadius } = getCirclePositions(a);

      ctx.beginPath();
      ctx.fillStyle = endCircleColor;
      ctx.arc(endX, endY, capRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    meta.data.forEach((arc, i) => {
      const a = arc as unknown as {
        x: number;
        y: number;
        startAngle: number;
        endAngle: number;
        innerRadius: number;
        outerRadius: number;
        options: { backgroundColor?: string | string[] };
      };
      const { options } = a;

      const color = Array.isArray(options.backgroundColor)
        ? options.backgroundColor[i]
        : options.backgroundColor;

      if (!color) return;

      const { startX, startY, capRadius } = getCirclePositions(a);

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(startX, startY, capRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  },
});

ChartJS.register(ArcElement, Tooltip, Legend);

interface SalesData {
  channel: string;
  value: number;
  color: string;
  darkColor?: string;
}

interface TotalSalesProps {
  data: SalesData[];
}

export function TotalSales({ data }: TotalSalesProps) {
  const { theme } = useTheme();
  // Gap color should match the card background
  const endCircleColor = theme === "dark" ? "#1F2937" : "#F7F9FB";

  const total = data.reduce((a, b) => a + b.value, 0);

  const chartData = {
    labels: data.map((item) => item.channel),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) =>
          theme === "dark" && item.darkColor ? item.darkColor : item.color
        ),
        borderWidth: 0,
        spacing: 8, // Spacing between segments
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    rotation: 45,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#4A4A4A",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        padding: 6,
        cornerRadius: 6,
        displayColors: false,
        caretSize: 0,
        titleSpacing: 0,
        titleMarginBottom: 0,
        titleFont: {
          size: 0,
        },
        bodyFont: {
          size: 12,
          weight: 600,
        },
        callbacks: {
          label: (context: { parsed: number }) => {
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col">
      <SectionHeader title="Total Sales" className="mb-4" />
      <div className="flex flex-col items-center justify-center relative min-h-[120px]">
        <div className="w-[140px] h-[140px] relative">
          <Doughnut
            data={chartData}
            options={options}
            plugins={[createCurvedDoughnutPlugin(endCircleColor)]}
          />
        </div>
        <div className="mt-6 flex flex-col gap-2.5 w-full">
          {data.map((item) => (
            <div key={item.channel} className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    theme === "dark" && item.darkColor
                      ? item.darkColor
                      : item.color,
                }}
              />
              <span className="text-xs font-normal flex-1 text-gray-900 dark:text-white">
                {item.channel}
              </span>
              <span className="text-xs font-normal text-gray-900 dark:text-white">
                ${item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
