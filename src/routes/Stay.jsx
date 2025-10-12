import { Link } from "react-router-dom";
import site from "../data/siteData";

// Tailwind v4 classes assumed. Replace placeholder images under /public/assets/airbnb/
// If you already have a design system, feel free to swap the wrappers for your components.

const AIRBNB_URL = import.meta?.env?.VITE_AIRBNB_URL || site.stay.airbnbUrl;

const photos = [
  "/assets/airbnb/hero.jpg",
  "/assets/airbnb/kitchen.jpg",
  "/assets/airbnb/patio.jpeg",
  "/assets/airbnb/pool.jpg",
  "/assets/airbnb/sunset.jpg",
];

export default function Stay() {

  return (
    <main className="min-h-screen text-ink bg-cream">
      {/* Header */}
      <section className="mx-auto max-w-6xl p-6 md:p-10 pt-8">
        <h1 className="text-3xl md:text-5xl font-semibold">{site.stay.heading}</h1>
        <p className="mt-2 max-w-2xl text-ink/80 text-sm md:text-base">
          {site.stay.description}
        </p>
        <div className="mt-6">
          <a href={AIRBNB_URL} target="_blank" className="btn" rel="noreferrer">
            {site.stay.ctaButton}
          </a>
        </div>
      </section>

      {/* Fast facts */}
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-4">
          {site.stay.amenities.slice(0, 8).map((a, i) => (
            <div key={i} className="text-center">
              <p className="text-sm font-semibold">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <h2 className="text-xl md:text-2xl font-semibold">{site.stay.photoGallery.heading}</h2>
        <div className="mt-6 space-y-6">
          {/* Hero image - larger */}
          <button
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl frost-layer-light"
            onClick={() => window.open(photos[0], "_blank")}
            aria-label="Open hero photo"
          >
            <img src={photos[0]} alt="Airbnb hero view" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </button>
          
          {/* Kitchen and Patio - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl frost-layer-light"
              onClick={() => window.open(photos[1], "_blank")}
              aria-label="Open kitchen photo"
            >
              <img src={photos[1]} alt="Kitchen view" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </button>
            
            <button
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl frost-layer-light"
              onClick={() => window.open(photos[2], "_blank")}
              aria-label="Open patio photo"
            >
              <img src={photos[2]} alt="Patio view" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Pool and Sunset - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl frost-layer-light"
              onClick={() => window.open(photos[3], "_blank")}
              aria-label="Open pool photo"
            >
              <img src={photos[3]} alt="Pool view" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </button>
            
            <button
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl frost-layer-light"
              onClick={() => window.open(photos[4], "_blank")}
              aria-label="Open sunset photo"
            >
              <img src={photos[4]} alt="Sunset view" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </button>
          </div>
        </div>
        <div className="mt-8">
          <a href={AIRBNB_URL} target="_blank" rel="noreferrer" className="btn">
            {site.stay.photoGallery.seeMoreButton}
          </a>
        </div>
      </section>

    </main>
  );
}
