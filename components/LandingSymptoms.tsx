"use client";

import { useState } from "react";
import { assetPath } from "@/lib/assetPath";

export default function LandingSymptoms({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data || !data.enabled || !data.items) return null;

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-mh-white py-5 md:py-7">
      <div className="landing-section-inner mx-auto max-w-[1160px]">
        <h2 className="section-title-mh section-title-mh--ink">{data.title}</h2>

        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {data.items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleCardClick(index)}
                className={`symptom-card flex w-full flex-col p-4 text-left sm:p-5 ${
                  isActive ? "is-active z-10" : ""
                }`}
              >
                <div className="mb-2 w-full shrink-0">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center sm:h-[4.25rem] sm:w-[4.25rem]">
                    {item.icon ? (
                      <img
                        src={assetPath(item.icon)}
                        alt=""
                        className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      />
                    ) : null}
                  </div>
                </div>

                <h3
                  className={`w-full text-center text-sm font-extrabold leading-snug transition-colors duration-300 font-['Montserrat',sans-serif] sm:text-[15px] ${
                    isActive ? "text-mh-pink" : "text-mh-blue"
                  }`}
                >
                  {item.title}
                </h3>

                {item.bullets?.length ? (
                  <div
                    className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                      isActive ? "mt-3 max-h-[320px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-2 border-t border-mh-blue-soft pt-3 text-left">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-mh-ink font-['Montserrat',sans-serif] sm:text-[15px]"
                        >
                          <span
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mh-pink"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
