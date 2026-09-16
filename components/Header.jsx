import { assetPath } from "@/lib/assetPath";

export default function Header({ site }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-2 bg-white px-3 py-2.5 shadow-md sm:gap-4 sm:px-6 sm:py-3 lg:px-12">
      <div className="flex min-w-0 flex-1 items-center">
        {site.assets?.logoSrc ? (
          <img
            src={assetPath(site.assets.logoSrc)}
            alt={site.hospitalName}
            className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-[72px]"
          />
        ) : (
          <span className="truncate text-xl font-bold text-mh-blue sm:text-2xl">
            {site.hospitalName}
          </span>
        )}
      </div>
      <a
        href={`tel:${site.phone.tel}`}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-mh-pink px-3 py-2 text-[13px] font-semibold text-white shadow transition hover:opacity-90 font-['Montserrat',sans-serif] sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-base lg:px-6 lg:text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 shrink-0 fill-current sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.18-3.71-6.55-6.55l1.96-1.57c.27-.27.36-.67.25-1.01A11.36 11.36 0 018.6 3.99c0-.55-.45-1-1-1H4.06c-.55 0-1 .45-1 1C3.06 13.45 11.55 21.94 21.64 22c.55 0 1-.45 1-1v-3.56c0-.55-.45-1-1-1z" />
        </svg>
        {site.phone.display}
      </a>
    </header>
  );
}
