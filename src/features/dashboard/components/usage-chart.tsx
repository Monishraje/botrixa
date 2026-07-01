"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardCard } from "./dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
  { name: "Mon", total: 120 },
  { name: "Tue", total: 250 },
  { name: "Wed", total: 180 },
  { name: "Thu", total: 420 },
  { name: "Fri", total: 360 },
  { name: "Sat", total: 510 },
  { name: "Sun", total: 640 },
];

export function UsageChart() {
  return (
    <DashboardCard className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
        <CardDescription>API calls and generations over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorTotal)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
