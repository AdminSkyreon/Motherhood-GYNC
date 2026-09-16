"use client";

import { useState } from "react";
import { assetPath } from "@/lib/assetPath";

function ServiceIcon({ icon }) {
  return (
    <div className="service-icon-slot mb-2 w-full shrink-0 sm:mb-3">
      {icon ? (
        <img src={assetPath(icon)} alt="" className="service-icon-img" />
      ) : (
        <div className="h-16 w-16 rounded-full bg-mh-pink-soft" aria-hidden="true" />
      )}
    </div>
  );
}

function ServiceCardBody({ item, tapExpanded }) {
  return (
    <>
      <ServiceIcon icon={item.icon} />
      <h3 className="gyn-service-title w-full text-xs font-extrabold leading-snug text-mh-blue transition-colors duration-300 font-['Montserrat',sans-serif] min-h-[2.75rem] sm:mb-2 sm:min-h-[2.75rem] sm:text-base md:text-[17px]">
        {item.title}
      </h3>
      <div
        className={`grid w-full grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr] ${
          tapExpanded ? "max-sm:grid-rows-[1fr]" : "max-sm:grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="gyn-service-desc-panel pt-2 sm:pt-2.5">
            <p className="gyn-service-desc text-[13px] font-medium leading-relaxed font-['Montserrat',sans-serif] sm:text-[15px]">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LandingGynaecologyServices({ data }) {
  const [mobileSelected, setMobileSelected] = useState(null);

  if (!data || !data.enabled || !data.items) return null;

  const handleMobileTap = (index) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches) {
      return;
    }
    setMobileSelected(mobileSelected === index ? null : index);
  };

  return (
    <section className="gynaecology-services-section py-5 md:py-7">
      <div className="gynaecology-services-section__inner mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <h2 className="section-title-mh section-title-mh--ink">
          {data.title}
        </h2>

        <div className="gyn-services-grid">
          {data.items.map((item, index) => {
            const isSelected = mobileSelected === index;

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleMobileTap(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleMobileTap(index);
                  }
                }}
                className={`gyn-service-card group relative flex h-full min-w-0 w-full cursor-pointer flex-col items-center p-3 text-center sm:p-5 sm:hover:z-20 ${
                  isSelected ? "is-selected" : ""
                }`}
              >
                <ServiceCardBody item={item} tapExpanded={isSelected} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
