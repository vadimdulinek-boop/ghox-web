"use client"

import { Check } from "lucide-react"

interface EnterpriseCardProps {
  features: string[]
  onContact?: () => void
}

export function EnterpriseCard({ features, onContact }: EnterpriseCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">Enterprise</h3>
          <p className="mt-2 text-muted-foreground">
            Pro velke spolecnosti, ktere vyzaduji pokrocile zabezpeceni a podporu.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={onContact}
            className="w-full rounded-lg border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary md:w-auto"
          >
            Kontaktujte nas
          </button>
        </div>
      </div>
    </div>
  )
}
