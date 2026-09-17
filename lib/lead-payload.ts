import { normalizeIndianMobile } from "@/lib/phone";
import type {
  HospitalLeadConfig,
  LeadSubmitContext,
  LeadSubmitInput,
} from "@/lib/lead-types";

function formatDescription(form: LeadSubmitInput["form"]): string {
  const parts: string[] = [];
  if (form?.language) parts.push(`Preferred language: ${form.language}`);
  if (form?.comment) parts.push(String(form.comment));
  return parts.join("\n") || "";
}

function localDateString(isoOrDate?: string): string {
  const d = isoOrDate ? new Date(isoOrDate) : new Date();
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function buildLeadSubmitContext(input: LeadSubmitInput): LeadSubmitContext {
  const form = input.form || { name: "", mobile: "" };
  const lead = input.lead || {};
  const hospital = input.hospital;
  const campaign = input.campaign || {};
  const meta = input.meta || {};

  const phone = normalizeIndianMobile(form.mobile) || "";
  const submittedAt = meta.submittedAt || new Date().toISOString();

  return {
    form: {
      name: String(form.name || "").trim(),
      mobile: phone,
      language: form.language || "",
      comment: form.comment || "",
    },
    lead,
    hospital,
    campaign,
    meta: {
      pageUrl: meta.pageUrl || "",
      submittedAt,
      vertical: meta.vertical || "gynaecology",
      source: lead.source || "",
      hospitalId: lead.hospitalId || hospital.slug || "",
    },
    derived: {
      description: formatDescription(form),
      appointmentDate: localDateString(submittedAt),
    },
  };
}

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

function interpolateTemplate(str: string, ctx: unknown): string {
  return str.replace(/\{\{([^}]+)\}\}/g, (_, rawPath: string) => {
    const path = rawPath.trim();
    const val = getByPath(ctx, path);
    return val == null ? "" : String(val);
  });
}

function deepInterpolate(value: unknown, ctx: unknown): unknown {
  if (typeof value === "string") return interpolateTemplate(value, ctx);
  if (Array.isArray(value)) return value.map((v) => deepInterpolate(v, ctx));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = deepInterpolate(v, ctx);
    }
    return out;
  }
  return value;
}

export function templateContextFromSubmit(ctx: LeadSubmitContext) {
  return {
    form: ctx.form,
    lead: ctx.lead,
    hospital: ctx.hospital,
    campaign: ctx.campaign,
    meta: ctx.meta,
    derived: ctx.derived,
  };
}

export function buildLeadRequestBody(
  ctx: LeadSubmitContext,
  leadConfig?: HospitalLeadConfig,
): Record<string, unknown> {
  const templateCtx = templateContextFromSubmit(ctx);

  if (leadConfig?.payload && typeof leadConfig.payload === "object") {
    return deepInterpolate(leadConfig.payload, templateCtx) as Record<string, unknown>;
  }

  return {
    name: ctx.form.name,
    phone: ctx.form.mobile,
    language: ctx.form.language,
    hospitalId: ctx.meta.hospitalId,
    hospitalSlug: ctx.hospital.slug,
    hospitalName: ctx.hospital.hospitalName,
    source: ctx.meta.source,
    campaign: ctx.campaign,
    meta: ctx.meta,
    description: ctx.derived.description,
  };
}
