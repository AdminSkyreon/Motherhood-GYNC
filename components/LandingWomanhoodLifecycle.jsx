import React from "react";
import Image from "next/image";

function cardTone(item, index) {
  if (item.cardColor === "lavender") return "lavender";
  if (item.cardColor === "pink") return "pink";
  return index % 2 === 0 ? "pink" : "lavender";
}

export default function LandingWomanhoodLifecycle({ data }) {
  if (!data || !data.enabled) return null;

  return (
    <section className="womanhood-lifecycle-section py-5 md:py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
                    <Image
                      src={item.icon}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 52px, (max-width: 1024px) 68px, 84px"
                      className="object-contain p-1.5 sm:p-2"
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
