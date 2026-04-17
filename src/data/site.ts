import type { GalleryProject, ServiceItem } from "@/types/site";

export const business = {
  name: "Holme Fencing",
  phoneDisplay: "(916) 806-8501",
  phoneHref: "tel:+19168068501",
  email: "info@holmefencing.com",
  addressLine: "1234 Main Street",
  cityStateZip: "Sacramento, CA 95814",
  hours: "Mon - Fri: 7:00 AM - 6:00 PM",
  serviceRegion: "Sacramento and nearby communities",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/quote-calculator", label: "Calculator" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const serviceAreas = [
  "Sacramento",
  "Elk Grove",
  "Roseville",
  "Folsom",
  "Rancho Cordova",
  "Citrus Heights",
];

export const primaryServices: ServiceItem[] = [
  {
    id: "wood-installation",
    title: "Wood Fence Installation",
    description:
      "Privacy and decorative wood fences built with durable materials and clean lines to match your property.",
    features: [
      "Redwood and pressure-treated options",
      "Custom height and layout planning",
      "Trim and gate matching",
    ],
    image: "/gallery/wood-privacy.jpg",
  },
  {
    id: "metal-fencing",
    title: "Metal Fence Installation",
    description:
      "Strong, low-maintenance metal fencing for homes and light commercial properties with a secure finish.",
    features: [
      "Wrought iron style panels",
      "Steel and aluminum options",
      "Powder-coated finishes",
    ],
    image: "/gallery/metal-perimeter.jpg",
  },
];

export const additionalServices = [
  "Gate installation and replacement",
  "Fence repair and panel replacement",
  "Post reset and alignment correction",
  "Property line and perimeter consultation",
];

export const processSteps = [
  {
    title: "1. On-site Visit",
    description:
      "We walk the property, confirm layout goals, and provide a clear recommendation based on use and budget.",
  },
  {
    title: "2. Detailed Quote",
    description:
      "You receive a straightforward estimate with scope, material options, and timeline expectations.",
  },
  {
    title: "3. Professional Build",
    description:
      "Our crew installs your fence with careful site prep and quality checks before final handoff.",
  },
];

export const testimonials = [
  {
    name: "M. Rivera",
    quote:
      "Holme Fencing kept communication clear and finished our backyard fence right on schedule.",
  },
  {
    name: "K. Johnson",
    quote:
      "The crew was professional, tidy, and the final result looks excellent from every angle.",
  },
  {
    name: "A. Patel",
    quote:
      "Great experience from quote to install. We would absolutely hire Holme Fencing again.",
  },
];

export const credentialBadges = [
  "Licensed Placeholder",
  "Insured Placeholder",
  "Locally Owned",
  "Free Estimates",
];

export const galleryProjects: GalleryProject[] = [
  {
    id: "sac-wood-privacy",
    title: "Backyard Privacy Fence",
    image: "/gallery/wood-privacy.jpg",
    material: "Wood",
    location: "Sacramento",
    alt: "Sample photo of a backyard wood privacy fence project in Sacramento.",
  },
  {
    id: "elk-grove-metal",
    title: "Perimeter Security Fence",
    image: "/gallery/metal-perimeter.jpg",
    material: "Metal",
    location: "Elk Grove",
    alt: "Sample photo of a metal perimeter fence project in Elk Grove.",
  },
  {
    id: "roseville-entry-gate",
    title: "Decorative Entry Gate",
    image: "/gallery/gate-entry.jpg",
    material: "Metal Gate",
    location: "Roseville",
    alt: "Sample photo of a decorative fence and entry gate project in Roseville.",
  },
  {
    id: "folsom-wood-side-yard",
    title: "Side-Yard Privacy Upgrade",
    image: "/gallery/wood-privacy.jpg",
    material: "Wood",
    location: "Folsom",
    alt: "Sample photo of a side-yard wood privacy fence in Folsom.",
  },
  {
    id: "rancho-cordova-metal-yard",
    title: "Front Yard Metal Fence",
    image: "/gallery/metal-perimeter.jpg",
    material: "Metal",
    location: "Rancho Cordova",
    alt: "Sample photo of a front yard metal fence in Rancho Cordova.",
  },
  {
    id: "citrus-heights-gate",
    title: "Driveway Gate Installation",
    image: "/gallery/gate-entry.jpg",
    material: "Gate",
    location: "Citrus Heights",
    alt: "Sample photo of a driveway gate and fence installation in Citrus Heights.",
  },
];
