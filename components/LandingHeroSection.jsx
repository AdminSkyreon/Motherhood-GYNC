export default function LandingHeroSection({ banner, site, booking }) {
  return (
    <section className="relative pt-0 pb-6 lg:py-24 overflow-hidden">
      
      {/* 1. Desktop Only: Absolute Background Image */}
      {site.assets?.heroImageSrc && (
        <div className="hidden lg:flex absolute inset-0 justify-center items-center pointer-events-none overflow-hidden">
          <img 
            src={site.assets.heroImageSrc} 
            alt="Gynaecology Consultation" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* 2. Mobile Only: Full-Width Image at the very top (Navbar ke sath gap hatane ke liye pt-0) */}
      {site.assets?.heroImageSrc && (
        <div className="block lg:hidden w-full mb-4">
          <img 
            src={site.assets.heroImageSrc} 
            alt="Gynaecology Consultation" 
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          
          {/* 3. Text / Tagline */}
          <div className="lg:col-span-6 max-w-xl lg:pl-4 text-center lg:text-left mb-2 lg:mb-0">
            <h1 className="text-[26px] sm:text-[28px] lg:text-[34px] font-extrabold font-['Montserrat',sans-serif] leading-tight">
              <span style={{ color: '#0057A4' }}>Expert Gynaecology</span> <br className="hidden sm:inline" />
              <span style={{ color: '#0057A4' }}>Care for Every Stage of a</span> <br className="hidden sm:inline" />
              <span style={{ color: '#DB5070' }}>Woman's Life</span>
            </h1>
          </div>

          {/* Empty Middle Space on Desktop */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* 4. Booking Form Box */}
          <div className="lg:col-span-4 ml-auto w-full max-w-[380px] bg-white p-5 rounded-2xl shadow-xl border border-gray-100 mt-2 lg:mt-0">
            <h3 className="text-xl font-extrabold font-['Montserrat',sans-serif] leading-tight mb-4" style={{ color: '#0057A4' }}>
              Book Your Gynaecology <br />
              Consultation
            </h3>
            
            <form className="space-y-3">
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-3.5 py-2.5 border-[1px] border-pink-200/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DB5070] placeholder-gray-400 font-['Montserrat',sans-serif]" 
                  style={{ backgroundColor: '#FFF9FB', color: '#231F20', fontSize: '16px' }}
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  className="w-full px-3.5 py-2.5 border-[1px] border-pink-200/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DB5070] placeholder-gray-400 font-['Montserrat',sans-serif]" 
                  style={{ backgroundColor: '#FFF9FB', color: '#231F20', fontSize: '16px' }}
                />
              </div>
              <div className="relative">
                <select 
                  className="w-full px-3.5 py-2.5 border-[1px] border-pink-200/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DB5070] font-['Montserrat',sans-serif] appearance-none cursor-pointer"
                  style={{ 
                    backgroundColor: '#FFF9FB', 
                    color: '#231F20', 
                    fontSize: '16px',
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23DB5070'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px'
                  }}
                >
                  <option value="" className="text-gray-400">Preferred Language</option>
                  {booking.bookingForm.languages?.map((lang, idx) => (
                    <option key={idx} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition font-['Montserrat',sans-serif]"
                style={{ backgroundColor: '#DB5070' }}
              >
                Request a Callback →
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}