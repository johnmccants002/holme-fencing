"use client";

import { useMemo, useState } from "react";

import {
  calculateFencingEstimate,
  formatCurrency,
  type CalculatorValidationErrors,
  type FencingCalculatorInput,
  type FencingEstimateResult,
  validateFencingInput,
} from "@/lib/fencingCalculator";
import {
  FENCING_PRICING_CONFIG,
  FINISH_OPTIONS,
  HEIGHT_OPTIONS,
  TERRAIN_OPTIONS,
  type FenceHeight,
  type FenceType,
  type FinishType,
  type PriceRange,
  type TerrainComplexity,
} from "@/lib/fencingPricing";

type FencingCalculatorFormState = {
  fenceLengthFt: string;
  fenceType: FenceType;
  fenceHeightFt: FenceHeight;
  walkGateCount: string;
  doubleGateCount: string;
  removeOldFence: boolean;
  terrain: TerrainComplexity;
  finishType: FinishType;
  cornerLot: boolean;
  permitRequired: boolean;
  rushJob: boolean;
};

type LeadFormState = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormState, string>>;

export type QuoteLeadPayload = {
  customer: LeadFormState;
  estimate: FencingEstimateResult;
};

type FencingQuoteCalculatorProps = {
  className?: string;
  onRequestQuote?: (payload: QuoteLeadPayload) => Promise<void> | void;
};

const DEFAULT_FORM_STATE: FencingCalculatorFormState = {
  fenceLengthFt: "140",
  fenceType: "wood_privacy",
  fenceHeightFt: 6,
  walkGateCount: "1",
  doubleGateCount: "0",
  removeOldFence: false,
  terrain: "standard",
  finishType: "none",
  cornerLot: false,
  permitRequired: false,
  rushJob: false,
};

