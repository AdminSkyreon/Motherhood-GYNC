'use client';

import { useState } from 'react';

export default function LandingSymptoms({ data }) {
  if (!data || !data.enabled || !data.items) return null;

  // Track only the currently clicked card index
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#F0F4F8] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 font-['Montserrat',sans-serif]">
          {data.title}
        </h2>

        {/* Symptoms Grid: items-start keeps other cards from stretching when one expands */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-start">
          {data.items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div 
                key={index} 
                onClick={() => handleCardClick(index)}
                className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-center transition-all duration-300 ease-in-out border cursor-pointer group min-h-[150px] sm:min-h-[160px] ${
                  isActive 
                    ? 'bg-[#FFF5F7] border-pink-300 shadow-lg scale-[1.02] z-10' 
                    : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
                }`}
              >
                {/* Top Content: Icon & Title */}
                <div>
                  <div className="w-full flex items-center justify-between mb-2 relative">
                    <div className="w-full flex justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {item.icon && (
                          <img 
                            src={item.icon} 
                            alt={item.title} 
                            className="w-14 h-14 sm:w-16 sm:h-16 object-contain" 
                          />
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-pink-600 text-xs font-bold absolute top-0 right-0">
                        ▲
                      </span>
                    )}
                  </div>

                  {/* Symptom Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] font-['Montserrat',sans-serif] leading-snug w-full">
                    {item.title}
                  </h3>
                </div>

                {/* Expandable Bullet Points */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out w-full text-left ${
                    isActive && item.bullets ? 'max-h-60 opacity-100 mt-3 pt-1' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <ul className="space-y-1.5">
                    {item.bullets && item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start text-[11px] sm:text-xs text-gray-700 font-medium">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500 mt-1 mr-1.5 shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}