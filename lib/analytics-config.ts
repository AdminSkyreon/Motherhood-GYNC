/** Reference IDs — GA4 / Ads tags are configured inside GTM, not injected here. */
export const GA4_MEASUREMENT_ID = "G-6L9WVG3E8N";
export const GOOGLE_ADS_ID = "AW-871619659";

export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-WFR5ZZMC").trim();

export const CONVERSION_EVENT =
  process.env.NEXT_PUBLIC_CONVERSION_EVENT || "generate_lead";

export function isAnalyticsEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "false") {
    return false;
  }
  return GTM_ID.length > 0;
}

export function buildLeadConversionPayload(hospitalSlug: string, requestId: string) {
  return {
    event: CONVERSION_EVENT,
    lead_type: "booking_form",
    hospital_slug: hospitalSlug || "banashankari",
    request_id: requestId,
  };
}
