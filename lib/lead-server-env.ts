function envKey(base: string, hospitalId?: string): string {
  if (!hospitalId) return base;
  const suffix = String(hospitalId).replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
  return `${base}_${suffix}`;
}

export function isSimpleCrmConfigured(): boolean {
  const base = process.env.SIMPLECRM_BASE_URL;
  const clientId = process.env.SIMPLECRM_CLIENT_ID;
  const clientSecret = process.env.SIMPLECRM_CLIENT_SECRET;
  return Boolean(base && clientId && clientSecret);
}

export function getSimpleCrmEnv() {
  return {
    baseUrl: (process.env.SIMPLECRM_BASE_URL || "").replace(/\/$/, ""),
    clientId: process.env.SIMPLECRM_CLIENT_ID || "",
    clientSecret: process.env.SIMPLECRM_CLIENT_SECRET || "",
    username: process.env.SIMPLECRM_USERNAME || "",
    password: process.env.SIMPLECRM_PASSWORD || "",
  };
}

export type LeadUpstreamConfig = {
  endpoint: string;
  authorization: string;
  headers: Record<string, string>;
};

export function resolveLeadUpstream(hospitalId?: string): LeadUpstreamConfig | null {
  const endpoint =
    process.env[envKey("LEAD_API_ENDPOINT", hospitalId)] ||
    process.env.LEAD_API_ENDPOINT ||
    "";
  if (!endpoint) return null;

  const authorization =
    process.env[envKey("LEAD_API_AUTHORIZATION", hospitalId)] ||
    process.env.LEAD_API_AUTHORIZATION ||
    "";

  let headers: Record<string, string> = {};
  const headersJson =
    process.env[envKey("LEAD_API_HEADERS", hospitalId)] || process.env.LEAD_API_HEADERS || "";
  if (headersJson) {
    try {
      headers = JSON.parse(headersJson) as Record<string, string>;
    } catch {
      headers = {};
    }
  }

  return { endpoint, authorization, headers };
}
