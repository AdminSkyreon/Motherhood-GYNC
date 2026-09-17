import { buildLeadRequestBody } from "@/lib/lead-payload";
import type { LeadUpstreamConfig } from "@/lib/lead-server-env";
import { fallbackRequestId } from "@/lib/simplecrm";
import type { HospitalLeadConfig, LeadSubmitContext } from "@/lib/lead-types";

export async function forwardLeadToUpstream(
  ctx: LeadSubmitContext,
  leadConfig: HospitalLeadConfig | undefined,
  upstream: LeadUpstreamConfig,
) {
  const body = buildLeadRequestBody(ctx, leadConfig);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(upstream.headers || {}),
  };
  if (upstream.authorization) {
    headers.Authorization = upstream.authorization;
  }

  let url = upstream.endpoint;
  if (leadConfig?.queryParams && typeof leadConfig.queryParams === "object") {
    const u = new URL(url);
    for (const [k, v] of Object.entries(leadConfig.queryParams)) {
      if (v != null && v !== "") u.searchParams.set(k, String(v));
    }
    url = u.toString();
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upstream lead failed (${res.status}): ${text.slice(0, 300)}`);
  }

  let requestId = fallbackRequestId("lead");
  try {
    const data = (await res.json()) as { requestId?: string; id?: string };
    requestId = data.requestId || data.id || requestId;
  } catch {
    /* non-json ok */
  }

  return { requestId: String(requestId) };
}
