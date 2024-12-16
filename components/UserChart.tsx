"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface UserChartProps {
  data: Array<{
    id: bigint;
    createdAt: Date;
  }>;
}

export function UserChart({ data }: UserChartProps) {
  const chartData = data
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .reduce(
      (acc, user) => {
        const date = user.createdAt.toISOString().split("T")[0];
        const existingEntry = acc.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.users += 1;
        } else {
          acc.push({ date, users: 1 });
        }
        return acc;
      },
      [] as Array<{ date: string; users: number }>,
    );

  return (
    <ChartContainer
      config={{
        users: {
          label: "Users",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="var(--color-users)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
