import { Link } from "react-router-dom";
import site from "../data/siteData";

// Tailwind v4 classes assumed. Replace placeholder images under /public/assets/airbnb/
// If you already have a design system, feel free to swap the wrappers for your components.

const AIRBNB_URL = import.meta?.env?.VITE_AIRBNB_URL || site.stay.airbnbUrl;

const photos = [
  "/assets/airbnb/hero.jpg",
  "/assets/airbnb/living.jpg",
  "/assets/airbnb/kitchen.jpg",
  "/assets/airbnb/bedroom.jpg",
  "/assets/airbnb/patio.jpg",
  "/assets/airbnb/pool.jpg",
];

export default function Stay() {
  const primaryBtn = "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg md:text-xl font-bold bg-brand-600 border-2 border-brand-800 hover:bg-brand-700 hover:scale-105 transition-all shadow-lg";
  const primaryBtnStyle = { color: 'rgb(255, 253, 249)' }; /* text-light */

  return (
    <main className="min-h-screen text-ink bg-cream">
      {/* Header */}
      <section className="mx-auto max-w-6xl p-6 md:p-10 pt-8">
        <h1 className="text-3xl md:text-5xl font-semibold">{site.stay.pageHeading}</h1>
        <p className="mt-2 max-w-2xl text-ink/80 text-sm md:text-base">
          {site.stay.pageDescription}
        </p>
        <div className="mt-6">
          <a href={AIRBNB_URL} target="_blank" className={primaryBtn} style={primaryBtnStyle} rel="noreferrer">
            {site.stay.ctaButton}
          </a>
        </div>
      </section>

      {/* Fast facts */}
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-4">
          {site.stay.amenities.slice(0, 8).map((a, i) => (
            <div key={i} className="rounded-2xl backdrop-blur p-4 border-2 border-brand-200 bg-cream-50">
              <p className="text-sm font-semibold">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <h2 className="text-xl md:text-2xl font-semibold">{site.stay.photoGallery.heading}</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((src, i) => (
            <button
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-brand-200 bg-brand-200"
              onClick={() => window.open(src, "_blank")}
              aria-label={`Open photo ${i + 1}`}
            >
              <img src={src} alt="Airbnb photo" className="h-full w-full object-cover group-hover:scale-105 transition" />
            </button>
          ))}
        </div>
        <div className="mt-6">
          <a href={AIRBNB_URL} target="_blank" rel="noreferrer" className={primaryBtn} style={primaryBtnStyle}>
            {site.stay.photoGallery.seeMoreButton}
          </a>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg md:text-xl font-semibold">{site.stay.aboutSection.heading}</h3>
            <p className="mt-2 text-sm md:text-base text-ink/80">
              {site.stay.aboutSection.description}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-brand-200 p-4 backdrop-blur bg-cream-50">
            <h4 className="font-semibold">{site.stay.quickLinks.heading}</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {site.stay.quickLinks.links.map((link, i) => (
                link.external ? (
                  <li key={i}><a className="underline" href={link.url} target="_blank" rel="noreferrer">{link.text}</a></li>
                ) : (
                  <li key={i}><Link className="underline" to={link.url}>{link.text}</Link></li>
                )
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="rounded-3xl border-2 border-brand-300 bg-brand-200 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">{site.stay.ctaSection.heading}</h3>
            <p className="text-ink/80 text-sm md:text-base">{site.stay.ctaSection.description}</p>
          </div>
          <a href={AIRBNB_URL} target="_blank" className={primaryBtn} style={primaryBtnStyle} rel="noreferrer">{site.stay.ctaSection.button}</a>
        </div>
      </section>
    </main>
  );
}
