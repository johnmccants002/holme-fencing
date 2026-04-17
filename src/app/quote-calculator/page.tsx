import type { Metadata } from "next";

import { FencingQuoteCalculator } from "@/components/FencingQuoteCalculator";

export const metadata: Metadata = {
  title: "Fence Quote Calculator",
  description:
    "Use Holme Fencing's quote calculator to get a realistic ballpark estimate for your Sacramento fence project.",
};

export default function QuoteCalculatorPage() {
  return (
    <section className="site-container py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
          Plan Your Project
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[var(--color-earth-900)] md:text-5xl">
          Fence Quote Calculator
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-earth-700)]">
          Build a realistic budget range based on fence type, height, gates, and site
          complexity. For exact pricing, request a detailed site quote after calculating.
        </p>
      </div>

      <FencingQuoteCalculator />
    </section>
  );
}
