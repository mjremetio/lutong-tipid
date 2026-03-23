import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-700 to-forest-800 text-white">
      {/* Decorative food emoji background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none opacity-[0.06] text-[6rem] leading-[7rem] font-body whitespace-pre-wrap break-all"
      >
        {'🍚🥘🍳🥩🐟🥬🍲🍛🥚🧅🍗🌶️🥕🫘🍆🍚🥘🍳🥩🐟🥬🍲🍛🥚🧅🍗🌶️🥕🫘🍆🍚🥘🍳🥩🐟🥬🍲🍛🥚🧅🍗🌶️🥕🫘🍆🍚🥘🍳🥩🐟🥬🍲🍛🥚🧅🍗🌶️🥕🫘🍆'}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-32 text-center">
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight">
          Masarap na ulam, tipid pa!
        </h1>

        <p className="mt-4 text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          AI-powered weekly meal planning for Filipino families on a budget
        </p>

        <Link
          to="/planner"
          className="mt-8 inline-block rounded-2xl bg-gold-400 px-8 py-4 text-lg md:text-xl font-bold text-forest-900 shadow-lg transition hover:bg-gold-300 hover:shadow-xl active:scale-[0.98]"
        >
          Planuhin ang Ulam Mo 🍳
        </Link>

        <p className="mt-4 text-sm opacity-70">
          Free &bull; No signup required &bull; Powered by AI
        </p>
      </div>
    </section>
  );
}
