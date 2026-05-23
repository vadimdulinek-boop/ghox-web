"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GrowthChart } from "@/components/growth-chart"
import { ResultsSummary } from "@/components/results-summary"
import { TrendingUp } from "lucide-react"

type CompoundingFrequency = "annually" | "semiannually" | "quarterly" | "monthly" | "daily"

const compoundingOptions: { value: CompoundingFrequency; label: string; periods: number }[] = [
  { value: "annually", label: "Annually", periods: 1 },
  { value: "semiannually", label: "Semi-annually", periods: 2 },
  { value: "quarterly", label: "Quarterly", periods: 4 },
  { value: "monthly", label: "Monthly", periods: 12 },
  { value: "daily", label: "Daily", periods: 365 },
]

export function CompoundCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [annualRate, setAnnualRate] = useState(7)
  const [years, setYears] = useState(20)
  const [compounding, setCompounding] = useState<CompoundingFrequency>("monthly")

  const results = useMemo(() => {
    const n = compoundingOptions.find((c) => c.value === compounding)?.periods || 12
    const r = annualRate / 100
    const t = years

    // Calculate growth data for each year
    const yearlyData: { year: number; balance: number; contributions: number; interest: number }[] = []

    for (let year = 0; year <= t; year++) {
      // Compound interest on principal
      const principalGrowth = principal * Math.pow(1 + r / n, n * year)

      // Future value of contributions (annuity)
      let contributionGrowth = 0
      if (r > 0) {
        const monthlyRate = r / 12
        const totalMonths = year * 12
        contributionGrowth =
          monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      } else {
        contributionGrowth = monthlyContribution * year * 12
      }

      const totalBalance = principalGrowth + contributionGrowth
      const totalContributions = principal + monthlyContribution * 12 * year
      const totalInterest = totalBalance - totalContributions

      yearlyData.push({
        year,
        balance: Math.round(totalBalance),
        contributions: Math.round(totalContributions),
        interest: Math.round(totalInterest),
      })
    }

    const finalData = yearlyData[yearlyData.length - 1]

    return {
      yearlyData,
      finalBalance: finalData.balance,
      totalContributions: finalData.contributions,
      totalInterest: finalData.interest,
    }
  }, [principal, monthlyContribution, annualRate, years, compounding])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <TrendingUp className="size-4" />
            Investment Calculator
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Compound Interest Calculator
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg text-pretty">
            See how your investments can grow over time with the power of compound interest.
            Adjust the parameters below to visualize your wealth-building journey.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-8">
          {/* Input Panel */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Investment Parameters</CardTitle>
              <CardDescription>Configure your investment scenario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Principal Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="principal">Initial Investment</Label>
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(principal)}
                  </span>
                </div>
                <Input
                  id="principal"
                  type="number"
                  min={0}
                  max={1000000}
                  step={1000}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                />
                <Slider
                  value={[principal]}
                  onValueChange={([value]) => setPrincipal(value)}
                  min={0}
                  max={500000}
                  step={1000}
                />
              </div>

              {/* Monthly Contribution */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="contribution">Monthly Contribution</Label>
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(monthlyContribution)}
                  </span>
                </div>
                <Input
                  id="contribution"
                  type="number"
                  min={0}
                  max={50000}
                  step={50}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                />
                <Slider
                  value={[monthlyContribution]}
                  onValueChange={([value]) => setMonthlyContribution(value)}
                  min={0}
                  max={10000}
                  step={50}
                />
              </div>

              {/* Annual Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rate">Annual Interest Rate</Label>
                  <span className="text-sm font-semibold text-foreground">{annualRate}%</span>
                </div>
                <Input
                  id="rate"
                  type="number"
                  min={0}
                  max={30}
                  step={0.1}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
                />
                <Slider
                  value={[annualRate]}
                  onValueChange={([value]) => setAnnualRate(value)}
                  min={0}
                  max={20}
                  step={0.25}
                />
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="years">Investment Period</Label>
                  <span className="text-sm font-semibold text-foreground">
                    {years} {years === 1 ? "year" : "years"}
                  </span>
                </div>
                <Input
                  id="years"
                  type="number"
                  min={1}
                  max={50}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value) || 1)}
                />
                <Slider
                  value={[years]}
                  onValueChange={([value]) => setYears(value)}
                  min={1}
                  max={40}
                  step={1}
                />
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-3">
                <Label>Compounding Frequency</Label>
                <Select value={compounding} onValueChange={(v) => setCompounding(v as CompoundingFrequency)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {compoundingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="flex flex-col gap-6">
            <ResultsSummary
              finalBalance={results.finalBalance}
              totalContributions={results.totalContributions}
              totalInterest={results.totalInterest}
              formatCurrency={formatCurrency}
            />
            <GrowthChart data={results.yearlyData} formatCurrency={formatCurrency} />
          </div>
        </div>
      </div>
    </div>
  )
}
