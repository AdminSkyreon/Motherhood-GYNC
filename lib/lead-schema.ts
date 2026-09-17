import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  mobile: z.string().min(1),
  language: z.string().optional(),
  comment: z.string().optional(),
});

const leadSchema = z.record(z.string(), z.unknown()).optional().default({});

const hospitalSchema = z
  .object({
    slug: z.string().optional(),
    hospitalName: z.string().optional(),
    address: z.string().optional(),
    phone: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough()
  .optional()
  .default({});

const campaignSchema = z.record(z.string(), z.unknown()).optional().default({});

const metaSchema = z
  .object({
    pageUrl: z.string().optional(),
    submittedAt: z.string().optional(),
    vertical: z.string().optional(),
  })
  .passthrough()
  .optional()
  .default({});

export const leadSubmitRequestSchema = z.object({
  form: formSchema,
  lead: leadSchema,
  hospital: hospitalSchema,
  campaign: campaignSchema,
  meta: metaSchema,
});

export type LeadSubmitRequestBody = z.infer<typeof leadSubmitRequestSchema>;
