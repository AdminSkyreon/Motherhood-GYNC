import type { SiteSection } from "@/lib/hospital-data";
import type { HospitalLeadContext } from "@/lib/lead-types";

export function hospitalToLeadContext(
  site: SiteSection | null | undefined,
  slugOverride?: string,
): HospitalLeadContext {
  if (!site || typeof site !== "object") {
    return { slug: slugOverride || "", hospitalName: "", address: "", phone: {}, brand: "Motherhood" };
  }

  return {
    slug: slugOverride || site.slug || "",
    hospitalName: site.hospitalName || "",
    hospitalShortName: site.hospitalShortName,
    regionLabel: site.regionLabel,
    address: site.address || "",
    phone: site.phone || {},
    brand: "Motherhood",
  };
}
