import { buildLeadRequestBody, buildLeadSubmitContext } from "@/lib/lead-payload";
import type { LeadSubmitInput, SubmitLeadResult } from "@/lib/lead-types";
import type { LeadSubmitRequestBody } from "@/lib/lead-schema";

const MOCK_DELAY_MS = 1200;

function getBasePath(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-base-path") || "";
  }
  return "";
}

function isTruthyEnv(value: string | undefined): boolean {
  return value === "true" || value === "1";
}

function syntheticRequestId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function mockSubmit(): Promise<SubmitLeadResult> {
  await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
  return { requestId: syntheticRequestId() };
}

async function proxySubmit(payload: LeadSubmitRequestBody): Promise<SubmitLeadResult> {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  let data: { error?: string; requestId?: string } = {};
  try {
    data = (await response.json()) as typeof data;
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || "Lead submission failed");
  }

  return { requestId: data.requestId || syntheticRequestId() };
}

async function directEndpointSubmit(
  ctx: ReturnType<typeof buildLeadSubmitContext>,
  leadConfig: LeadSubmitInput["lead"],
): Promise<SubmitLeadResult> {
  const endpoint = leadConfig?.endpoint;
  if (!endpoint) return mockSubmit();

  const body = buildLeadRequestBody(ctx, leadConfig);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(leadConfig.headers && typeof leadConfig.headers === "object" ? leadConfig.headers : {}),
  };

  let url = endpoint;
  if (leadConfig.queryParams && typeof leadConfig.queryParams === "object") {
    const u = new URL(url, typeof window !== "undefined" ? window.location.origin : undefined);
    for (const [k, v] of Object.entries(leadConfig.queryParams)) {
      if (v != null && v !== "") u.searchParams.set(k, String(v));
    }
    url = u.toString();
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Lead submission failed");
  }

  let requestId = syntheticRequestId();
  try {
    const data = (await response.json()) as { requestId?: string; id?: string };
    requestId = data.requestId || data.id || requestId;
  } catch {
    /* ignore */
  }

  return { requestId };
}

export async function submitLead(input: LeadSubmitInput): Promise<SubmitLeadResult> {
  const ctx = buildLeadSubmitContext(input);
  const payload: LeadSubmitRequestBody = {
    form: ctx.form,
    lead: ctx.lead,
    hospital: ctx.hospital,
    campaign: ctx.campaign,
    meta: ctx.meta,
  };

  if (isTruthyEnv(process.env.NEXT_PUBLIC_LEAD_MOCK)) {
    return mockSubmit();
  }

  if (isTruthyEnv(process.env.NEXT_PUBLIC_LEAD_PROXY)) {
    return proxySubmit(payload);
  }

  if (input.lead?.endpoint) {
    return directEndpointSubmit(ctx, input.lead);
  }

  return mockSubmit();
}
