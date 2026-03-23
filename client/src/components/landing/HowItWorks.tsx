import { Wallet, Sparkles, ShoppingCart } from 'lucide-react';
import type { ElementType } from 'react';

interface Step {
  number: number;
  icon: ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Wallet,
    title: 'Set Your Budget',
    description:
      'Enter your weekly food budget in pesos and family size',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'Generate Meal Plan',
    description:
      'Our AI creates a 7-day Filipino meal plan within your budget',
  },
  {
    number: 3,
    icon: ShoppingCart,
    title: 'Shop & Cook',
    description:
      'Get your organized grocery list and start cooking!',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-700">
          Paano Gamitin?
        </h2>
        <p className="mt-2 text-gray-500">3 easy steps</p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl bg-white p-6 shadow-md"
            >
              {/* Gold numbered badge */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-sm font-bold text-forest-900 shadow">
                {step.number}
              </span>

              {/* Icon circle */}
              <div className="mx-auto mt-2 flex h-16 w-16 items-center justify-center rounded-full bg-forest-100">
                <step.icon className="h-7 w-7 text-forest-600" />
              </div>

              <h3 className="mt-4 font-heading text-lg font-bold text-forest-700">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
