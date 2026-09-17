"use client";

import React, { useState } from "react";
import { assetPath } from "@/lib/assetPath";

export default function LandingWhyChooseUs({ data }) {
  if (!data || !data.enabled) return null;

  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="why-choose-us-section py-5 md:py-7">
      <div className="landing-section-inner max-w-7xl mx-auto">
        <h2 className="section-title-mh section-title-mh--ink">
          {data.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {data.items?.map((item, index) => {
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={index}
                className="w-full min-w-0 h-[178px] lg:h-[188px] xl:h-[200px] [perspective:1000px] cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`relative w-full h-full duration-500 [transform-style:preserve-3d] rounded-[20px] shadow-sm hover:shadow-md ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  } lg:hover:[transform:rotateY(180deg)]`}
                >
                  {/* Front Side */}
                  <div className="why-choose-card-face absolute inset-0 w-full h-full flex items-center justify-center text-center p-2.5 max-lg:px-2 lg:p-6 bg-white rounded-[20px] border border-gray-100 [backface-visibility:hidden]">
                    <div className="why-choose-card-face__inner flex w-full max-h-full flex-col items-center justify-center">
                      {item.icon && (
                        <div className="w-9 h-9 max-lg:w-10 max-lg:h-10 sm:w-14 sm:h-14 lg:w-[4.5rem] lg:h-[4.5rem] mb-1.5 max-lg:mb-2 lg:mb-4 flex-shrink-0">
                          <img
                            src={assetPath(item.icon)}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xs max-lg:text-[13px] leading-snug sm:text-sm lg:text-lg font-bold text-gray-800 font-['Montserrat',sans-serif] lg:leading-snug px-0.5 max-lg:line-clamp-4 lg:line-clamp-none">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back Side (Dark Blue Background with Description) */}
                  <div className="why-choose-card-face why-choose-card-face--back absolute inset-0 w-full h-full flex items-center justify-center text-center p-2.5 max-lg:px-2 lg:p-6 bg-blue-900 text-white rounded-[20px] [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                    <div className="why-choose-card-face__inner flex w-full max-h-full flex-col items-center justify-center max-lg:gap-1 lg:gap-2">
                      <h3 className="text-[11px] max-lg:text-xs sm:text-sm lg:text-base font-bold font-['Montserrat',sans-serif] leading-snug shrink-0 max-lg:line-clamp-2 lg:line-clamp-none lg:mb-0">
                        {item.title}
                      </h3>
                      <p className="why-choose-card-back__text text-[11px] max-lg:text-xs sm:text-xs lg:text-sm text-blue-100 leading-snug max-lg:leading-[1.35] lg:leading-relaxed font-['Montserrat',sans-serif] lg:line-clamp-6">
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