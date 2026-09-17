import React from "react";
import { assetPath } from "@/lib/assetPath";

function cardTone(item, index) {
  if (item.cardColor === "lavender") return "lavender";
  if (item.cardColor === "pink") return "pink";
  return index % 2 === 0 ? "pink" : "lavender";
}

export default function LandingWomanhoodLifecycle({ data }) {
  if (!data || !data.enabled) return null;

  return (
    <section className="womanhood-lifecycle-section py-5 md:py-7">
      <div className="landing-section-inner max-w-7xl mx-auto">
        <h2 className="section-title-mh section-title-mh--ink">
          {data.title}
        </h2>

        <div className="womanhood-lifecycle-grid">
          {data.items?.map((item, index) => {
            const tone = cardTone(item, index);

            return (
              <article
                key={index}
                className={`womanhood-lifecycle-card womanhood-lifecycle-card--${tone}`}
              >
                {item.icon && (
                  <div className="womanhood-lifecycle-card__icon">
                    <img
                      src={assetPath(item.icon)}
                      alt=""
                      className="h-full w-full object-contain p-1.5 sm:p-2"
                    />
                  </div>
                )}

                <h3 className="womanhood-lifecycle-card__title">{item.title}</h3>
                <p className="womanhood-lifecycle-card__desc">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
