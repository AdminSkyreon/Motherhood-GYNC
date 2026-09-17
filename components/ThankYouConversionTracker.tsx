"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { consumeBookingConfirmation } from "@/lib/booking-confirmation";
import { buildLeadConversionPayload, isAnalyticsEnabled } from "@/lib/analytics-config";
import { pushToDataLayer } from "@/lib/gtm";
import { getHospitalHomePath } from "@/lib/bookingPaths";

type ThankYouConversionTrackerProps = {
  slug?: string | null;
};

export default function ThankYouConversionTracker({ slug }: ThankYouConversionTrackerProps) {
  const router = useRouter();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const requestId = consumeBookingConfirmation(slug);
    if (!requestId) {
      router.replace(getHospitalHomePath(slug));
      return;
    }

    if (isAnalyticsEnabled()) {
      pushToDataLayer(buildLeadConversionPayload(slug || "banashankari", requestId));
    }
  }, [slug, router]);

  return null;
}
