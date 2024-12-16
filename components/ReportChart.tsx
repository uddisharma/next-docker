"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ReportChartProps {
  data: Array<{
    id: bigint;
    createdAt: Date;
  }>;
}

export function ReportChart({ data }: ReportChartProps) {
  const chartData = data
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .reduce(
      (acc, report) => {
        const month = report.createdAt.toLocaleString("default", {
          month: "short",
        });
        const existingEntry = acc.find((entry) => entry.month === month);
        if (existingEntry) {
          existingEntry.reports += 1;
        } else {
          acc.push({ month, reports: 1 });
        }
        return acc;
      },
      [] as Array<{ month: string; reports: number }>,
    );

  return (
    <ChartContainer
      config={{
        reports: {
          label: "Reports",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="reports" fill="var(--color-reports)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
