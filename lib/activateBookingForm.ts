import type { MouseEvent } from "react";

export type BookingFormTarget = "hero" | "popup";

export const BOOKING_POPUP_REQUEST_EVENT = "mh:booking-popup-request";

const ENGAGE_MS = 4500;

function isMobileBookingViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

function clearEngageTimer(shell: Element | null, timerId: number) {
  window.clearTimeout(timerId);
  shell?.classList.remove("booking-form-shell--engaged");
}

export function focusBookingFormInput(root: ParentNode): boolean {
  const input = root.querySelector<HTMLInputElement>(
    'input[name="name"]:not([disabled])',
  );
  if (!input) return false;

  try {
    input.focus({ preventScroll: true });
  } catch {
    input.focus();
  }

  // Helps mobile Safari/Chrome treat the field as active for the keyboard.
  if (typeof input.setSelectionRange === "function") {
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }

  return true;
}

export function highlightBookingShell(root: ParentNode): void {
  const shell = root.querySelector(".booking-form-shell");
  if (!shell) return;

  shell.classList.add("booking-form-shell--engaged");
  const timerId = window.setTimeout(() => {
    shell.classList.remove("booking-form-shell--engaged");
  }, ENGAGE_MS);

  const input = root.querySelector('input[name="name"]');
  const onBlur = () => clearEngageTimer(shell, timerId);
  input?.addEventListener("blur", onBlur, { once: true });
}

/**
 * Scroll (hero), highlight card, and focus name field — call from a click handler when possible
 * so iOS opens the keyboard.
 */
export function activateBookingForm(target: BookingFormTarget): boolean {
  if (typeof document === "undefined") return false;

  const root = document.querySelector(`[data-booking-form="${target}"]`);
  if (!root) return false;

  if (target === "hero") {
    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  highlightBookingShell(root);
  return focusBookingFormInput(root);
}

/** After popup DOM is visible — use rAF from the component that set open=true. */
export function activateBookingFormAfterOpen(target: BookingFormTarget): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      activateBookingForm(target);
    });
  });
}

/**
 * Book Now / Book Appointment — mobile opens popup + focuses popup form;
 * desktop scrolls to hero form.
 */
export function handleBookNowClick(event: MouseEvent<HTMLElement>): void {
  event.preventDefault();
  requestBookingFormActivation();
}

/** Support plain DOM handlers (e.g. doctor cards). */
export function handleBookNowActivate(): void {
  requestBookingFormActivation();
}

export function requestBookingFormActivation(): void {
  if (isMobileBookingViewport()) {
    window.dispatchEvent(new CustomEvent(BOOKING_POPUP_REQUEST_EVENT));
    return;
  }
  activateBookingForm("hero");
}
