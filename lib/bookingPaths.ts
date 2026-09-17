/** Thank-you URL for a hospital slug (root site uses /thank-you). */
export function getThankYouPath(slug?: string | null): string {
  if (!slug || slug === "banashankari") {
    return "/thank-you";
  }
  return `/${slug}/thank-you`;
}

/** Landing home URL for a hospital slug. */
export function getHospitalHomePath(slug?: string | null): string {
  if (!slug || slug === "banashankari") {
    return "/";
  }
  return `/${slug}`;
}
