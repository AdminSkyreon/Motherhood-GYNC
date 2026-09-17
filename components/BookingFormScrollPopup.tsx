"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import BookingFormCard from "@/components/BookingFormCard";
import {
  BOOKING_POPUP_REQUEST_EVENT,
  activateBookingForm,
  activateBookingFormAfterOpen,
} from "@/lib/activateBookingForm";
import {
  HERO_BOOKING_FORM_ENGAGED_EVENT,
  isHeroBookingFormEngaged,
} from "@/lib/booking-popup-guard";

/** Seconds from hospital JSON `booking.popupDelaySeconds`; empty / invalid = no popup. */
export function resolvePopupDelayMs(booking) {
  const raw = booking?.popupDelaySeconds;
  if (raw === null || raw === undefined || raw === "") return null;
  const seconds = Number(raw);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  return seconds * 1000;
}

export default function BookingFormScrollPopup({ booking, site, thankYouMode, backHref }) {
  const delayMs = resolvePopupDelayMs(booking);
  const [open, setOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  const suppressAutoPopupRef = useRef(isHeroBookingFormEngaged());
  const autoPopupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerPopup = useCallback(() => {
    if (delayMs === null) return;
    if (hasTriggeredRef.current) return;
    if (suppressAutoPopupRef.current || isHeroBookingFormEngaged()) return;
    hasTriggeredRef.current = true;
    setOpen(true);
  }, [delayMs]);

  useEffect(() => {
    const suppressAutoPopup = () => {
      suppressAutoPopupRef.current = true;
      if (autoPopupTimeoutRef.current) {
        window.clearTimeout(autoPopupTimeoutRef.current);
        autoPopupTimeoutRef.current = null;
      }
    };
    window.addEventListener(HERO_BOOKING_FORM_ENGAGED_EVENT, suppressAutoPopup);
    return () => window.removeEventListener(HERO_BOOKING_FORM_ENGAGED_EVENT, suppressAutoPopup);
  }, []);

  useEffect(() => {
    if (thankYouMode || delayMs === null) return;
    if (suppressAutoPopupRef.current || isHeroBookingFormEngaged()) return;

    autoPopupTimeoutRef.current = window.setTimeout(() => {
      triggerPopup();
    }, delayMs);

    return () => {
      if (autoPopupTimeoutRef.current) {
        window.clearTimeout(autoPopupTimeoutRef.current);
        autoPopupTimeoutRef.current = null;
      }
    };
  }, [thankYouMode, delayMs, triggerPopup]);

  const openedFromBookNowRef = useRef(false);

  useEffect(() => {
    const onBookNowRequest = () => {
      openedFromBookNowRef.current = true;
      flushSync(() => setOpen(true));
      activateBookingForm("popup");
    };
    window.addEventListener(BOOKING_POPUP_REQUEST_EVENT, onBookNowRequest);
    return () => window.removeEventListener(BOOKING_POPUP_REQUEST_EVENT, onBookNowRequest);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (openedFromBookNowRef.current) {
      openedFromBookNowRef.current = false;
      return;
    }
    activateBookingFormAfterOpen("popup");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (thankYouMode || delayMs === null) return null;

  const form = booking?.bookingForm || {};
  const thankYou = booking?.thankYou || {};

  return (
    <div
      className={`booking-popup-root${open ? " booking-popup-root--open" : ""}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="booking-popup-backdrop"
        aria-label="Close booking form"
        onClick={close}
        tabIndex={open ? 0 : -1}
      />
      <div
        className="booking-popup-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-popup-title"
      >
        <div className="booking-popup-panel__body">
          <button
            type="button"
            className="booking-popup-close"
            aria-label="Close"
            onClick={close}
          >
            ×
          </button>
          <BookingFormCard
            hospitalSlug={site?.slug}
            site={site}
            lead={booking?.lead}
            formTitle={form.title || "Book Your Gynaecology Consultation"}
            subtext={form.subtext}
            languages={form.languages || []}
            ctaLabel={form.ctaLabel || "Book My Consultation"}
            privacyText={
              form.privacyText ||
              "Your information stays private and is only used for appointment assistance."
            }
            thankYou={thankYou}
            backHref={backHref}
            layout="popup"
          />
        </div>
      </div>
    </div>
  );
}
