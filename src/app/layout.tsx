import type { Metadata } from "next";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { business } from "@/data/site";

const siteUrl = "https://www.holmefencing.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Sacramento Fence Installation`,
    template: `%s | ${business.name}`,
  },
  description:
    "Holme Fencing provides professional wood and metal fence installation in Sacramento and nearby areas.",
  openGraph: {
    title: `${business.name} | Sacramento Fence Installation`,
    description:
      "Professional fence installation and repair for Sacramento homeowners and businesses.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: business.name,
    images: [
      {
        url: "/holmefencinglogo.png",
        width: 1408,
        height: 768,
        alt: "Holme Fencing logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Sacramento Fence Installation`,
    description:
      "Professional fence installation and repair for Sacramento homeowners and businesses.",
    images: ["/holmefencinglogo.png"],
  },
  icons: {
    icon: "/holmefencinglogo.png",
    apple: "/holmefencinglogo.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-[var(--color-sand-100)] text-[var(--color-earth-900)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
