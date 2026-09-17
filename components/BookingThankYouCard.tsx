import { assetPath } from "@/lib/assetPath";

const shellClass =
  "booking-form-shell booking-flip-scene--stacked-fit mx-auto w-full max-w-none lg:max-w-[360px] lg:ml-auto lg:mr-0";

export default function BookingThankYouCard({ thankYou, embedded = false }) {
  const imageSrc = thankYou?.imageSrc || "/motherhood_logo.png";
  const title = thankYou?.title || "Thank you!";
  const message =
    thankYou?.message ||
    "Our care team will contact you shortly to confirm your consultation.";

  const content = (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-28 w-28 sm:h-32 sm:w-32">
        <img src={assetPath(imageSrc)} alt="" className="h-full w-full object-contain" />
      </div>
      <h3 className="text-lg font-extrabold leading-snug text-mh-blue font-['Montserrat',sans-serif] sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-mh-ink font-['Montserrat',sans-serif]">
        {message}
      </p>
    </div>
  );

  if (embedded) return content;
  return <div className={shellClass}>{content}</div>;
}
