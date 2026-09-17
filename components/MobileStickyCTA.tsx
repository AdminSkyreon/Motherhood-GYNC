import BookNowButton from "@/components/BookNowButton";

export default function MobileStickyCTA({ phone }) {
  const tel = phone?.tel || "08069549251";

  return (
    <div
      className="mobile-sticky-cta lg:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mobile-sticky-cta__inner">
        <BookNowButton className="mobile-sticky-cta__btn mobile-sticky-cta__btn--book" />
        <a
          href={`tel:${tel}`}
          className="mobile-sticky-cta__btn mobile-sticky-cta__btn--call"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
