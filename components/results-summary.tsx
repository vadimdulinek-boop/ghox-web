"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, PiggyBank, Sparkles } from "lucide-react"

interface ResultsSummaryProps {
  finalBalance: number
  totalContributions: number
  totalInterest: number
  formatCurrency: (value: number) => string
}

export function ResultsSummary({
  finalBalance,
  totalContributions,
  totalInterest,
  formatCurrency,
}: ResultsSummaryProps) {
  const interestPercentage = totalContributions > 0 
    ? ((totalInterest / totalContributions) * 100).toFixed(0) 
    : "0"

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Future Value</p>
              <p className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
                {formatCurrency(finalBalance)}
              </p>
            </div>
            <div className="rounded-lg bg-primary p-2">
              <DollarSign className="size-5 text-primary-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Contributions</p>
              <p className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
                {formatCurrency(totalContributions)}
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-2">
              <PiggyBank className="size-5 text-secondary-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Interest Earned</p>
              <p className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
                {formatCurrency(totalInterest)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                +{interestPercentage}% return on contributions
              </p>
            </div>
            <div className="rounded-lg bg-accent p-2">
              <Sparkles className="size-5 text-accent-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
