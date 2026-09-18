"use client";

import React, { useCallback, useState } from "react";
import { assetPath } from "@/lib/assetPath";

function isDesktopFlipViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default function LandingWhyChooseUs({ data }) {
  if (!data || !data.enabled) return null;

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = useCallback((index: number) => {
    if (isDesktopFlipViewport()) return;
    setFlippedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="why-choose-us-section py-5 md:py-7">
      <div className="landing-section-inner max-w-7xl mx-auto">
        <h2 className="section-title-mh section-title-mh--ink">{data.title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {data.items?.map((item, index) => {
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={index}
                className="why-choose-flip-scene w-full min-w-0 h-[178px] cursor-pointer lg:h-[188px] lg:cursor-default xl:h-[200px]"
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
              >
                <div
                  className={`why-choose-flip-inner shadow-sm lg:hover:shadow-md${
                    isFlipped ? " is-flipped" : ""
                  }`}
                >
                  <div className="why-choose-card-face absolute inset-0 flex h-full w-full items-center justify-center rounded-[20px] border border-gray-100 bg-white p-2.5 text-center max-lg:px-2 lg:p-6">
                    <div className="why-choose-card-face__inner flex max-h-full w-full flex-col items-center justify-center">
                      {item.icon ? (
                        <div className="mb-1.5 flex h-9 w-9 flex-shrink-0 max-lg:mb-2 max-lg:h-10 max-lg:w-10 sm:h-14 sm:w-14 lg:mb-4 lg:h-[4.5rem] lg:w-[4.5rem]">
                          <img
                            src={assetPath(item.icon)}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : null}
                      <h3 className="px-0.5 text-xs font-bold leading-snug text-gray-800 max-lg:line-clamp-4 max-lg:text-[13px] sm:text-sm lg:line-clamp-none lg:text-lg lg:leading-snug font-['Montserrat',sans-serif]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="why-choose-card-face why-choose-card-face--back absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-[20px] bg-blue-900 p-2.5 text-center text-white max-lg:px-2 lg:p-6">
                    <div className="why-choose-card-face__inner flex max-h-full w-full flex-col items-center justify-center max-lg:gap-1 lg:gap-2">
                      <h3 className="shrink-0 text-[11px] font-bold leading-snug max-lg:line-clamp-2 max-lg:text-xs sm:text-sm lg:mb-0 lg:line-clamp-none lg:text-base font-['Montserrat',sans-serif]">
                        {item.title}
                      </h3>
                      <p className="why-choose-card-back__text text-[11px] leading-snug text-blue-100 max-lg:leading-[1.35] max-lg:text-xs sm:text-xs lg:line-clamp-6 lg:text-sm lg:leading-relaxed font-['Montserrat',sans-serif]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
