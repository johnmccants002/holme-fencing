import {
  FENCING_PRICING_CONFIG,
  type FenceHeight,
  type FenceType,
  type FinishType,
  type FencingPricingConfig,
  type PriceRange,
  type TerrainComplexity,
} from "@/lib/fencingPricing";

export type FencingCalculatorInput = {
  fenceLengthFt: number;
  fenceType: FenceType;
  fenceHeightFt: FenceHeight;
  walkGateCount: number;
  doubleGateCount: number;
  removeOldFence: boolean;
  terrain: TerrainComplexity;
  finishType: FinishType;
  cornerLot: boolean;
  permitRequired: boolean;
  rushJob: boolean;
};

export type CalculatorValidationErrors = Partial<
  Record<"fenceLengthFt" | "walkGateCount" | "doubleGateCount", string>
>;

export type EstimateBreakdown = {
  material: PriceRange;
  gates: PriceRange;
  removal: PriceRange;
  finish: PriceRange;
  terrainAdjustment: PriceRange;
  optionalSurcharges: PriceRange;
  rushAdjustment: PriceRange;
};

export type FencingEstimateResult = {
  lowEstimate: number;
  likelyEstimate: number;
  highEstimate: number;
  breakdown: EstimateBreakdown;
  assumptions: string[];
  inputSnapshot: FencingCalculatorInput;
};

const ZERO_RANGE: PriceRange = { low: 0, mid: 0, high: 0 };

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return USD_FORMATTER.format(value);
}

export function validateFencingInput(input: FencingCalculatorInput): CalculatorValidationErrors {
  const errors: CalculatorValidationErrors = {};

  if (!Number.isFinite(input.fenceLengthFt) || input.fenceLengthFt <= 0) {
    errors.fenceLengthFt = "Enter a valid fence length greater than 0 feet.";
  }

  if (!Number.isFinite(input.walkGateCount) || input.walkGateCount < 0) {
    errors.walkGateCount = "Walk gate count must be 0 or more.";
  }

  if (!Number.isFinite(input.doubleGateCount) || input.doubleGateCount < 0) {
    errors.doubleGateCount = "Double gate count must be 0 or more.";
  }

  if (input.walkGateCount > 12 || input.doubleGateCount > 8) {
    errors.walkGateCount = "Gate count looks unusually high. Please double-check quantities.";
  }

  return errors;
}

export function calculateFencingEstimate(
  input: FencingCalculatorInput,
  config: FencingPricingConfig = FENCING_PRICING_CONFIG,
): FencingEstimateResult {
  const fenceTypePricing = config.fenceTypes[input.fenceType];
  const heightMultiplier = config.heightMultipliers[input.fenceHeightFt];
  const terrainMultiplier = config.terrainMultipliers[input.terrain];

  const material = multiplyRange(
    multiplyRange(fenceTypePricing.basePerLinearFoot, input.fenceLengthFt),
    heightMultiplier,
  );

  const gateCosts = addRanges(
    multiplyRange(config.gatePricing.walkGate, input.walkGateCount),
    multiplyRange(config.gatePricing.doubleGate, input.doubleGateCount),
  );

  const removal = input.removeOldFence ? config.removalFixed : ZERO_RANGE;

  const finish = multiplyRange(config.finishPerLinearFoot[input.finishType], input.fenceLengthFt);

  // Terrain affects linear-foot labor scope, not fixed-fee surcharges.
  const beforeTerrain = addRanges(material, gateCosts, finish);
  const afterTerrain = multiplyRange(beforeTerrain, terrainMultiplier);
  const terrainAdjustment = subtractRanges(afterTerrain, beforeTerrain);

  const optionalSurcharges = addRanges(
    input.cornerLot ? config.optionalSurcharges.cornerLot : ZERO_RANGE,
    input.permitRequired ? config.optionalSurcharges.permitRequired : ZERO_RANGE,
  );

  const subtotalWithOptions = addRanges(afterTerrain, removal, optionalSurcharges);

  const rushAdjustment = input.rushJob
    ? multiplyRange(subtotalWithOptions, config.rushJobMultiplier - 1)
    : ZERO_RANGE;

  const finalTotal = addRanges(subtotalWithOptions, rushAdjustment);

  const roundedTotal = normalizeRange(roundRange(finalTotal));

  return {
    lowEstimate: roundedTotal.low,
    likelyEstimate: roundedTotal.mid,
    highEstimate: roundedTotal.high,
    breakdown: {
      material: roundRange(material),
      gates: roundRange(gateCosts),
      removal: roundRange(removal),
      finish: roundRange(finish),
      terrainAdjustment: roundRange(terrainAdjustment),
      optionalSurcharges: roundRange(optionalSurcharges),
      rushAdjustment: roundRange(rushAdjustment),
    },
    assumptions: buildAssumptions(input, config),
    inputSnapshot: { ...input },
  };
}

function buildAssumptions(
  input: FencingCalculatorInput,
  config: FencingPricingConfig,
): string[] {
  const assumptions = [
    `${config.fenceTypes[input.fenceType].label} pricing at ${input.fenceHeightFt} ft height.`,
    `Terrain setting: ${input.terrain}.`,
    `Gate count: ${input.walkGateCount} walk gate(s), ${input.doubleGateCount} double gate(s).`,
  ];

  if (input.removeOldFence) {
    assumptions.push("Includes old fence demolition and haul-away allowance.");
  }

  if (input.finishType !== "none") {
    assumptions.push(`Includes ${input.finishType} finish allowance.`);
  }

  if (input.cornerLot || input.permitRequired || input.rushJob) {
    assumptions.push("Includes selected project complexity surcharges.");
  }

  return assumptions;
}

function multiplyRange(range: PriceRange, factor: number): PriceRange {
  return {
    low: range.low * factor,
    mid: range.mid * factor,
    high: range.high * factor,
  };
}

function addRanges(...ranges: PriceRange[]): PriceRange {
  return ranges.reduce(
    (accumulator, current) => ({
      low: accumulator.low + current.low,
      mid: accumulator.mid + current.mid,
      high: accumulator.high + current.high,
    }),
    { ...ZERO_RANGE },
  );
}

function subtractRanges(source: PriceRange, subtractor: PriceRange): PriceRange {
  return {
    low: source.low - subtractor.low,
    mid: source.mid - subtractor.mid,
    high: source.high - subtractor.high,
  };
}

function roundRange(range: PriceRange): PriceRange {
  return {
    low: roundCurrency(range.low),
    mid: roundCurrency(range.mid),
    high: roundCurrency(range.high),
  };
}

function roundCurrency(value: number): number {
  return Math.round(value / 10) * 10;
}

function normalizeRange(range: PriceRange): PriceRange {
  const low = Math.max(0, range.low);
  const mid = Math.max(low, range.mid);
  const high = Math.max(mid, range.high);

  return { low, mid, high };
}
