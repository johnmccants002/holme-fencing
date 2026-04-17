import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { additionalServices, business, primaryServices } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Holme Fencing services including wood fence installation, metal fencing, gates, and repair work in Sacramento.",
};

export default function ServicesPage() {
  return (
    <section className="site-container py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
          Our Services
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[var(--color-earth-900)]">
          Fence solutions built for strength, style, and long-term value
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-earth-700)]">
          {business.name} focuses on dependable installation and repairs for residential
          and light commercial projects throughout Sacramento.
        </p>
      </div>

      <div className="mt-10 grid gap-8">
        {primaryServices.map((service, index) => (
          <article
            key={service.id}
            className="grid overflow-hidden rounded-3xl border border-[var(--color-sand-300)] bg-white shadow-[0_12px_40px_rgba(48,34,20,0.08)] md:grid-cols-[0.45fr_0.55fr]"
          >
            <div className="relative min-h-64">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>

            <div className="p-7">
              <h2 className="text-2xl font-bold text-[var(--color-earth-900)]">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-earth-700)]">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-[var(--color-earth-800)]">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-sage-500)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-3xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-7">
        <h2 className="text-2xl font-bold text-[var(--color-earth-900)]">Additional Support</h2>
        <p className="mt-2 text-sm text-[var(--color-earth-700)]">
          Alongside full installation projects, we also handle practical upgrades and repair
          work.
        </p>

        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {additionalServices.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[var(--color-sand-300)] bg-white px-4 py-3 text-sm text-[var(--color-earth-800)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <a
          href={business.phoneHref}
          className="rounded-full bg-[var(--color-sage-700)] px-6 py-3 text-sm font-semibold text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)]"
        >
          Call {business.phoneDisplay}
        </a>
        <Link
          href="/contact"
          className="rounded-full border border-[var(--color-earth-600)] px-6 py-3 text-sm font-semibold text-[var(--color-earth-800)] transition hover:bg-[var(--color-sand-200)]"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
