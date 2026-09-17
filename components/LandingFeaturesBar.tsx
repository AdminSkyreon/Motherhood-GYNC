/** Phrase titles (e.g. "Trusted by") → metric in subtitle is the large stat. */
function resolveStatLines(title, subtitle) {
  const t = (title || "").trim();
  const s = (subtitle || "").trim();
  const titleLooksLikeLabel =
    t.length > 0 &&
    !/^[\d+]/.test(t) &&
    !/^\d/.test(t) &&
    !/^24\s*\/\s*7$/i.test(t) &&
    t.toUpperCase() !== "NABH";

  if (titleLooksLikeLabel && s) {
    return { primary: s, label: t };
  }
  return { primary: t, label: s };
}

export default function LandingFeaturesBar({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <section className="stats-bar w-full">
      <div className="stats-inner">
        {features.map((item, index) => {
          const { primary, label } = resolveStatLines(item.title, item.subtitle);

          return (
            <div key={`${item.title}-${index}`} className="stat-item">
              <p className="stat-num">{primary}</p>
              {label ? <p className="stat-label">{label}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
