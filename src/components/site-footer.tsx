import Image from "next/image";
import Link from "next/link";

import { business, navigation, serviceAreas } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-sand-300)] bg-[var(--color-earth-900)] text-[var(--color-sand-100)]">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/holmefencinglogo.png"
              alt="Holme Fencing logo"
              width={1408}
              height={768}
              className="h-12 w-auto"
            />
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-sand-200)]">
              Professional fence installation and repairs for Sacramento homeowners and
              businesses.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-300)]">
              Quick Links
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-[var(--color-sage-200)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-300)]">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-sand-200)]">
              <li>{business.addressLine}</li>
              <li>{business.cityStateZip}</li>
              <li>{business.hours}</li>
              <li>
                <a href={business.phoneHref} className="hover:text-[var(--color-sage-200)]">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-[var(--color-sage-200)]">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgba(238,230,216,0.2)] pt-6 text-xs text-[var(--color-sand-300)]">
          Serving {serviceAreas.join(", ")} | Placeholder business details ready to replace.
        </div>
      </div>
    </footer>
  );
}
