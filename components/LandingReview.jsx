'use client';

import React from "react";

export default function LandingReview({ reviews }) {
  if (!reviews || !reviews.enabled) return null;

  // Duplicate items for infinite seamless loop effect
  const reviewItems = reviews.items || [];
  const duplicatedReviews = [...reviewItems, ...reviewItems, ...reviewItems];

  return (
    <section className="py-12 bg-pink-50/50 overflow-hidden">
      {/* Container with spacing from the walls (edges) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header and Badges Row (Heading on Left, Badges on Right, spaced from walls) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          
          {/* Heading on Left */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 max-w-xl">
            {reviews.title}
          </h2>
          
          {/* Ratings Summary Badges on Right */}
          <div className="flex items-center gap-4 flex-wrap">
            {reviews.google && (
              <div className="bg-sky-50/80 px-4 py-2.5 rounded-2xl shadow-sm border border-sky-200/60 flex items-center gap-3">
                {/* Google Logo Icon */}
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.2v3.15C3.17 21.32 7.23 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.2C.44 8.12 0 9.87 0 11.7s.44 3.58 1.2 5.12l4.08-2.55z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.2 6.58l4.08 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 text-base leading-none">★</span>
                    <span className="font-bold text-gray-900 text-base leading-tight">{reviews.google.rating}</span>
                  </div>
                  <p className="text-gray-500 text-[11px] mt-0.5">Google · <span className="font-semibold text-gray-700">{reviews.google.reviewCount}</span> reviews</p>
                </div>
              </div>
            )}

            {reviews.practo && (
              <div className="bg-sky-50/80 px-4 py-2.5 rounded-2xl shadow-sm border border-sky-200/60 flex items-center gap-3">
                {/* Practo Logo Icon (Updated to match Google style with white rounded box) */}
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                  <div className="flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A5EC]"></span>
                    <span className="text-[#13293D] font-black text-sm tracking-tighter">p</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 text-base leading-none">★</span>
                    <span className="font-bold text-gray-900 text-base leading-tight">{reviews.practo.rating}</span>
                  </div>
                  <p className="text-gray-500 text-[11px] mt-0.5">Practo · <span className="font-semibold text-gray-700">{reviews.practo.reviewCount}</span> reviews</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Infinite Auto-Moving Marquee Container */}
      <div className="relative w-full overflow-hidden px-4 sm:px-8">
        <div className="flex gap-5 animate-marquee w-max py-4">
          {duplicatedReviews.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between w-[280px] sm:w-[300px] shrink-0"
            >
              <div>
                {/* Header with Name/Subtitle on Left and Stars on Right */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-blue-900">{item.name}</h4>
                    <p className="text-[11px] text-gray-500">{item.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-rose-500 text-[11px]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">
                  "{item.review}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind CSS Custom Animation style */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}