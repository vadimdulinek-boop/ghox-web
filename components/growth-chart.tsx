"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface GrowthChartProps {
  data: { year: number; balance: number; contributions: number; interest: number }[]
  formatCurrency: (value: number) => string
}

export function GrowthChart({ data, formatCurrency }: GrowthChartProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Investment Growth Over Time</CardTitle>
        <CardDescription>Visualize how your investment grows year by year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="contributionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.08 85)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="oklch(0.55 0.08 85)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.25 0.025 60)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="oklch(0.25 0.025 60)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `Y${value}`}
                className="fill-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
                  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
                  return `$${value}`
                }}
                className="fill-muted-foreground"
                width={60}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-card p-3 shadow-lg">
                        <p className="mb-2 font-semibold text-foreground">Year {label}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">Total Balance:</span>
                            <span className="font-semibold text-foreground">
                              {formatCurrency(data.balance)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">Contributions:</span>
                            <span className="font-medium">{formatCurrency(data.contributions)}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">Interest Earned:</span>
                            <span className="font-medium text-chart-2">
                              {formatCurrency(data.interest)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="contributions"
                stackId="1"
                stroke="oklch(0.55 0.08 85)"
                fill="url(#contributionsGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="interest"
                stackId="1"
                stroke="oklch(0.25 0.025 60)"
                fill="url(#balanceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-sm" style={{ backgroundColor: "oklch(0.55 0.08 85)" }} />
            <span className="text-muted-foreground">Contributions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-sm" style={{ backgroundColor: "oklch(0.25 0.025 60)" }} />
            <span className="text-muted-foreground">Interest Earned</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
