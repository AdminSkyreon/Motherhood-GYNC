export default function Header({ site }) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-3 bg-white shadow-md">
      <div className="flex items-center">
        {site.assets?.logoSrc ? (
          <img 
            src={site.assets.logoSrc} 
            alt={site.hospitalName} 
            className="h-12 md:h-14 w-auto object-contain" 
          />
        ) : (
          <span className="text-xl font-bold text-blue-900">{site.hospitalName}</span>
        )}
      </div>
      <a 
        href={`tel:${site.phone.tel}`} 
        className="inline-flex items-center gap-2.5 text-white px-5 py-2.5 rounded-full font-medium shadow transition font-['Montserrat',sans-serif]"
        style={{ backgroundColor: '#DB5070' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.18-3.71-6.55-6.55l1.96-1.57c.27-.27.36-.67.25-1.01A11.36 11.36 0 018.6 3.99c0-.55-.45-1-1-1H4.06c-.55 0-1 .45-1 1C3.06 13.45 11.55 21.94 21.64 22c.55 0 1-.45 1-1v-3.56c0-.55-.45-1-1-1z"/>
        </svg>
        {site.phone.display}
      </a>
    </header>
  );
}