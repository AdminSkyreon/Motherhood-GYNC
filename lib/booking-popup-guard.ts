/** Fired when the user engages the in-page (hero) booking form — suppresses timed popup. */
export const HERO_BOOKING_FORM_ENGAGED_EVENT = "mh:hero-booking-form-engaged";

let heroFormEngaged = false;

export function isHeroBookingFormEngaged(): boolean {
  return heroFormEngaged;
}

export function markHeroBookingFormEngaged(): void {
  if (typeof window === "undefined") return;
  if (heroFormEngaged) return;
  heroFormEngaged = true;
  window.dispatchEvent(new CustomEvent(HERO_BOOKING_FORM_ENGAGED_EVENT));
}
