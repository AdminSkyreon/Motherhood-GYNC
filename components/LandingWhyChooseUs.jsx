"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function LandingWhyChooseUs({ data }) {
  if (!data || !data.enabled) return null;

  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 font-['Montserrat',sans-serif]">
          {data.title}
        </h2>
        {/* Gap aur alignment ko compact karne ke liye */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 justify-center items-center">
          {data.items?.map((item, index) => {
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={index}
                className="w-full max-w-[300px] h-[170px] [perspective:1000px] cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`relative w-full h-full duration-500 [transform-style:preserve-3d] rounded-[20px] shadow-sm hover:shadow-md ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  } hover:[transform:rotateY(180deg)]`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-4 bg-white rounded-[20px] border border-gray-100 [backface-visibility:hidden]">
                    {item.icon && (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 relative mb-3 flex-shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xs sm:text-base font-bold text-gray-800 font-['Montserrat',sans-serif] leading-tight sm:leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Back Side (Dark Blue Background with Description) */}
                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-4 bg-blue-900 text-white rounded-[20px] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h3 className="text-xs sm:text-sm font-bold font-['Montserrat',sans-serif] mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-blue-100 leading-relaxed font-['Montserrat',sans-serif]">
                      {item.description}
                    </p>
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