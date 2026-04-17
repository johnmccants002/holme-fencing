import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { business, galleryProjects } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View project gallery placeholders for Holme Fencing installations in Sacramento, Elk Grove, Roseville, and nearby cities.",
};

export default function GalleryPage() {
  return (
    <section className="site-container py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
          Gallery
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[var(--color-earth-900)]">
          Recent fence styles and project examples
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-earth-700)]">
          Placeholder project visuals below are ready to be replaced with real installation
          photos from {business.name} jobsites.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryProjects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-3xl border border-[var(--color-sand-300)] bg-white shadow-[0_12px_40px_rgba(48,34,20,0.08)]"
          >
            <div className="relative h-52 w-full">
              <Image src={project.image} alt={project.alt} fill className="object-cover" />
            </div>

            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-sage-700)]">
                {project.location}
              </p>
              <h2 className="mt-2 text-lg font-bold text-[var(--color-earth-900)]">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-earth-700)]">Material: {project.material}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-[var(--color-sage-700)] px-6 py-3 text-sm font-semibold text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)]"
        >
          Start Your Project
        </Link>
        <a
          href={business.phoneHref}
          className="rounded-full border border-[var(--color-earth-600)] px-6 py-3 text-sm font-semibold text-[var(--color-earth-800)] transition hover:bg-[var(--color-sand-200)]"
        >
          Call {business.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
