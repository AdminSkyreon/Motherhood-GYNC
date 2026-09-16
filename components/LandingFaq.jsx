"use client";

import React, { useState, useEffect, useRef } from "react";

export default function LandingFaq({ data }) {
  if (!data || !data.enabled || !data.items || data.items.length === 0) return null;

  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  // Close accordion when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-20 bg-sky-50/40" ref={containerRef}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12 font-['Montserrat',sans-serif]">
          {data.title}
        </h2>

        {/* 2-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleAccordion(index)}
                className="bg-white rounded-2xl shadow-sm border border-transparent py-4 px-5 sm:py-4 sm:px-6 cursor-pointer transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Question text */}
                  <h3
                    className={`text-[13px] sm:text-[14.5px] font-semibold font-['Montserrat',sans-serif] transition-colors duration-200 leading-snug ${
                      isOpen ? "text-[#DB5070]" : "text-[#0B4A98]"
                    }`}
                  >
                    {item.question}
                  </h3>

                  {/* Smaller Button */}
                  <button
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors duration-200 ${
                      isOpen ? "bg-[#DB5070]" : "bg-[#0B4A98]"
                    }`}
                    aria-label="Toggle Answer"
                  >
                    <span className="text-base font-bold leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </div>

                {/* Answer container */}
                {isOpen && (
                  <div className="mt-3 text-[12.5px] sm:text-[13px] font-['Montserrat',sans-serif] text-[#231F20] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}