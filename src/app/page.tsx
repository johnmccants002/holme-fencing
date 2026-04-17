import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import {
  business,
  credentialBadges,
  primaryServices,
  processSteps,
  serviceAreas,
  testimonials,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sacramento fence installation for wood and metal fencing with professional project management from consultation to completion.",
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: "https://www.holmefencing.com/gallery/wood-privacy.jpg",
    telephone: business.phoneDisplay,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.addressLine,
      addressLocality: "Sacramento",
      addressRegion: "CA",
      postalCode: "95814",
      addressCountry: "US",
    },
    areaServed: serviceAreas,
    description:
      "Professional wood and metal fence installation and repair in Sacramento and nearby communities.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="relative overflow-hidden border-b border-[var(--color-sand-300)] bg-[var(--color-sand-100)]">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[var(--color-sage-200)] blur-3xl" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[rgba(123,84,52,0.2)] blur-3xl" />
        </div>

        <div className="site-container relative grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[var(--color-sage-400)] bg-[var(--color-sage-100)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-800)]">
              Sacramento Fence Contractor
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl leading-tight font-bold text-[var(--color-earth-900)] md:text-5xl">
              Durable wood and metal fences built with clean craftsmanship.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-earth-700)]">
              {business.name} designs and installs professional fencing solutions for homes
              and businesses across {business.serviceRegion}.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
          </div>

          <div className="rounded-3xl border border-[var(--color-sand-300)] bg-white p-6 shadow-[0_20px_60px_rgba(50,35,24,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
              Service Area
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-[var(--color-earth-800)]">
              {serviceAreas.map((city) => (
                <li
                  key={city}
                  className="rounded-lg border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] px-3 py-2"
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-[var(--color-earth-700)]">
              Placeholder contact details are live now and can be swapped once final business
              information is confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="site-container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
              Services
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--color-earth-900)]">
              Core installation specialties
            </h2>
          </div>
          <Link
            href="/services"
            className="rounded-full border border-[var(--color-sand-400)] px-5 py-2 text-sm font-semibold text-[var(--color-earth-800)] transition hover:bg-[var(--color-sand-200)]"
          >
            View All Services
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {primaryServices.map((service, index) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-3xl border border-[var(--color-sand-300)] bg-white shadow-[0_12px_40px_rgba(48,34,20,0.08)]"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-earth-900)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-earth-700)]">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-earth-800)]">
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
      </section>

      <section className="border-y border-[var(--color-sand-300)] bg-[var(--color-earth-900)] py-16 text-[var(--color-sand-100)]">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-300)]">
            Process
          </p>
          <h2 className="mt-2 text-3xl font-bold">How we deliver smooth projects</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-[rgba(238,230,216,0.2)] bg-[rgba(248,245,239,0.04)] p-5"
              >
                <h3 className="text-lg font-bold text-[var(--color-sand-50)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-sand-200)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
              Reviews
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--color-earth-900)]">
              Trusted by local property owners
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.name}
                  className="rounded-2xl border border-[var(--color-sand-300)] bg-white p-5"
                >
                  <p className="text-sm leading-relaxed text-[var(--color-earth-700)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-earth-800)]">
                    {testimonial.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
              Credentials
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-[var(--color-earth-800)]">
              {credentialBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-xl border border-[var(--color-sand-300)] bg-white px-3 py-2"
                >
                  {badge}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--color-earth-700)]">
              Replace placeholder credential text with confirmed license and insurance details.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
