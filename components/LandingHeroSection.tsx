import { assetPath } from "@/lib/assetPath";
import BookingFormCard from "@/components/BookingFormCard";
import BookingThankYouCard from "@/components/BookingThankYouCard";
import { getHospitalHomePath } from "@/lib/bookingPaths";

/** Shared hero typography (headline lines + form body) */
const heroLineClass =
  "block text-[26px] font-extrabold leading-[1.22] sm:text-[30px] sm:leading-[1.2] lg:text-[34px] lg:leading-[1.18] xl:text-[36px]";

function HeroHeadline({ banner }) {
  const lines = banner?.taglineLines?.length
    ? banner.taglineLines
    : ["Expert Gynaecology", "Care for Every Stage of a Woman's Life"];
  const emphasis = banner?.taglineEmphasisWord || "Woman's Life";

  return (
    <h1 className="mx-auto flex w-full max-w-full flex-col gap-1.5 text-center font-extrabold tracking-tight text-mh-blue font-['Montserrat',sans-serif] [text-shadow:0_1px_10px_rgba(255,255,255,0.85)] lg:mx-0 lg:max-w-none lg:text-left lg:[text-shadow:0_1px_14px_rgba(255,255,255,0.9)]">
      {lines.map((line, index) => {
        const hasEmphasis = emphasis && line.includes(emphasis);
        const [before, after] = hasEmphasis ? line.split(emphasis) : [line, ""];

        return (
          <span key={index} className={heroLineClass}>
            {before}
            {hasEmphasis ? (
              <span className="italic text-mh-pink">{emphasis}</span>
            ) : null}
            {after}
          </span>
        );
      })}
    </h1>
  );
}

export default function LandingHeroSection({ banner, site, booking, thankYouMode = false, backHref = "/" }) {
  const form = booking?.bookingForm || {};
  const thankYou = booking?.thankYou || {};
  const homeHref = backHref || getHospitalHomePath(site?.slug);
  const formTitle = form.title || "Book Your Gynaecology Consultation";
  const subtext = form.subtext;
  const languages = form.languages || [];
  const ctaLabel = form.ctaLabel || "Book My Consultation";
  const privacyText =
    form.privacyText ||
    "Your information stays private and is only used for appointment assistance.";

  // Subtitle fallback: banner ka subtitle ya site ka hospital name automatisch
  const subtitle = banner?.subtitle || site?.hospitalName || (site?.regionLabel ? `Motherhood Hospital ${site.regionLabel}` : "");

  const heroSrc = site.assets?.heroImageSrc;
  const heroImgClass =
    "h-full w-full scale-[1.12] object-cover object-[center_32%] sm:scale-[1.16] lg:scale-[1.2]";
  /** Desktop full-bleed background — focal point slightly higher than mobile stack */
  const heroImgClassDesktop =
    "h-full w-full object-cover object-[center_22%] scale-[1.2] lg:-translate-y-[2%]";

  const formCard = thankYouMode ? (
    <BookingThankYouCard thankYou={thankYou} backHref={homeHref} />
  ) : (
    <BookingFormCard
      hospitalSlug={site?.slug}
      site={site}
      lead={booking?.lead}
      formTitle={formTitle}
      subtext={subtext}
      languages={languages}
      ctaLabel={ctaLabel}
      privacyText={privacyText}
      thankYou={thankYou}
      backHref={homeHref}
    />
  );

  return (
    <section id="booking" className="hero-banner-bg relative overflow-hidden lg:min-h-[440px]">
      {heroSrc ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          aria-hidden="true"
        >
          <img src={assetPath(heroSrc)} alt="" className={heroImgClassDesktop} />
          <div className="absolute inset-y-0 left-0 w-[48%] max-w-lg bg-gradient-to-r from-white/45 to-transparent" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-0 sm:px-6 lg:px-12 lg:py-6">
        <div className="flex flex-col gap-0 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
          {heroSrc ? (
            <div className="relative order-1 -mx-4 sm:-mx-6 lg:hidden">
              <div className="relative h-[340px] overflow-hidden sm:h-[380px]">
                <img
                  src={assetPath(heroSrc)}
                  alt=""
                  className={`${heroImgClass} scale-[1.18] object-[center_26%] sm:scale-[1.2] sm:object-[center_30%]`}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[#fafafa]/65 to-[var(--hero-wall)] sm:h-52"
                  aria-hidden="true"
                />
              </div>
            </div>
          ) : null}

          <div
            className={`relative order-2 z-10 w-full px-2 sm:px-3 lg:order-none lg:col-span-5 lg:px-0 lg:py-2 lg:pr-4 ${
              heroSrc ? "-mt-[5.75rem] sm:-mt-28 lg:mt-0" : ""
            }`}
          >
            <HeroHeadline banner={banner} />
          </div>

          <div className="hidden lg:order-none lg:col-span-3 lg:block" aria-hidden="true" />

          <div className="relative z-20 order-3 mt-4 w-full min-w-0 lg:order-none lg:col-span-4 lg:mt-0 lg:flex lg:justify-end">
            {formCard}
          </div>
        </div>

        {/* Hero Section ke bottom-left me 'N' badge ke paas light grey aur patla subtitle */}
        {subtitle ? (
          <div className="mt-4 lg:mt-2 text-left">
            <span className="text-[11px] font-light tracking-wide text-gray-400 sm:text-xs">
              {subtitle}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}