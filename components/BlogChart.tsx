"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BlogChartProps {
  data: Array<{
    id: bigint;
    createdAt: string; // Assuming createdAt is a string
  }>;
}

export function BlogChart({ data }: BlogChartProps) {
  const chartData = data
    .map((blog) => ({
      ...blog,
      createdAt: new Date(blog.createdAt),
    }))
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
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="blogs"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}