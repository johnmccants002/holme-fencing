export type FenceType =
  | "wood_privacy"
  | "redwood"
  | "wrought_iron"
  | "horizontal_wood";

export type FenceHeight = 4 | 6 | 7;

export type TerrainComplexity = "easy" | "standard" | "difficult";

export type FinishType = "none" | "stain" | "paint";

export type PriceRange = {
  low: number;
  mid: number;
  high: number;
};

export type FenceTypePricing = {
  label: string;
  summary: string;
  basePerLinearFoot: PriceRange;
  mostPopular?: boolean;
};

export type FencingPricingConfig = {
  fenceTypes: Record<FenceType, FenceTypePricing>;
  fenceTypeOrder: FenceType[];
  heightMultipliers: Record<FenceHeight, number>;
  terrainMultipliers: Record<TerrainComplexity, number>;
  gatePricing: {
    walkGate: PriceRange;
    doubleGate: PriceRange;
  };
  removalFixed: PriceRange;
  finishPerLinearFoot: Record<FinishType, PriceRange>;
  optionalSurcharges: {
    cornerLot: PriceRange;
    permitRequired: PriceRange;
  };
  rushJobMultiplier: number;
};

// Centralized pricing assumptions so quote logic can be tuned without touching UI code.
export const FENCING_PRICING_CONFIG: FencingPricingConfig = {
  fenceTypes: {
    wood_privacy: {
      label: "Wood Privacy",
      summary: "Most common residential choice with balanced price and performance.",
      basePerLinearFoot: { low: 48, mid: 48, high: 48 },
      mostPopular: true,
    },
    redwood: {
      label: "Redwood",
      summary: "Premium natural wood with better durability and appearance.",
      basePerLinearFoot: { low: 48, mid: 48, high: 48 },
    },
    wrought_iron: {
      label: "Wrought / Ornamental Iron",
      summary: "High-end security and curb appeal with long service life.",
      basePerLinearFoot: { low: 56, mid: 56, high: 56 },
    },
    horizontal_wood: {
      label: "Horizontal Wood",
      summary: "Modern premium style requiring more labor and finishing detail.",
      basePerLinearFoot: { low: 52, mid: 52, high: 52 },
    },
  },
  fenceTypeOrder: ["wood_privacy", "redwood", "wrought_iron", "horizontal_wood"],
  heightMultipliers: {
    4: 0.9,
    6: 1,
    7: 1.12,
  },
  terrainMultipliers: {
    easy: 0.95,
    standard: 1,
    difficult: 1.2,
  },
  gatePricing: {
    walkGate: { low: 450, mid: 650, high: 900 },
    doubleGate: { low: 1200, mid: 1650, high: 2200 },
  },
  removalFixed: { low: 300, mid: 400, high: 500 },
  finishPerLinearFoot: {
    none: { low: 0, mid: 0, high: 0 },
    stain: { low: 3.5, mid: 5, high: 7 },
    paint: { low: 4.5, mid: 6, high: 8.5 },
  },
  optionalSurcharges: {
    cornerLot: { low: 350, mid: 550, high: 850 },
    permitRequired: { low: 250, mid: 425, high: 700 },
  },
  rushJobMultiplier: 1.08,
};

export const HEIGHT_OPTIONS: FenceHeight[] = [4, 6, 7];

export const TERRAIN_OPTIONS: Array<{ value: TerrainComplexity; label: string; detail: string }> = [
  {
    value: "easy",
    label: "Flat / Easy Access",
    detail: "Open access and minimal grading challenges.",
  },
  {
    value: "standard",
    label: "Standard",
    detail: "Typical residential lot with normal access and layout.",
  },
  {
    value: "difficult",
    label: "Difficult Slope / Obstacles",
    detail: "Steep grade, tight access, roots, or heavy obstruction.",
  },
];

export const FINISH_OPTIONS: Array<{ value: FinishType; label: string; detail: string }> = [
  { value: "none", label: "None", detail: "No coating included." },
  { value: "stain", label: "Stain", detail: "Transparent or semi-transparent wood protection." },
  { value: "paint", label: "Paint", detail: "Solid finish with additional prep and labor." },
];
