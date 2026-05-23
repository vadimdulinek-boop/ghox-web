import { ArrowRight } from "lucide-react"

interface PricingHeaderProps {
  badge?: string
  title: string
  subtitle: string
}

export function PricingHeader({ badge, title, subtitle }: PricingHeaderProps) {
  return (
    <div className="text-center">
      {badge && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-foreground">
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            Nove
          </span>
          <span>{badge}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
      
      <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h1>
      
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}
