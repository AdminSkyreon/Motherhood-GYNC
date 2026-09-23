"use client";

import { useCallback } from "react";
import { assetPath } from "@/lib/assetPath";
import { handleBookNowActivate } from "@/lib/activateBookingForm";
import {
  CAROUSEL_CARD_CLICK_PAUSE_MS,
  useInfiniteAutoScroll,
} from "@/lib/useInfiniteAutoScroll";

const AUTO_SCROLL_PX_PER_SEC = 32;

function scrollToBooking() {
  handleBookNowActivate();
}

function DoctorCard({
  doctor,
  onCardInteract,
}: {
  doctor: Record<string, string | undefined>;
  onCardInteract?: () => void;
}) {
  return (
    <article className="doctor-card-mh" onClick={() => onCardInteract?.()}>
      <div className="doctor-avatar-ring">
        <div className="doctor-avatar-inner">
          <div className="doctor-avatar-fallback">{doctor.initials}</div>
          {doctor.image?.trim() ? (
            <img
              src={assetPath(doctor.image)}
              alt=""
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="doctor-avatar-photo"
            />
          ) : null}
        </div>
      </div>

      <h3 className="doctor-card-mh__name">{doctor.name}</h3>
      <p className="doctor-card-mh__qual">{doctor.qualification}</p>
      <p className="doctor-card-mh__role">{doctor.designation}</p>

      <p className="doctor-card-mh__location">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>{doctor.location}</span>
      </p>

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onCardInteract?.();
          scrollToBooking();
        }}
        className="doctor-card-mh__cta"
      >
        Book Appointment
      </button>
    </article>
  );
}

function DoctorsScrollCarousel({ items, enableAutoScroll }) {
  const { scrollRef, pauseAfterUserScroll, pointerHandlers } = useInfiniteAutoScroll({
    enabled: enableAutoScroll,
    pxPerSec: AUTO_SCROLL_PX_PER_SEC,
    itemCount: items.length,
  });

  const onCardInteract = useCallback(() => {
    pauseAfterUserScroll(CAROUSEL_CARD_CLICK_PAUSE_MS);
  }, [pauseAfterUserScroll]);

  const displayItems = enableAutoScroll
    ? [...items, ...items, ...items]
    : items;

  return (
    <div className="doctors-scroll-wrap doctors-scroll-wrap--bleed">
      <div
        ref={scrollRef}
        className={`doctors-scroll-outer${enableAutoScroll ? " doctors-scroll-outer--auto" : ""}`}
        {...pointerHandlers}
        role="region"
        aria-label="Doctors carousel"
        tabIndex={0}
      >
        <div className="doctors-scroll-track">
          {displayItems.map((doctor, index) => (
            <DoctorCard
              key={`${doctor.name}-${index}`}
              doctor={doctor}
              onCardInteract={onCardInteract}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorsStaticRow({ items }) {
  return (
    <div className="doctors-static-row">
      {items.map((doctor, index) => (
        <DoctorCard key={`${doctor.name}-${index}`} doctor={doctor} />
      ))}
    </div>
  );
}

export default function LandingGynaecologists({ data }) {
  if (!data || !data.enabled || !data.items?.length) return null;

  const items = data.items;
  const count = items.length;
  const mobileCarousel = count > 1;
  const desktopCarousel = count > 3;
  const mobileAutoScroll = count > 1;
  const desktopAutoScroll = count > 3;

  return (
    <section className="gynaecologists-section py-5 md:py-7">
      <div className="gynaecologists-section__inner landing-section-inner mx-auto max-w-[1160px]">
        <h2 className="section-title-mh section-title-mh--ink">
          {data.title}
        </h2>

        <div className="md:hidden">
          {mobileCarousel ? (
            <DoctorsScrollCarousel items={items} enableAutoScroll={mobileAutoScroll} />
          ) : (
            <DoctorsStaticRow items={items} />
          )}
        </div>

        <div className="hidden md:block">
          {desktopCarousel ? (
            <DoctorsScrollCarousel items={items} enableAutoScroll={desktopAutoScroll} />
          ) : (
            <DoctorsStaticRow items={items} />
          )}
        </div>
      </div>
    </section>
  );
}
