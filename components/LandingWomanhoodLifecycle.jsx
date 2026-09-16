import React from "react";
import Image from "next/image";

export default function LandingWomanhoodLifecycle({ data }) {
  if (!data || !data.enabled) return null;

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-sky-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-14 font-['Montserrat',sans-serif]">
          {data.title}
        </h2>

        {/* Mobile: Horizontal scroll (Left to Right), Desktop: Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible pb-6 sm:pb-0 justify-start sm:justify-items-center scrollbar-hide">
          {data.items?.map((item, index) => {
            // Card 1 & 3: Pink (#F3A9CFB8), Card 2 & 4: Lavender (#C9A4F2B8)
            const isPink = index % 2 === 0;
            const bgHex = isPink ? "#F3A9CFB8" : "#C9A4F2B8";
            // Exact original offset shadow with smooth transition on hover
            const shadowColor = isPink ? "rgba(243, 169, 207, 0.6)" : "rgba(201, 164, 242, 0.6)";

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center rounded-[38px] transition-all duration-300 ease-in-out flex-shrink-0 sm:flex-shrink w-[230px] sm:w-full hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: bgHex,
                  padding: "42px 16px 36px",
                  boxShadow: `6px 8px 0px 0px ${shadowColor}`,
                  maxWidth: "230px"
                }}
              >
                {/* Round Icon Container */}
                {item.icon && (
                  <div className="w-22 h-22 sm:w-26 sm:h-26 relative mb-6 rounded-full flex items-center justify-center bg-white/85 shadow-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-['Montserrat',sans-serif] leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 font-['Montserrat',sans-serif] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}