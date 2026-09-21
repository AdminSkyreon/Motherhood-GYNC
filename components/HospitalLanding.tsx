import Header from "@/components/Header";
import LandingHeroSection from "@/components/LandingHeroSection";
import LandingFeaturesBar from "@/components/LandingFeaturesBar";
import LandingSymptoms from "@/components/LandingSymptoms";
import LandingGynaecologyServices from "@/components/LandingGynaecologyServices";
import LandingGynaecologists from "@/components/LandingGynaecologists";
import LandingWhyChooseUs from "@/components/LandingWhyChooseUs";
import LandingWomanhoodLifecycle from "@/components/LandingWomanhoodLifecycle";
import LandingFaq from "@/components/LandingFaq";
import LandingReview from "@/components/LandingReview";
import LandingLocation from "@/components/LandingLocation";
import LandingFooter from "@/components/LandingFooter";
import { getHospitalHomePath } from "@/lib/bookingPaths";
import ThankYouScrollToBooking from "@/components/ThankYouScrollToBooking";
import ThankYouConversionTracker from "@/components/ThankYouConversionTracker";
import BookingFormScrollPopup from "@/components/BookingFormScrollPopup";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingVerticalBookNow from "@/components/FloatingVerticalBookNow";

export default function HospitalLanding({ hospital, thankYouMode = false }) {
  const {
    site,
    banner,
    booking,
    reviews,
    featuresBar,
    symptoms,
    gynaecologyServices,
    gynaecologists,
    whyChooseUs,
    womanhoodLifecycle,
    faqs,
    location,
  } = hospital.sections;

  const backHref = getHospitalHomePath(site?.slug);

  return (
    <main
      className={`min-h-screen bg-mh-pink-soft/40 text-mh-ink${thankYouMode ? "" : " landing-main--mobile-cta"}`}
    >
      {thankYouMode ? (
        <>
          <ThankYouConversionTracker slug={site?.slug} />
          <ThankYouScrollToBooking />
        </>
      ) : null}
      <Header site={site} />
      <LandingHeroSection
        banner={banner}
        site={site}
        booking={booking}
        thankYouMode={thankYouMode}
        backHref={backHref}
      />
      <LandingFeaturesBar features={featuresBar} />
      <LandingSymptoms data={symptoms} />

      {gynaecologyServices?.enabled && (
        <LandingGynaecologyServices data={gynaecologyServices} />
      )}

      {gynaecologists?.enabled && (
        <LandingGynaecologists data={gynaecologists} />
      )}

      {whyChooseUs?.enabled && <LandingWhyChooseUs data={whyChooseUs} />}

      {womanhoodLifecycle?.enabled && (
        <LandingWomanhoodLifecycle data={womanhoodLifecycle} />
      )}

      {faqs?.enabled && <LandingFaq data={faqs} />}

      {reviews?.enabled && <LandingReview reviews={reviews} />}

      {location?.enabled && (
        <LandingLocation
          locationData={location}
          hospitalName={site?.hospitalName}
          phone={site?.phone}
        />
      )}

      <LandingFooter data={hospital} />

      {!thankYouMode && (
        <>
          <FloatingVerticalBookNow />
          <MobileStickyCTA phone={site?.phone} />
          <BookingFormScrollPopup
            booking={booking}
            site={site}
            thankYouMode={thankYouMode}
            backHref={backHref}
          />
        </>
      )}
    </main>
  );
}
