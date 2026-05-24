"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const COMPOUNDING_OPTIONS = [
  { label: "Annually", value: "1" },
  { label: "Semi-annually", value: "2" },
  { label: "Quarterly", value: "4" },
  { label: "Monthly", value: "12" },
  { label: "Daily", value: "365" },
] as const

const chartConfig = {
  balance: {
    label: "Balance",
    color: "var(--chart-1)",
  },
  contributions: {
    label: "Contributions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

const currencyPrecise = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })

function toNumber(value: string, fallback = 0) {
  const n = Number.parseFloat(value)
  return Number.isFinite(n) ? n : fallback
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState("10000")
  const [rate, setRate] = React.useState("7")
  const [years, setYears] = React.useState("20")
  const [frequency, setFrequency] = React.useState("12")

  const data = React.useMemo(() => {
    const p = Math.max(0, toNumber(principal))
    const r = Math.max(0, toNumber(rate)) / 100
    const t = Math.max(0, Math.min(80, toNumber(years)))
    const n = Math.max(1, toNumber(frequency, 12))

    const points: { year: number; balance: number; contributions: number; interest: number }[] = []
    for (let year = 0; year <= t; year++) {
      const balance = p * Math.pow(1 + r / n, n * year)
      points.push({
        year,
        balance,
        contributions: p,
        interest: balance - p,
      })
    }
    return points
  }, [principal, rate, years, frequency])

  const finalPoint = data[data.length - 1] ?? { balance: 0, contributions: 0, interest: 0, year: 0 }
  const totalReturn =
    finalPoint.contributions > 0 ? (finalPoint.interest / finalPoint.contributions) * 100 : 0

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Investment details</CardTitle>
          <CardDescription>Adjust the inputs to update results in real time.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="principal">Initial investment</FieldLabel>
              <Input
                id="principal"
                type="number"
                inputMode="decimal"
                min={0}
                step={100}
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
              <FieldDescription>The amount you start with.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="rate">Annual interest rate (%)</FieldLabel>
              <Input
                id="rate"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              <FieldDescription>Average yearly return you expect.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="frequency">Compounding frequency</FieldLabel>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency" className="w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {COMPOUNDING_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>How often interest is added to your balance.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="years">Time horizon (years)</FieldLabel>
              <Input
                id="years"
                type="number"
                inputMode="numeric"
                min={1}
                max={80}
                step={1}
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              <FieldDescription>How long the money stays invested.</FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryStat
            label="Final balance"
            value={currency(finalPoint.balance)}
            highlight
          />
          <SummaryStat label="Initial investment" value={currency(finalPoint.contributions)} />
          <SummaryStat
            label="Total interest earned"
            value={currency(finalPoint.interest)}
            sublabel={`+${totalReturn.toFixed(1)}% growth`}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Growth over time</CardTitle>
            <CardDescription>
              Projected balance after {finalPoint.year}{" "}
              {finalPoint.year === 1 ? "year" : "years"} of compounding.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-[16/9] w-full">
              <AreaChart data={data} margin={{ left: 12, right: 12, top: 8 }}>
                <defs>
                  <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-balance)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-balance)" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="fillContributions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-contributions)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-contributions)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `Yr ${v}`}
                  minTickGap={24}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={70}
                  tickFormatter={(v: number) =>
                    v >= 1_000_000
                      ? `$${(v / 1_000_000).toFixed(1)}M`
                      : v >= 1_000
                      ? `$${Math.round(v / 1_000)}k`
                      : `$${v}`
                  }
                />
                <ChartTooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => `Year ${label}`}
                      formatter={(value, name) => (
                        <div className="flex w-full items-center justify-between gap-4">
                          <span className="text-muted-foreground capitalize">{name}</span>
                          <span className="font-mono font-medium tabular-nums">
                            {currencyPrecise(Number(value))}
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stroke="var(--color-contributions)"
                  fill="url(#fillContributions)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--color-balance)"
                  fill="url(#fillBalance)"
                  strokeWidth={2.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>

            <Separator className="my-6" />

            <YearlyBreakdown data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SummaryStat({
  label,
  value,
  sublabel,
  highlight,
}: {
  label: string
  value: string
  sublabel?: string
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? "border-primary/40 bg-accent/40" : undefined}>
      <CardContent className="flex flex-col gap-1 py-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span
          className={
            highlight
              ? "text-3xl font-semibold tabular-nums text-foreground sm:text-[28px]"
              : "text-2xl font-semibold tabular-nums text-foreground"
          }
        >
          {value}
        </span>
        {sublabel ? (
          <span className="text-xs font-medium text-primary">{sublabel}</span>
        ) : null}
      </CardContent>
    </Card>
  )
}

function YearlyBreakdown({
  data,
}: {
  data: { year: number; balance: number; contributions: number; interest: number }[]
}) {
  // Show a compact set of milestones rather than every year for readability.
  const lastYear = data[data.length - 1]?.year ?? 0
  const milestones = React.useMemo(() => {
    if (lastYear === 0) return data
    const targets = new Set<number>([0, lastYear])
    const stride = lastYear <= 10 ? 1 : lastYear <= 25 ? 5 : 10
    for (let y = stride; y < lastYear; y += stride) targets.add(y)
    return data.filter((d) => targets.has(d.year))
  }, [data, lastYear])

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-foreground">Yearly milestones</h3>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-2 font-medium">Year</th>
              <th className="px-4 py-2 text-right font-medium">Principal</th>
              <th className="px-4 py-2 text-right font-medium">Interest</th>
              <th className="px-4 py-2 text-right font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((row, i) => (
              <tr
                key={row.year}
                className={i === milestones.length - 1 ? "bg-accent/30 font-medium" : "border-t"}
              >
                <td className="px-4 py-2.5 tabular-nums">{row.year}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {currency(row.contributions)}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">{currency(row.interest)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{currency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
