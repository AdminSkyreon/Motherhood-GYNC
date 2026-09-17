const STORAGE_PREFIX = "motherhood-booking-ref:";

export function bookingConfirmationKey(slug?: string | null): string {
  const id = slug && slug.length > 0 ? slug : "banashankari";
  return `${STORAGE_PREFIX}${id}`;
}

export function saveBookingConfirmation(slug: string | undefined, requestId: string): void {
  if (typeof sessionStorage === "undefined" || !requestId) return;
  try {
    sessionStorage.setItem(bookingConfirmationKey(slug), requestId);
  } catch {
    /* private mode / quota */
  }
}

/** Read once and remove — returns null if no pending confirmation. */
export function consumeBookingConfirmation(slug?: string | null): string | null {
  if (typeof sessionStorage === "undefined") return null;
  const key = bookingConfirmationKey(slug);
  try {
    const value = sessionStorage.getItem(key);
    if (value) sessionStorage.removeItem(key);
    return value;
  } catch {
    return null;
  }
}
