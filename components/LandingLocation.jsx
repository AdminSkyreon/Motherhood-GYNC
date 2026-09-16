// LandingLocation.jsx
import React from 'react';

export default function LandingLocation({ locationData, hospitalName, phone }) {
  if (!locationData || !locationData.enabled) return null;

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {locationData.sectionTitle || "Hospital Location & Directions"}
          </h2>
        </div>

        {/* Main Grid Container with Gap added between Map and Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Side: Real Google Map Iframe (Height reduced) */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[400px] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            {locationData.mapEmbedUrl ? (
              <iframe
                title="Hospital Location Map"
                src={locationData.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Map embed URL not provided
              </div>
            )}
          </div>

          {/* Right Side: Information Card (Padding reduced for compact height) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200 p-5 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Card Title */}
              <h3 className="text-[18px] sm:text-[18px] font-bold text-[#231F20] mb-3 leading-snug">
                {locationData.cardTitle || hospitalName}
              </h3>

              {/* Dynamic Highlights / Bullet Points with thin border separators */}
              <div className="space-y-0 mb-5">
                {locationData.highlights && locationData.highlights.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-3 text-[#4A3F40] py-2.5 ${
                      index !== locationData.highlights.length - 1 ? 'border-b border-pink-100' : ''
                    }`}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <span className="text-[15px] leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Book Now & Call Now */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#booking"
                className="inline-flex items-center justify-center bg-[#DB5070] hover:bg-[#c44361] text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm text-sm text-center"
              >
                Book Now
              </a>
              <a
                href={`tel:${phone?.tel || '08069549251'}`}
                className="inline-flex items-center justify-center bg-[#0B4A98] hover:bg-[#093d7c] text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm text-sm text-center"
              >
                Call Now
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}