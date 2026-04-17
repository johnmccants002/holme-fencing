"use client";

import { FormEvent, useState } from "react";

import type { ContactFormValues } from "@/types/site";

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function validate(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Please share a few details about your fence project.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsSuccess(true);
    setValues(initialValues);
  }

  function updateField<K extends keyof ContactFormValues>(field: K, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  return (
    <form
      className="space-y-5 rounded-3xl border border-[var(--color-sand-300)] bg-white p-6 shadow-[0_20px_60px_rgba(49,36,24,0.08)]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-earth-900)]">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-500)]"
        />
        {errors.name ? <p className="mt-1 text-xs text-red-700">{errors.name}</p> : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-earth-900)]">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-500)]"
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-700">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-earth-900)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-500)]"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-700">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-earth-900)]">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--color-sand-400)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-sage-500)]"
        />
        {errors.message ? <p className="mt-1 text-xs text-red-700">{errors.message}</p> : null}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[var(--color-sage-700)] px-6 py-3 text-sm font-semibold text-[var(--color-sand-50)] transition hover:bg-[var(--color-sage-800)] disabled:cursor-not-allowed disabled:opacity-75"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Request My Quote"}
      </button>

      {isSuccess ? (
        <p className="rounded-xl border border-[var(--color-sage-300)] bg-[var(--color-sage-100)] px-4 py-3 text-sm text-[var(--color-earth-900)]">
          Thanks. Your request was submitted in mock mode for this v1 build.
        </p>
      ) : null}
    </form>
  );
}
