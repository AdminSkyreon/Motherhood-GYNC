import { getSimpleCrmEnv } from "@/lib/lead-server-env";
import type { HospitalLeadConfig, LeadSubmitContext } from "@/lib/lead-types";

let tokenCache: { token: string; expiresAt: number } | null = null;

export function fallbackRequestId(prefix = "mh"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function fetchAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token;
  }

  const { baseUrl, clientId, clientSecret, username, password } = getSimpleCrmEnv();
  const body = new URLSearchParams({
    grant_type: "password",
    client_id: clientId,
    client_secret: clientSecret,
    username,
    password,
  });

  const res = await fetch(`${baseUrl}/Api/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Unable to retrieve access token (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  const token = data.access_token;
  if (!token) throw new Error("Unable to retrieve access token.");

  const expiresIn = Number(data.expires_in) || 3600;
  tokenCache = { token, expiresAt: now + expiresIn * 1000 };
  return token;
}

export function buildSimpleCrmAttributes(ctx: LeadSubmitContext, leadConfig?: HospitalLeadConfig) {
  const campaign = ctx.campaign || {};
  const lead = leadConfig || ctx.lead || {};

  return {
    website: (lead.website as string) || "MHI",
    last_name: ctx.form.name,
    email: "",
    phone_mobile: ctx.form.mobile,
    unitname_c: lead.unitnameC || "",
    form_enquirytype_c: lead.formEnquiryType || lead.formName || "",
    form_enquirysubtype_c: lead.formEnquirySubtype || "",
    enquiry_source_c: lead.enquirySource || "",
    form_campaign_name_c: lead.formCampaignName || "",
    description: ctx.derived.description,
    source_url_c: ctx.meta.pageUrl || "",
    preferred_appointment_date_c: ctx.derived.appointmentDate,
    utm_source_c: String(campaign.utm_source || ""),
    utm_medium_c: String(campaign.utm_medium || ""),
    utm_campaign_c: String(campaign.utm_campaign || ""),
    campaignid_c: String(campaign.campaignid || campaign.gclid || ""),
    adgroupid_c: String(campaign.adgroupid || ""),
    keyword_c: String(campaign.keyword || ""),
  };
}

export async function createSimpleCrmLead(ctx: LeadSubmitContext, leadConfig?: HospitalLeadConfig) {
  const { baseUrl } = getSimpleCrmEnv();
  const accessToken = await fetchAccessToken();

  const attributes = buildSimpleCrmAttributes(ctx, leadConfig);
  const payload = {
    data: {
      type: "Leads",
      attributes,
    },
  };

  const res = await fetch(`${baseUrl}/Api/V8/module`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Lead creation failed (${res.status}): ${text.slice(0, 300)}`);
  }

  let requestId = fallbackRequestId("crm");
  try {
    const data = (await res.json()) as {
      data?: { id?: string; attributes?: { id?: string } };
      id?: string;
    };
    requestId =
      data?.data?.id ||
      data?.data?.attributes?.id ||
      data?.id ||
      requestId;
  } catch {
    /* keep fallback */
  }

  return { requestId: String(requestId) };
}
