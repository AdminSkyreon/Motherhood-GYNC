'use client';

import { useState } from 'react';

export default function LandingGynaecologyServices({ data }) {
  const [mobileSelected, setMobileSelected] = useState(null);

  if (!data || !data.enabled || !data.items) return null;

  const handleMobileClick = (index) => {
    setMobileSelected(mobileSelected === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-[#F4F8FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10 md:mb-14 font-['Montserrat',sans-serif]">
          {data.title}
        </h2>

        {/* Mobile View: Auto-moving Marquee (Slider with Tap-to-Expand) */}
        <div className="block sm:hidden w-full overflow-hidden relative">
          <div className="flex space-x-4 w-max animate-marquee">
            {/* Duplicating items to make the infinite loop seamless */}
            {data.items.concat(data.items).map((item, index) => {
              const actualIndex = index % data.items.length;
              const isSelected = mobileSelected === actualIndex;

              return (
                <div 
                  key={index} 
                  onClick={() => handleMobileClick(actualIndex)}
                  className={`flex flex-col items-center text-center cursor-pointer w-[130px] flex-shrink-0 p-3 rounded-2xl transition-all duration-300 ${
                    isSelected ? 'bg-white shadow-md border border-pink-100 scale-105' : 'hover:bg-white/50'
                  }`}
                >
                  {/* Icon Container */}
                  <div className="w-20 h-20 flex items-center justify-center mb-2">
                    {item.icon ? (
                      <img 
                        src={item.icon} 
                        alt={item.title} 
                        className="w-full h-full object-contain drop-shadow-sm" 
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-pink-100"></div>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xs font-bold text-[#0A192F] font-['Montserrat',sans-serif] leading-tight w-full px-1 mb-1">
                    {item.title}
                  </h3>

                  {/* Mobile Tap Reveal Description */}
                  <div className={`grid transition-all duration-300 ease-in-out w-full ${
                    isSelected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-gray-600 leading-tight px-0.5 pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop & Tablet View: Grid Layout with Hover Effect */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {data.items.map((item, index) => {
            const isSixthItem = index === 5;

            return (
              <div 
                key={index} 
                className={`group flex flex-col items-center text-center cursor-pointer w-full p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:border hover:border-pink-100 hover:scale-105 hover:z-10 ${
                  isSixthItem ? 'lg:col-start-2' : ''
                }`}
              >
                {/* Icon Container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  {item.icon ? (
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      className="w-full h-full object-contain drop-shadow-sm" 
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-pink-100"></div>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] font-['Montserrat',sans-serif] leading-snug max-w-[140px] mb-1">
                  {item.title}
                </h3>

                {/* Desktop Hover Reveal Description */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out w-full">
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-600 leading-tight px-1 pt-1.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Tailwind Custom Animation CSS */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}