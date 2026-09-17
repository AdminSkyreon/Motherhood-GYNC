import { NextResponse } from "next/server";
import { leadSubmitRequestSchema } from "@/lib/lead-schema";
import { buildLeadSubmitContext } from "@/lib/lead-payload";
import { normalizeIndianMobile } from "@/lib/phone";
import { isSimpleCrmConfigured, resolveLeadUpstream } from "@/lib/lead-server-env";
import { createSimpleCrmLead, fallbackRequestId } from "@/lib/simplecrm";
import { forwardLeadToUpstream } from "@/lib/forward-lead";
import type { HospitalLeadConfig } from "@/lib/lead-types";
import type { HospitalLeadContext } from "@/lib/lead-types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = leadSubmitRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { form, lead, hospital, campaign, meta } = parsed.data;
  const phone = normalizeIndianMobile(form.mobile);
  if (!phone) {
    return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
  }

  const ctx = buildLeadSubmitContext({
    form: { ...form, mobile: phone },
    lead: (lead || {}) as HospitalLeadConfig,
    hospital: (hospital || {}) as HospitalLeadContext,
    campaign: campaign as Record<string, string | undefined>,
    meta: meta || {},
  });

  const hospitalId = ctx.meta.hospitalId || ctx.hospital.slug || "";

  if (isSimpleCrmConfigured()) {
    try {
      const result = await createSimpleCrmLead(ctx, (lead || {}) as HospitalLeadConfig);
      return NextResponse.json({
        requestId: result.requestId ?? fallbackRequestId("crm"),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Lead submission failed";
      console.error("[api/leads] SimpleCRM error:", message);
      return NextResponse.json({ error: "Lead submission failed" }, { status: 502 });
    }
  }

  const upstream = resolveLeadUpstream(hospitalId);
  if (upstream) {
    try {
      const result = await forwardLeadToUpstream(ctx, (lead || {}) as HospitalLeadConfig, upstream);
      return NextResponse.json({ requestId: result.requestId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Lead submission failed";
      console.error("[api/leads] Upstream error:", message);
      return NextResponse.json({ error: "Lead submission failed" }, { status: 502 });
    }
  }

  return NextResponse.json({ error: "Lead API is not configured" }, { status: 503 });
}
