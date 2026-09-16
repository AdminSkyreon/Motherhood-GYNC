"use client";

import React, { useState, useEffect, useRef } from "react";

export default function LandingFaq({ data }) {
  if (!data || !data.enabled || !data.items || data.items.length === 0) return null;

  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

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
    <section className="landing-faq-section py-5 md:py-7 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="landing-faq-inner">
        <h2 className="section-title-mh section-title-mh--ink">
          {data.title}
        </h2>

        <div className="landing-faq-grid">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => toggleAccordion(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleAccordion(index);
                  }
                }}
                className="landing-faq-item"
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`landing-faq-item__question flex-1 min-w-0 ${
                      isOpen ? "landing-faq-item__question--open" : ""
                    }`}
                  >
                    {item.question}
                  </h3>

                  <span
                    className={`landing-faq-item__toggle ${
                      isOpen ? "landing-faq-item__toggle--open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`landing-faq-item__panel${
                    isOpen ? " landing-faq-item__panel--open" : ""
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="landing-faq-item__panel-inner">
                    <div className="landing-faq-item__answer">{item.answer}</div>
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
