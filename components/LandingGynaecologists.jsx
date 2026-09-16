"use client";

import { useCallback, useEffect, useRef } from "react";
import { assetPath } from "@/lib/assetPath";

const PAUSE_MS = 7000;
const AUTO_SCROLL_PX_PER_SEC = 32;
const DRAG_THRESHOLD_PX = 8;
/** Ignore scroll events this long after we moved scrollLeft (avoids treating auto-scroll as user scroll). */
const AUTO_SCROLL_IGNORE_MS = 80;

function scrollToBooking() {
  const bookingSection = document.getElementById("booking");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

function DoctorCard({ doctor, onCardInteract }) {
  return (
    <article
      className="doctor-card-mh"
      onPointerDown={() => onCardInteract?.()}
    >
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
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const rafRef = useRef(null);
  const lastFrameRef = useRef(0);
  const lastAutoScrollAtRef = useRef(0);
  const visibleRef = useRef(true);
  const dragStartRef = useRef(null);

  const pauseAutoScroll = useCallback(() => {
    if (!enableAutoScroll) return;
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
      resumeTimerRef.current = null;
    }, PAUSE_MS);
  }, [enableAutoScroll]);

  const onCardInteract = useCallback(() => {
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  useEffect(() => {
    if (!enableAutoScroll) return;

    const el = scrollRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    io.observe(el);

    const onScroll = () => {
      if (performance.now() - lastAutoScrollAtRef.current < AUTO_SCROLL_IGNORE_MS) {
        return;
      }
      pauseAutoScroll();
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    lastFrameRef.current = performance.now();

    const tick = (now) => {
      const deltaMs = Math.min(now - lastFrameRef.current, 48);
      lastFrameRef.current = now;

      if (visibleRef.current && !pausedRef.current && el.scrollWidth > el.clientWidth + 2) {
        lastAutoScrollAtRef.current = performance.now();
        el.scrollLeft += (AUTO_SCROLL_PX_PER_SEC * deltaMs) / 1000;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half - 2) {
          el.scrollLeft -= half;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [enableAutoScroll, pauseAutoScroll]);

  const onPointerDown = (e) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    const start = dragStartRef.current;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    if (dx >= DRAG_THRESHOLD_PX && dx > dy) {
      pauseAutoScroll();
      dragStartRef.current = null;
    }
  };

  const onPointerUp = () => {
    dragStartRef.current = null;
  };

  const displayItems = enableAutoScroll ? [...items, ...items] : items;

  return (
    <div className="doctors-scroll-wrap">
      <div
        ref={scrollRef}
        className={`doctors-scroll-outer${enableAutoScroll ? " doctors-scroll-outer--auto" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
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
      <div className="gynaecologists-section__inner mx-auto max-w-[1160px]">
        <h2 className="section-title-mh section-title-mh--ink px-4">
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
