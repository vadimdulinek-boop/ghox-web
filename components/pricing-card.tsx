"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  isPopular?: boolean
  onSelect?: () => void
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  isPopular = false,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border p-6 transition-all duration-300 hover:border-primary/50",
        isPopular
          ? "border-primary bg-card shadow-lg shadow-primary/10"
          : "border-border bg-card"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-4">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Doporuceno
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={cn(
                "mt-0.5 h-5 w-5 flex-shrink-0",
                isPopular ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={cn(
          "w-full rounded-lg py-3 text-sm font-medium transition-all duration-200",
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border bg-transparent text-foreground hover:bg-secondary"
        )}
      >
        {buttonText}
      </button>
    </div>
  )
}
