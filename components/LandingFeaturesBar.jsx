export default function LandingFeaturesBar({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#0057A4] via-[#2B6CB0] to-[#8031A7] py-8 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
        {features.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-8 first:pl-0">
            
            {/* Direct Icon without background box */}
            {item.icon && (
              <div className="shrink-0 flex items-center justify-center">
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter brightness-0 invert" 
                />
              </div>
            )}
            
            {/* Title & Subtitle */}
            <div>
              <p className="text-base sm:text-lg font-extrabold font-['Montserrat',sans-serif] leading-tight">
                {item.title}
              </p>
              <p className="text-xs sm:text-sm font-medium text-pink-100 font-['Montserrat',sans-serif]">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}