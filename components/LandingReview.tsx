"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CAROUSEL_CARD_CLICK_PAUSE_MS,
  useInfiniteAutoScroll,
} from "@/lib/useInfiniteAutoScroll";

const AUTO_SCROLL_PX_PER_SEC = 28;

function RatingBadge({ label, rating, reviewCount, children }) {
  return (
    <div className="landing-reviews-badge">
      <div className="landing-reviews-badge__icon">{children}</div>
      <p className="landing-reviews-badge__copy">
        <span className="landing-reviews-badge__star" aria-hidden="true">
          ★
        </span>{" "}
        <span className="landing-reviews-badge__rating">{rating}</span>{" "}
        <span className="landing-reviews-badge__meta">
          {label} · {reviewCount} reviews
        </span>
      </p>
    </div>
  );
}

function ReviewCard({ item, isExpanded, onExpand, onCollapse, onCardClick }) {
  const [truncated, setTruncated] = useState(false);
  const hadOverflowRef = useRef(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    const measure = () => {
      if (isExpanded) return;
      const overflow = el.scrollHeight > el.clientHeight + 2;
      if (overflow) hadOverflowRef.current = true;
      setTruncated(overflow);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.review, isExpanded]);

  const showReadMore = truncated && !isExpanded;
  const showReadLess = isExpanded && hadOverflowRef.current;

  return (
    <article
      className={`landing-reviews-card${isExpanded ? " landing-reviews-card--expanded" : ""}`}
      onClick={() => onCardClick?.()}
    >
      <div className="landing-reviews-card__head">
        <div className="min-w-0">
          <h3 className="landing-reviews-card__name">{item.name}</h3>
          <p className="landing-reviews-card__subtitle">{item.subtitle}</p>
        </div>
        <div className="landing-reviews-card__stars" aria-label={`${item.rating || 5} stars`}>
          {[...Array(item.rating || 5)].map((_, i) => (
            <span key={i} aria-hidden="true">
              ★
            </span>
          ))}
        </div>
      </div>

      <div
        className={`landing-reviews-card__body${
          showReadMore ? " landing-reviews-card__body--clamp" : ""
        }${isExpanded ? " landing-reviews-card__body--expanded" : ""}`}
      >
        <p
          ref={quoteRef}
          className={`landing-reviews-card__quote${
            isExpanded ? " landing-reviews-card__quote--expanded" : ""
          }`}
        >
          &ldquo;{item.review}&rdquo;
        </p>

        {showReadMore && (
          <button
            type="button"
            className="landing-reviews-card__readmore"
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.();
            }}
          >
            Read more
          </button>
        )}

        {showReadLess && (
          <button
            type="button"
            className="landing-reviews-card__readmore landing-reviews-card__readmore--less"
            onClick={(e) => {
              e.stopPropagation();
              onCollapse?.();
            }}
          >
            Read less
          </button>
        )}
      </div>
    </article>
  );
}

function ReviewsScrollCarousel({
  items,
  expandedCardId,
  onExpand,
  onCollapse,
}) {
  const enableAutoScroll = items.length > 1;

  const { scrollRef, pauseAfterUserScroll, pointerHandlers } = useInfiniteAutoScroll({
    enabled: enableAutoScroll,
    pxPerSec: AUTO_SCROLL_PX_PER_SEC,
    itemCount: items.length,
  });

  const onCardClick = useCallback(() => {
    pauseAfterUserScroll(CAROUSEL_CARD_CLICK_PAUSE_MS);
  }, [pauseAfterUserScroll]);

  const displayItems = enableAutoScroll
    ? [...items, ...items, ...items]
    : items;

  return (
    <div className="landing-reviews-scroll-wrap">
      <div
        ref={scrollRef}
        className={`landing-reviews-scroll-outer${
          enableAutoScroll ? " landing-reviews-scroll-outer--auto" : ""
        }`}
        {...pointerHandlers}
        role="region"
        aria-label="Patient reviews"
        tabIndex={0}
      >
        <div className="landing-reviews-scroll-track">
          {displayItems.map((item, index) => {
            const cardId = `review-${index}`;
            return (
              <ReviewCard
                key={cardId}
                item={item}
                isExpanded={expandedCardId === cardId}
                onExpand={() => onExpand(cardId)}
                onCollapse={onCollapse}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function LandingReview({ reviews }) {
  if (!reviews || !reviews.enabled) return null;

  const reviewItems = reviews.items || [];
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleExpand = useCallback((cardId) => {
    setExpandedCardId(cardId);
  }, []);

  const handleCollapse = useCallback(() => {
    setExpandedCardId(null);
  }, []);

  return (
    <section className="landing-reviews-section py-5 md:py-7">
      <div className="landing-reviews-inner landing-section-inner">
        <div className="landing-reviews-header">
          <h2 className="landing-reviews-header__title section-title-mh section-title-mh--ink">
            {reviews.title}
          </h2>

          <div className="landing-reviews-badges">
            {reviews.google && (
              <RatingBadge
                label="Google"
                rating={reviews.google.rating}
                reviewCount={reviews.google.reviewCount}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.2v3.15C3.17 21.32 7.23 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.2C.44 8.12 0 9.87 0 11.7s.44 3.58 1.2 5.12l4.08-2.55z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.2 6.58l4.08 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </RatingBadge>
            )}

            {reviews.practo && (
              <RatingBadge
                label="Practo"
                rating={reviews.practo.rating}
                reviewCount={reviews.practo.reviewCount}
              >
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A5EC]" />
                  <span className="text-[#13293D] font-black text-sm tracking-tighter">p</span>
                </div>
              </RatingBadge>
            )}
          </div>
        </div>
      </div>

      <ReviewsScrollCarousel
        items={reviewItems}
        expandedCardId={expandedCardId}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
      />
    </section>
  );
}
