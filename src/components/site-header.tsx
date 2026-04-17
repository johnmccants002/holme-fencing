"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { business, navigation } from "@/data/site";

const navItemClass =
  "rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition hover:bg-[var(--color-sage-100)]";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-sand-300)] bg-[rgba(248,245,239,0.95)] backdrop-blur-sm">
      <div className="site-container">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/holmefencinglogo.png"
              alt="Holme Fencing logo"
              width={1408}
              height={768}
              priority
              className="h-12 w-auto md:h-14"
            />
            <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
              Sacramento, California
            </p>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navItemClass} ${
                    isActive
                      ? "bg-[var(--color-sage-200)] text-[var(--color-earth-900)]"
                      : "text-[var(--color-earth-800)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.phoneHref}
              className="rounded-full bg-[var(--color-sage-700)] px-5 py-2 text-sm font-semibold text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)]"
            >
              Call {business.phoneDisplay}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="rounded-full border border-[var(--color-sand-400)] px-4 py-2 text-sm font-semibold text-[var(--color-earth-900)] lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-nav"
            className="mb-4 rounded-2xl border border-[var(--color-sand-300)] bg-white p-4 lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${navItemClass} ${
                      isActive
                        ? "bg-[var(--color-sage-200)] text-[var(--color-earth-900)]"
                        : "text-[var(--color-earth-800)]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={business.phoneHref}
              className="mt-4 block rounded-full bg-[var(--color-sage-700)] px-5 py-2 text-center text-sm font-semibold text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)]"
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
