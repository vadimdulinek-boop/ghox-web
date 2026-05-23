import { PricingHeader } from "@/components/pricing-header"
import { PricingCard } from "@/components/pricing-card"
import { EnterpriseCard } from "@/components/enterprise-card"

const pricingPlans = [
  {
    name: "Zakladni",
    price: "0 Kc",
    period: "/mesic",
    description: "Pro jednotlivce, kteri chtejí prozkoumat moznosti.",
    features: [
      "5 projektu mesicne",
      "Zakladni analytika",
      "E-mailova podpora",
      "Pristup k API",
    ],
    buttonText: "Zacit zdarma",
    isPopular: false,
  },
  {
    name: "Premium",
    price: "499 Kc",
    period: "/mesic",
    description: "Pro profesionaly a pokrocile uzivatele.",
    features: [
      "Neomezene projekty",
      "Pokrocila analytika",
      "Prioritni podpora",
      "API s vyssimi limity",
      "Import z externich nastroju",
      "Spoluprace v tymu",
    ],
    buttonText: "Upgradovat na Premium",
    isPopular: false,
  },
  {
    name: "Tym",
    price: "799 Kc",
    period: "/uzivatel/mesic",
    description: "Pro rychle rostouci tymy a spolupraci.",
    features: [
      "Vse z Premium",
      "Centralizovana sprava uzivatelu",
      "Sdileni projektu v tymu",
      "Pokrocila prava a role",
      "SSO prihlaseni",
      "Dedicovany account manager",
    ],
    buttonText: "Zacit s tymovym planem",
    isPopular: true,
  },
]

const enterpriseFeatures = [
  "SAML SSO",
  "Dedicovana podpora 24/7",
  "SLA garance",
  "On-premise instalace",
  "Vlastni integrace",
  "Skoleni pro tym",
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <PricingHeader
          badge="Predstavujeme nove cenove plany"
          title="Plany a cenik"
          subtitle="Zacnete ihned zdarma. Upgradujte pro vice funkci, vyssi limity a tymovou spolupraci."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              isPopular={plan.isPopular}
            />
          ))}
        </div>

        <div className="mt-12">
          <EnterpriseCard features={enterpriseFeatures} />
        </div>
      </div>
    </main>
  )
}
