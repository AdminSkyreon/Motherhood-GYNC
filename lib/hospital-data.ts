import type { HospitalLeadConfig } from "@/lib/lead-types";

export type SiteSection = {
  slug?: string;
  hospitalName?: string;
  hospitalShortName?: string;
  regionLabel?: string;
  address?: string;
  phone?: { display?: string; tel?: string };
  seo?: { title?: string; description?: string };
  assets?: { logoSrc?: string; heroImageSrc?: string };
};

export type BookingSection = {
  popupDelaySeconds?: number | null;
  bookingForm?: {
    title?: string;
    subtext?: string;
    ctaLabel?: string;
    privacyText?: string;
    languages?: string[];
  };
  lead?: HospitalLeadConfig;
  thankYou?: {
    imageSrc?: string;
    title?: string;
    message?: string;
  };
};

export type HospitalSections = {
  site?: SiteSection;
  banner?: Record<string, unknown>;
  booking?: BookingSection;
  featuresBar?: unknown[];
  symptoms?: Record<string, unknown>;
  gynaecologyServices?: Record<string, unknown>;
  gynaecologists?: Record<string, unknown>;
  whyChooseUs?: Record<string, unknown>;
  womanhoodLifecycle?: Record<string, unknown>;
  faqs?: Record<string, unknown>;
  reviews?: Record<string, unknown>;
  location?: Record<string, unknown>;
};

export type HospitalRecord = {
  sections: HospitalSections;
  meta?: Record<string, unknown>;
  slug?: string;
};
