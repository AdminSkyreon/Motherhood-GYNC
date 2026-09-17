const basePath = process.env.PAGES_BASE_PATH || "";
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_LEAD_MOCK: process.env.NEXT_PUBLIC_LEAD_MOCK || "",
    NEXT_PUBLIC_LEAD_PROXY: process.env.NEXT_PUBLIC_LEAD_PROXY || "",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "",
    NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED || "",
    NEXT_PUBLIC_CONVERSION_EVENT: process.env.NEXT_PUBLIC_CONVERSION_EVENT || "",
  },
};

export default nextConfig;
