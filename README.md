# Motherhood-GYNC

Hospital gynaecology landing pages (Next.js static export).

**Live site:** [https://adminskyreon.github.io/Motherhood-GYNC/](https://adminskyreon.github.io/Motherhood-GYNC/)

Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and commits `index.html` + assets to the repo root (with `.nojekyll`) so GitHub Pages serves the app instead of this README. If the live URL still shows this file, open **Actions**, confirm the latest deploy workflow succeeded, wait a minute, then hard-refresh.

---

## Lead submissions (SimpleCRM)

| Deploy mode | Env | Behavior |
|-------------|-----|----------|
| GitHub Pages (CI) | `NEXT_STATIC_EXPORT=true`, `NEXT_PUBLIC_LEAD_MOCK=true` | Static site; forms use mock submit (~1.2s), no `/api/leads` |
| Server Next (production CRM) | `NEXT_PUBLIC_LEAD_PROXY=true`, `SIMPLECRM_*` on server | Browser → `POST {basePath}/api/leads` → SimpleCRM |
| Static + direct endpoint | `lead.endpoint` in hospital JSON | Browser POSTs to public URL (only if CRM allows it) |

Hospital CRM fields live in `data/hospitals/{slug}.json` under `sections.booking.lead` (`unitnameC`, `formCampaignName`, `campaignDefaults`, etc.). UTM/gclid values come from the page URL at submit time.

After validation, users always reach thank-you (CRM errors are logged server-side). Env template: [`docs/lead-env.example`](docs/lead-env.example).

| SimpleCRM field | Source |
|-----------------|--------|
| `unitname_c`, `form_enquirytype_c`, `form_campaign_name_c`, `enquiry_source_c`, `website` | `booking.lead` in hospital JSON |
| `utm_*`, `gclid`, `campaignid`, `adgroupid`, `keyword` | URL query at submit (+ `lead.campaignDefaults` fallback) |
| `last_name`, `phone_mobile`, `description` | Form (name, mobile, language) |
| `source_url_c`, `preferred_appointment_date_c` | `meta.pageUrl`, submit date |
| OAuth credentials | `SIMPLECRM_*` server env only |

If HTML is on Pages but the API runs elsewhere, route `{basePath}/api/*` to the Node host via your CDN/reverse proxy so proxy mode stays same-origin.

## Analytics (GA4 via GTM)

| Layer | Behavior |
|-------|----------|
| All pages | [`GoogleTagManager`](components/GoogleTagManager.tsx) in root layout loads container `NEXT_PUBLIC_GTM_ID` (default `GTM-WFR5ZZMC`) with `lazyOnload`. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=false` to disable. |
| Landing | No custom `dataLayer` pushes — page views / tags fire from GTM (GA4 Configuration tag). |
| After successful submit | [`saveBookingConfirmation`](lib/booking-confirmation.ts) stores `requestId` in `sessionStorage` (`motherhood-booking-ref:{slug}`). |
| Thank-you | [`ThankYouConversionTracker`](components/ThankYouConversionTracker.tsx) consumes that token once; if missing, redirects to home. If present, pushes `generate_lead` (or `NEXT_PUBLIC_CONVERSION_EVENT`) via [`pushToDataLayer`](lib/gtm.ts). Map that event to GA4 / Google Ads inside GTM. |

Reference property IDs (for GTM setup, not injected by the app): GA4 `G-6L9WVG3E8N`, Ads `AW-871619659` — see [`lib/analytics-config.ts`](lib/analytics-config.ts).

## Development

This is a [Next.js](https://nextjs.org) app with **TypeScript** (`tsconfig.json`). Source lives under `app/`, `components/`, and `lib/` as `.ts` / `.tsx`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
