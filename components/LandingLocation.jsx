import React from "react";

export default function LandingLocation({ locationData, hospitalName, phone }) {
  if (!locationData || !locationData.enabled) return null;

  return (
    <section className="landing-location-section py-5 md:py-7" id="location">
      <div className="landing-location-section__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title-mh section-title-mh--ink">
          {locationData.sectionTitle || "Hospital Location & Directions"}
        </h2>

        <div className="landing-location-grid">
          <div className="landing-location-map">
            {locationData.mapEmbedUrl ? (
              <iframe
                title="Hospital Location Map"
                src={locationData.mapEmbedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Map embed URL not provided
              </div>
            )}
          </div>

          <div className="landing-location-card">
            <div className="landing-location-card__content">
              <h3 className="landing-location-card__title">
                {locationData.cardTitle || hospitalName}
              </h3>

              <ul className="landing-location-highlights">
                {locationData.highlights?.map((item, index) => (
                  <li key={index} className="landing-location-highlight">
                    <span className="landing-location-highlight__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="landing-location-highlight__text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="landing-location-actions">
              <a href="#booking" className="landing-location-btn landing-location-btn--book">
                Book Now
              </a>
              <a
                href={`tel:${phone?.tel || "08069549251"}`}
                className="landing-location-btn landing-location-btn--call"
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