const DEFAULT_LEAD_STATE: LeadFormState = {
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export function FencingQuoteCalculator({
  className,
  onRequestQuote,
}: FencingQuoteCalculatorProps) {
  const [formState, setFormState] = useState<FencingCalculatorFormState>(DEFAULT_FORM_STATE);
  const [formErrors, setFormErrors] = useState<CalculatorValidationErrors>({});
  const [estimate, setEstimate] = useState<FencingEstimateResult | null>(null);

  const [leadForm, setLeadForm] = useState<LeadFormState>(DEFAULT_LEAD_STATE);
  const [leadErrors, setLeadErrors] = useState<LeadFormErrors>({});
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string>("");
  const [leadFailure, setLeadFailure] = useState<string>("");

  const completionPercentage = useMemo(() => {
    const checks = [
      Number(formState.fenceLengthFt) > 0,
      formState.fenceType.length > 0,
      formState.fenceHeightFt > 0,
      Number(formState.walkGateCount) >= 0,
      Number(formState.doubleGateCount) >= 0,
      formState.terrain.length > 0,
      formState.finishType.length > 0,
    ];

    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [formState]);

  const activeStep = estimate ? 3 : completionPercentage > 45 ? 2 : 1;

  const fenceTypeCards = useMemo(
    () =>
      FENCING_PRICING_CONFIG.fenceTypeOrder.map((key) => ({
        key,
        ...FENCING_PRICING_CONFIG.fenceTypes[key],
      })),
    [],
  );

  async function handleEstimateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedInput = normalizeFormToInput(formState);
    const nextErrors = validateFencingInput(normalizedInput);

    setFormErrors(nextErrors);
    setLeadSuccess("");
    setLeadFailure("");

    if (Object.keys(nextErrors).length > 0) {
      setEstimate(null);
      return;
    }

    const nextEstimate = calculateFencingEstimate(normalizedInput);
    setEstimate(nextEstimate);
  }

  async function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!estimate) {
      return;
    }

    const nextErrors = validateLeadForm(leadForm);
    setLeadErrors(nextErrors);
    setLeadSuccess("");
    setLeadFailure("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsLeadSubmitting(true);

      if (onRequestQuote) {
        await onRequestQuote({
          customer: leadForm,
          estimate,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setLeadSuccess("Thanks. We received your request and will follow up shortly.");
      setLeadForm(DEFAULT_LEAD_STATE);
    } catch {
      setLeadFailure("Something went wrong while sending your request. Please try again.");
    } finally {
      setIsLeadSubmitting(false);
    }
  }

  function updateFormState<K extends keyof FencingCalculatorFormState>(
    key: K,
    value: FencingCalculatorFormState[K],
  ) {
    setFormState((current) => ({ ...current, [key]: value }));

    if (key === "fenceLengthFt" && formErrors.fenceLengthFt) {
      setFormErrors((current) => ({ ...current, fenceLengthFt: undefined }));
    }

    if (key === "walkGateCount" && formErrors.walkGateCount) {
      setFormErrors((current) => ({ ...current, walkGateCount: undefined }));
    }

    if (key === "doubleGateCount" && formErrors.doubleGateCount) {
      setFormErrors((current) => ({ ...current, doubleGateCount: undefined }));
    }
  }

  function updateLeadState<K extends keyof LeadFormState>(key: K, value: LeadFormState[K]) {
    setLeadForm((current) => ({ ...current, [key]: value }));

    if (leadErrors[key]) {
      setLeadErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  return (
    <section
      className={`rounded-3xl border border-[var(--color-sand-300)] bg-white p-6 shadow-[0_24px_70px_rgba(22,28,26,0.1)] md:p-8 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-700)]">
            Instant Estimator
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--color-earth-900)] md:text-4xl">
            Fencing Quote Calculator
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-earth-700)] md:text-base">
            Get a contractor-style ballpark range in under a minute. We use realistic
            Sacramento-area pricing assumptions for planning purposes.
          </p>
        </div>

        <div className="w-full max-w-xs rounded-2xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-earth-700)]">
            Project Setup Progress
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-sand-200)]">
            <div
              className="h-full rounded-full bg-[var(--color-sage-700)] transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-[var(--color-earth-800)]">
            {completionPercentage}% complete
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-2 rounded-2xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-3 text-xs text-[var(--color-earth-700)] md:grid-cols-3 md:text-sm">
        <StepBadge isActive={activeStep >= 1} label="1. Project Details" />
        <StepBadge isActive={activeStep >= 2} label="2. Scope Options" />
        <StepBadge isActive={activeStep >= 3} label="3. Estimate + Quote Request" />
      </div>

      <form onSubmit={handleEstimateSubmit} className="mt-8 space-y-8" noValidate>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.13em] text-[var(--color-earth-700)]">
                Fence Type
              </legend>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {fenceTypeCards.map((typeCard) => {
                  const isActive = formState.fenceType === typeCard.key;

                  return (
                    <label
                      key={typeCard.key}
                      className={`cursor-pointer rounded-2xl border p-4 transition ${
                        isActive
                          ? "border-[var(--color-sage-700)] bg-[var(--color-sage-100)]"
                          : "border-[var(--color-sand-300)] bg-white hover:border-[var(--color-sage-400)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fenceType"
                        value={typeCard.key}
                        checked={isActive}
                        onChange={() => updateFormState("fenceType", typeCard.key)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base font-bold text-[var(--color-earth-900)]">{typeCard.label}</p>
                        {typeCard.mostPopular ? (
                          <span className="rounded-full bg-[var(--color-sage-700)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-sand-50)]">
                            Most Popular
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--color-earth-700)]">
                        {typeCard.summary}
                      </p>
                      <p className="mt-3 text-xs font-semibold text-[var(--color-earth-800)]">
                        Typical install: {formatCurrency(typeCard.basePerLinearFoot.low)} -{" "}
                        {formatCurrency(typeCard.basePerLinearFoot.high)} / ft
                      </p>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fence-length"
                  className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]"
                >
                  Fence Length (Feet)
                </label>
                <input
                  id="fence-length"
                  type="number"
                  min={1}
                  step={1}
                  value={formState.fenceLengthFt}
                  onChange={(event) => updateFormState("fenceLengthFt", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                  placeholder="e.g. 140"
                />
                <FieldError text={formErrors.fenceLengthFt} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]">
                  Fence Height
                </p>
                <div className="mt-2 flex gap-2">
                  {HEIGHT_OPTIONS.map((height) => (
                    <button
                      key={height}
                      type="button"
                      onClick={() => updateFormState("fenceHeightFt", height)}
                      className={`flex-1 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        formState.fenceHeightFt === height
                          ? "border-[var(--color-sage-700)] bg-[var(--color-sage-100)] text-[var(--color-earth-900)]"
                          : "border-[var(--color-sand-300)] bg-white text-[var(--color-earth-700)] hover:border-[var(--color-sage-400)]"
                      }`}
                    >
                      {height} ft
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="walk-gates"
                  className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]"
                >
                  Walk Gates
                </label>
                <input
                  id="walk-gates"
                  type="number"
                  min={0}
                  step={1}
                  value={formState.walkGateCount}
                  onChange={(event) => updateFormState("walkGateCount", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                />
                <FieldError text={formErrors.walkGateCount} />
              </div>

              <div>
                <label
                  htmlFor="double-gates"
                  className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]"
                >
                  Double Gates
                </label>
                <input
                  id="double-gates"
                  type="number"
                  min={0}
                  step={1}
                  value={formState.doubleGateCount}
                  onChange={(event) => updateFormState("doubleGateCount", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                />
                <FieldError text={formErrors.doubleGateCount} />
              </div>
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-5">
            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]">
                Terrain / Job Complexity
              </legend>
              <div className="mt-3 space-y-2">
                {TERRAIN_OPTIONS.map((terrain) => (
                  <button
                    key={terrain.value}
                    type="button"
                    onClick={() => updateFormState("terrain", terrain.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                      formState.terrain === terrain.value
                        ? "border-[var(--color-sage-700)] bg-[var(--color-sage-100)]"
                        : "border-[var(--color-sand-300)] bg-white hover:border-[var(--color-sage-400)]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[var(--color-earth-900)]">{terrain.label}</p>
                    <p className="mt-1 text-xs text-[var(--color-earth-700)]">{terrain.detail}</p>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]">
                Stain or Paint
              </legend>
              <div className="mt-3 space-y-2">
                {FINISH_OPTIONS.map((finishOption) => (
                  <button
                    key={finishOption.value}
                    type="button"
                    onClick={() => updateFormState("finishType", finishOption.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                      formState.finishType === finishOption.value
                        ? "border-[var(--color-sage-700)] bg-[var(--color-sage-100)]"
                        : "border-[var(--color-sand-300)] bg-white hover:border-[var(--color-sage-400)]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[var(--color-earth-900)]">{finishOption.label}</p>
                    <p className="mt-1 text-xs text-[var(--color-earth-700)]">{finishOption.detail}</p>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-earth-700)]">
                Additional Scope
              </legend>

              <div className="mt-3 space-y-2 text-sm">
                <CheckboxRow
                  label="Remove old fence"
                  checked={formState.removeOldFence}
                  onChange={(checked) => updateFormState("removeOldFence", checked)}
                />
                <CheckboxRow
                  label="Corner lot / extra turns"
                  checked={formState.cornerLot}
                  onChange={(checked) => updateFormState("cornerLot", checked)}
                />
                <CheckboxRow
                  label="Permit needed"
                  checked={formState.permitRequired}
                  onChange={(checked) => updateFormState("permitRequired", checked)}
                />
                <CheckboxRow
                  label="Rush job timeline"
                  checked={formState.rushJob}
                  onChange={(checked) => updateFormState("rushJob", checked)}
                />
              </div>
            </fieldset>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-4 text-sm text-[var(--color-earth-700)]">
          This estimator gives a rough planning range. Final pricing always depends on site
          access, exact layout, permit requirements, and field measurements.
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[var(--color-sage-700)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)] md:w-auto"
        >
          Calculate My Ballpark Estimate
        </button>
      </form>

      {estimate ? (
        <div className="mt-10 rounded-3xl border border-[var(--color-sand-300)] bg-[var(--color-sand-50)] p-6 transition-all duration-500 ease-out md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-sage-700)]">
            Estimate Result
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--color-earth-900)] md:text-3xl">
            Your rough project range
          </h3>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <EstimateValueCard label="Low Estimate" value={estimate.lowEstimate} />
            <EstimateValueCard label="Likely Estimate" value={estimate.likelyEstimate} featured />
            <EstimateValueCard label="High Estimate" value={estimate.highEstimate} />
          </div>

          <EstimateRangeBar
            lowEstimate={estimate.lowEstimate}
            likelyEstimate={estimate.likelyEstimate}
            highEstimate={estimate.highEstimate}
          />

          <div className="mt-8 rounded-2xl border border-[var(--color-sand-300)] bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-earth-700)]">
              Cost Breakdown (Likely)
            </p>

            <div className="mt-4 space-y-3">
              <BreakdownRow label="Material + Installation" range={estimate.breakdown.material} />
              <BreakdownRow label="Gates" range={estimate.breakdown.gates} />
              <BreakdownRow label="Old Fence Removal" range={estimate.breakdown.removal} />
              <BreakdownRow label="Stain / Paint" range={estimate.breakdown.finish} />
              <BreakdownRow
                label={`Terrain Adjustment (${formatPercent(
                  FENCING_PRICING_CONFIG.terrainMultipliers[estimate.inputSnapshot.terrain] - 1,
                )})`}
                range={estimate.breakdown.terrainAdjustment}
              />
              <BreakdownRow label="Optional Scope Items" range={estimate.breakdown.optionalSurcharges} />
              <BreakdownRow label="Rush Timeline Adjustment" range={estimate.breakdown.rushAdjustment} />
            </div>
          </div>

          <p className="mt-6 rounded-2xl border border-[var(--color-sand-300)] bg-white p-4 text-sm leading-relaxed text-[var(--color-earth-700)]">
            This is a ballpark estimate. Final pricing depends on site conditions, material
            availability, access, and exact scope.
          </p>

          <div className="mt-7">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-earth-700)]">
              Request Your Exact Quote
            </p>
            <p className="mt-2 text-sm text-[var(--color-earth-700)]">
              No obligation. Fast response from our Sacramento team.
            </p>

            <form onSubmit={handleLeadSubmit} className="mt-4 space-y-4" noValidate>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="lead-name" className="text-sm font-semibold text-[var(--color-earth-800)]">
                    Name
                  </label>
                  <input
                    id="lead-name"
                    value={leadForm.name}
                    onChange={(event) => updateLeadState("name", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                  />
                  <FieldError text={leadErrors.name} />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="text-sm font-semibold text-[var(--color-earth-800)]">
                    Phone
                  </label>
                  <input
                    id="lead-phone"
                    value={leadForm.phone}
                    onChange={(event) => updateLeadState("phone", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                  />
                  <FieldError text={leadErrors.phone} />
                </div>

                <div>
                  <label htmlFor="lead-email" className="text-sm font-semibold text-[var(--color-earth-800)]">
                    Email
                  </label>
                  <input
                    id="lead-email"
                    value={leadForm.email}
                    onChange={(event) => updateLeadState("email", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                  />
                  <FieldError text={leadErrors.email} />
                </div>
              </div>

              <div>
                <label htmlFor="lead-notes" className="text-sm font-semibold text-[var(--color-earth-800)]">
                  Project Notes
                </label>
                <textarea
                  id="lead-notes"
                  rows={4}
                  value={leadForm.notes}
                  onChange={(event) => updateLeadState("notes", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-700)]"
                  placeholder="Share timeline, HOA requirements, property notes, or preferred material."
                />
                <FieldError text={leadErrors.notes} />
              </div>

              <button
                type="submit"
                disabled={isLeadSubmitting}
                className="w-full rounded-full bg-[var(--color-sage-700)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLeadSubmitting ? "Sending Request..." : "Request My Exact Quote"}
              </button>

              {leadSuccess ? (
                <p className="rounded-xl border border-[var(--color-sage-300)] bg-[var(--color-sage-100)] px-4 py-3 text-sm text-[var(--color-earth-900)]">
                  {leadSuccess}
                </p>
              ) : null}

              {leadFailure ? (
                <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {leadFailure}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function StepBadge({ isActive, label }: { isActive: boolean; label: string }) {
  return (
    <div
      className={`rounded-lg px-3 py-2 font-semibold transition ${
        isActive
          ? "bg-[var(--color-sage-700)] text-[var(--color-sand-50)]"
          : "border border-[var(--color-sand-300)] bg-white text-[var(--color-earth-700)]"
      }`}
    >
      {label}
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[var(--color-sand-300)] bg-white px-3 py-2">
      <span className="text-sm text-[var(--color-earth-800)]">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[var(--color-sage-700)]"
      />
    </label>
  );
}

function EstimateValueCard({
  label,
  value,
  featured,
}: {
  label: string;
  value: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        featured
          ? "border-[var(--color-sage-700)] bg-[var(--color-sage-100)]"
          : "border-[var(--color-sand-300)] bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-earth-700)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-[var(--color-earth-900)] md:text-3xl">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function EstimateRangeBar({
  lowEstimate,
  likelyEstimate,
  highEstimate,
}: {
  lowEstimate: number;
  likelyEstimate: number;
  highEstimate: number;
}) {
  const span = Math.max(1, highEstimate - lowEstimate);
  const likelyPercent = ((likelyEstimate - lowEstimate) / span) * 100;

  return (
    <div className="mt-6 rounded-2xl border border-[var(--color-sand-300)] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-earth-700)]">
        Estimate Range Position
      </p>
      <div className="relative mt-4 h-3 rounded-full bg-[var(--color-sand-200)]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-sage-300)] via-[var(--color-sage-500)] to-[var(--color-sage-700)]" />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--color-earth-900)] shadow"
          style={{ left: `calc(${Math.min(98, Math.max(2, likelyPercent))}% - 10px)` }}
          aria-hidden
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[var(--color-earth-700)]">
        <span>{formatCurrency(lowEstimate)}</span>
        <span>Likely: {formatCurrency(likelyEstimate)}</span>
        <span>{formatCurrency(highEstimate)}</span>
      </div>
    </div>
  );
}

function BreakdownRow({ label, range }: { label: string; range: PriceRange }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--color-sand-200)] pb-3 text-sm last:border-b-0 last:pb-0">
      <span className="text-[var(--color-earth-700)]">{label}</span>
      <div className="text-right">
        <p className="font-semibold text-[var(--color-earth-900)]">{formatCurrency(range.mid)}</p>
        <p className="text-xs text-[var(--color-earth-700)]">
          {formatCurrency(range.low)} - {formatCurrency(range.high)}
        </p>
      </div>
    </div>
  );
}

function FieldError({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-700">{text}</p>;
}

function normalizeFormToInput(formState: FencingCalculatorFormState): FencingCalculatorInput {
  return {
    fenceLengthFt: Number(formState.fenceLengthFt),
    fenceType: formState.fenceType,
    fenceHeightFt: formState.fenceHeightFt,
    walkGateCount: toWholeNumber(formState.walkGateCount),
    doubleGateCount: toWholeNumber(formState.doubleGateCount),
    removeOldFence: formState.removeOldFence,
    terrain: formState.terrain,
    finishType: formState.finishType,
    cornerLot: formState.cornerLot,
    permitRequired: formState.permitRequired,
    rushJob: formState.rushJob,
  };
}

function toWholeNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Math.floor(parsed);
}

function formatPercent(value: number): string {
  const percent = Math.round(value * 100);

  if (percent === 0) {
    return "0%";
  }

  return percent > 0 ? `+${percent}%` : `${percent}%`;
}

function validateLeadForm(values: LeadFormState): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const hasPhone = values.phone.trim().length > 0;
  const hasEmail = values.email.trim().length > 0;

  if (!hasPhone && !hasEmail) {
    errors.phone = "Please provide a phone number or an email.";
    errors.email = "Please provide a phone number or an email.";
  }

  if (hasEmail && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}
