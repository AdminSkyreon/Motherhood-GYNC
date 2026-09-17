"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingThankYouCard from "@/components/BookingThankYouCard";
import { getThankYouPath } from "@/lib/bookingPaths";
import { collectCampaign } from "@/lib/campaign";
import { hospitalToLeadContext } from "@/lib/hospital-lead-context";
import { saveBookingConfirmation } from "@/lib/booking-confirmation";
import { markHeroBookingFormEngaged } from "@/lib/booking-popup-guard";
import { submitLead } from "@/lib/submit-lead";

const fieldClass =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-mh-ink placeholder-gray-400 focus:outline-none focus:ring-1 font-['Montserrat',sans-serif]";

const FLIP_MS = 680;

type FormValues = { name: string; mobile: string; language: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
    errors.name = "Use letters and spaces only.";
  }

  const digits = values.mobile.replace(/\D/g, "");
  if (!digits) {
    errors.mobile = "Please enter your mobile number.";
  } else if (digits.length !== 10) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  } else if (!/^[6-9]/.test(digits)) {
    errors.mobile = "Mobile number should start with 6–9.";
  }

  return errors;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs leading-snug text-red-600 font-['Montserrat',sans-serif]" role="alert">
      {message}
    </p>
  );
}

export default function BookingFormCard({
  hospitalSlug,
  site,
  lead,
  formTitle,
  subtext,
  languages,
  ctaLabel,
  privacyText,
  thankYou,
  backHref = "/",
  layout = "default",
}) {
  const formScope = layout === "popup" ? "popup" : "hero";
  const nameInputId = `booking-name-${formScope}`;
  const mobileInputId = `booking-mobile-${formScope}`;
  const languageInputId = `booking-language-${formScope}`;

  const router = useRouter();
  const [values, setValues] = useState({ name: "", mobile: "", language: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [flipped, setFlipped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notifyHeroEngaged = () => {
    if (formScope === "hero") markHeroBookingFormEngaged();
  };

  const updateField = (field, value) => {
    notifyHeroEngaged();
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    const hospital = hospitalToLeadContext(site, hospitalSlug);
    const campaign = collectCampaign(lead);

    try {
      const result = await submitLead({
        form: values,
        lead: lead || {},
        hospital,
        campaign,
        meta: {
          pageUrl: window.location.href,
          submittedAt: new Date().toISOString(),
          vertical: "gynaecology",
        },
      });
      if (result?.requestId) {
        saveBookingConfirmation(hospitalSlug, result.requestId);
      }
    } catch (err) {
      console.error("[submitLead]", err);
    }

    setFlipped(true);
    window.setTimeout(() => {
      router.push(getThankYouPath(hospitalSlug));
    }, FLIP_MS);
  };

  const borderFor = (field) =>
    errors[field]
      ? "border-red-400 focus:ring-red-400"
      : "border-mh-pink-soft focus:ring-mh-pink";

  return (
    <div
      data-booking-form={formScope}
      className={`booking-flip-scene mx-auto w-full ${
        layout === "popup"
          ? "booking-flip-scene--popup"
          : "booking-flip-scene--stacked-fit max-w-none lg:max-w-[360px] lg:ml-auto lg:mr-0"
      }`}
    >
      <div className={`booking-flip-inner${flipped ? " is-flipped" : ""}`}>
        <div className="booking-flip-face booking-flip-front">
          <div
            className={`booking-form-shell${layout === "popup" ? " booking-form-shell--popup" : ""}`}
          >
            <h3
              id={layout === "popup" ? "booking-popup-title" : undefined}
              className="text-lg font-extrabold leading-snug text-mh-blue font-['Montserrat',sans-serif] sm:text-xl"
            >
              {formTitle}
            </h3>
            {subtext ? (
              <p className="mt-2 text-sm leading-snug text-mh-ink font-['Montserrat',sans-serif]">
                {subtext}
              </p>
            ) : null}

            <form
              className="mt-4 space-y-3"
              onSubmit={handleSubmit}
              noValidate
              onFocusCapture={notifyHeroEngaged}
            >
              <div>
                <label htmlFor={nameInputId} className="sr-only">
                  Full Name
                </label>
                <input
                  id={nameInputId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${nameInputId}-error` : undefined}
                  className={`${fieldClass} ${borderFor("name")}`}
                />
                <FieldError id={`${nameInputId}-error`} message={errors.name} />
              </div>

              <div>
                <label htmlFor={mobileInputId} className="sr-only">
                  Mobile Number
                </label>
                <input
                  id={mobileInputId}
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Mobile Number"
                  value={values.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={errors.mobile ? `${mobileInputId}-error` : undefined}
                  className={`${fieldClass} ${borderFor("mobile")}`}
                />
                <FieldError id={`${mobileInputId}-error`} message={errors.mobile} />
              </div>

              <div>
                <label htmlFor={languageInputId} className="sr-only">
                  Preferred Language
                </label>
                <select
                  id={languageInputId}
                  name="language"
                  value={values.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.language)}
                  aria-describedby={errors.language ? `${languageInputId}-error` : undefined}
                  className={`${fieldClass} ${borderFor("language")} cursor-pointer appearance-none`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23DB5070'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "20px",
                  }}
                >
                  <option value="">Preferred Language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <FieldError id={`${languageInputId}-error`} message={errors.language} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-mh-pink py-3 text-base font-bold text-white shadow-md transition hover:opacity-90 disabled:opacity-70 font-['Montserrat',sans-serif]"
              >
                {ctaLabel}
              </button>
            </form>

            {privacyText ? (
              <p className="mt-3 text-center text-xs leading-snug text-gray-500 font-['Montserrat',sans-serif]">
                {privacyText}
              </p>
            ) : null}
          </div>
        </div>

        <div className="booking-flip-face booking-flip-back">
          <div className="booking-form-shell">
            <BookingThankYouCard thankYou={thankYou} embedded />
          </div>
        </div>
      </div>
    </div>
  );
}
