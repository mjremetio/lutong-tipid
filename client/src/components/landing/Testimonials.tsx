interface BudgetRange {
  budget: string;
  label: string;
  description: string;
}

const ranges: BudgetRange[] = [
  {
    budget: '₱1,500/week for 4',
    label: 'Tipid meals',
    description: 'Monggo, sardines, egg dishes, ginisang gulay',
  },
  {
    budget: '₱2,500/week for 4',
    label: 'Balanced meals',
    description: 'Chicken adobo, sinigang, fish dishes',
  },
  {
    budget: '₱4,000/week for 4',
    label: 'Variety meals',
    description: 'Lechon kawali, kare-kare, seafood sinigang',
  },
  {
    budget: '₱6,000+/week for 4',
    label: 'Premium meals',
    description: 'Crispy pata, grilled seafood, special recipes',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream-dark px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-forest-700">
          Budget Ranges That Work
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {ranges.map((r) => (
            <div
              key={r.budget}
              className="rounded-2xl border-l-4 border-gold-400 bg-forest-50 p-6"
            >
              <p className="font-heading text-xl font-bold text-forest-700">
                {r.budget}
              </p>
              <p className="mt-1 text-sm font-semibold text-gold-600">
                {r.label}
              </p>
              <p className="mt-2 text-gray-600">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
