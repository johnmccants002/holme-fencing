import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { business, serviceAreas } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Holme Fencing for fence installation and repair quotes in Sacramento and nearby cities.",
};

export default function ContactPage() {
  return (
    <section className="site-container py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-3xl border border-[var(--color-sand-300)] bg-[var(--color-earth-900)] p-7 text-[var(--color-sand-100)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-300)]">
            Contact Holme Fencing
          </p>
          <h1 className="mt-3 text-3xl font-bold">Get your quote started</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-sand-200)]">
            Share a few project details and we will follow up with the next steps. This v1
            form currently uses mock submission behavior.
          </p>

          <dl className="mt-7 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-[var(--color-sage-300)]">Phone</dt>
              <dd className="mt-1">
                <a href={business.phoneHref} className="hover:text-[var(--color-sage-200)]">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-sage-300)]">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${business.email}`} className="hover:text-[var(--color-sage-200)]">
                  {business.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-sage-300)]">Office</dt>
              <dd className="mt-1">
                {business.addressLine}
                <br />
                {business.cityStateZip}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-sage-300)]">Hours</dt>
              <dd className="mt-1">{business.hours}</dd>
            </div>
          </dl>

          <div className="mt-7 rounded-2xl border border-[rgba(238,230,216,0.2)] bg-[rgba(248,245,239,0.04)] p-4 text-xs leading-relaxed text-[var(--color-sand-200)]">
            Service area: {serviceAreas.join(", ")}.
          </div>
        </aside>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
