import type { CampaignData, HospitalLeadConfig } from "@/lib/lead-types";

const CAMPAIGN_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "campaignid",
  "adgroupid",
  "keyword",
  "utm_referrer",
] as const;

function readQueryParams(searchParams: URLSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of CAMPAIGN_QUERY_KEYS) {
    const value = searchParams.get(key);
    if (value) out[key] = value;
  }
  return out;
}

function detectDevice(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function collectCampaignFromUrl(): CampaignData {
  if (typeof window === "undefined") return { device: "unknown" };

  const searchParams = new URLSearchParams(window.location.search);
  const fromUrl = readQueryParams(searchParams);
  const referrer =
    fromUrl.utm_referrer ||
    (typeof document !== "undefined" ? document.referrer : "") ||
    "";

  return {
    ...fromUrl,
    referrer,
    device: detectDevice(),
  };
}

export function mergeCampaign(
  campaignDefaults: Record<string, string> | undefined,
  urlCampaign: CampaignData,
): CampaignData {
  const defaults = campaignDefaults && typeof campaignDefaults === "object" ? campaignDefaults : {};
  const merged: CampaignData = { ...defaults, ...urlCampaign };
  for (const key of Object.keys(merged)) {
    const k = key as keyof CampaignData;
    if (merged[k] === "" || merged[k] == null) delete merged[k];
  }
  return merged;
}

export function collectCampaign(leadConfig?: HospitalLeadConfig): CampaignData {
  const urlCampaign = collectCampaignFromUrl();
  return mergeCampaign(leadConfig?.campaignDefaults, urlCampaign);
}
