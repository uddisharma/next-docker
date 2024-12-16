"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BlogChartProps {
  data: Array<{
    id: bigint;
    createdAt: Date;
  }>;
}

export function BlogChart({ data }: BlogChartProps) {
  const chartData = data
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .reduce(
      (acc, blog) => {
        const month = blog.createdAt.toLocaleString("default", {
          month: "short",
        });
        const existingEntry = acc.find((entry) => entry.month === month);
        if (existingEntry) {
          existingEntry.blogs += 1;
        } else {
          acc.push({ month, blogs: 1 });
        }
        return acc;
      },
      [] as Array<{ month: string; blogs: number }>,
    );

  return (
    <ChartContainer
      config={{
        blogs: {
          label: "Blogs",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="blogs"
            stroke="var(--color-blogs)"
            fill="var(--color-blogs)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
