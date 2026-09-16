'use client';

export default function LandingGynaecologists({ data }) {
  if (!data || !data.enabled || !data.items) return null;

  // Duplicate items for seamless infinite marquee loop on all screens
  const infiniteItems = [...data.items, ...data.items];

  return (
    <section className="py-12 md:py-16 bg-[#F4F8FC]">
      <div className="w-full">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10 md:mb-14 font-['Montserrat',sans-serif] px-4">
          {data.title}
        </h2>

        {/* Gynaecologists Infinite Auto-Scroll Carousel */}
        <div className="w-full overflow-hidden relative flex py-4">
          <div className="flex gap-4 sm:gap-5 animate-marquee whitespace-nowrap pl-4">
            {infiniteItems.map((doctor, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col items-center text-center w-[240px] sm:w-[250px] flex-shrink-0 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300"
              >
                {/* Doctor Avatar / Image Container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 flex items-center justify-center p-1 bg-gradient-to-b from-pink-500 to-blue-600 shadow-inner flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                    
                    {/* Fallback Initials Layer */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-blue-900 flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl tracking-wider shadow-inner absolute inset-0 z-0">
                      {doctor.initials}
                    </div>

                    {/* Image Layer on Top */}
                    {doctor.image && doctor.image.trim() !== '' && (
                      <img 
                        src={doctor.image} 
                        alt="" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        className="w-full h-full object-cover absolute inset-0 z-10 bg-white"
                      />
                    )}

                  </div>
                </div>

                {/* Doctor Name */}
                <h3 className="text-base font-bold text-[#0A192F] font-['Montserrat',sans-serif] mb-1">
                  {doctor.name}
                </h3>

                {/* Doctor Qualification */}
                <p className="text-xs text-gray-500 font-medium mb-2 min-h-[32px]">
                  {doctor.qualification}
                </p>

                {/* Doctor Designation */}
                <p className="text-xs font-semibold text-gray-700 mb-4 min-h-[36px]">
                  {doctor.designation}
                </p>

                {/* Location Badge */}
                <div className="flex items-center justify-center bg-pink-50 border border-pink-100 rounded-full px-3 py-1 mb-5">
                  <span className="text-xs mr-1">📍</span>
                  <span className="text-xs font-medium text-gray-700">{doctor.location}</span>
                </div>

                {/* Book Appointment Button */}
                <button 
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="mt-auto w-full py-2.5 px-4 rounded-full text-white text-xs font-bold bg-gradient-to-r from-pink-600 to-blue-900 shadow-md hover:opacity-95 transition-opacity"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Custom CSS for infinite marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}