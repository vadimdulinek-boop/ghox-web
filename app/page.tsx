import { CompoundInterestCalculator } from "@/components/compound-interest-calculator"

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <header className="mb-8 flex flex-col gap-2 sm:mb-12">
          <p className="text-sm font-medium text-primary">Compound Interest</p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            See how your money grows over time
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
            Enter your initial investment, expected return, and how long you plan to invest.
            We&apos;ll show you the projected balance year by year.
          </p>
        </header>
        <CompoundInterestCalculator />
      </div>
    </main>
  )
}
