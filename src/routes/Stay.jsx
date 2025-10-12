import { Link } from "react-router-dom";
import site from "../data/siteData";

// Tailwind v4 classes assumed. Replace placeholder images under /public/assets/airbnb/
// If you already have a design system, feel free to swap the wrappers for your components.

const AIRBNB_URL = import.meta?.env?.VITE_AIRBNB_URL || site.stay.airbnbUrl;

const photos = [
  "/assets/airbnb/1 hero.jpg",
  "/assets/airbnb/3.jpg",
  "/assets/airbnb/4.jpg",
  "/assets/airbnb/5.jpg",
  "/assets/airbnb/6.jpg",
  "/assets/airbnb/7.jpg",
  "/assets/airbnb/8.jpg",
  "/assets/airbnb/9.jpg",
  "/assets/airbnb/10.jpg",
  "/assets/airbnb/11.jpg",
  "/assets/airbnb/12.jpg",
  "/assets/airbnb/13.jpeg",
];

export default function Stay() {

  return (
    // Note: Keep bg-transparent here to show the western background from LayoutSinglePage
    <div className="min-h-screen text-ink bg-transparent">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">{site.stay.heading}</h1>
        <p className="mt-3 sm:mt-4 max-w-2xl text-ink/80 text-sm sm:text-base leading-relaxed">
          {site.stay.description}
        </p>
        <div className="mt-6 sm:mt-8">
          <a href={AIRBNB_URL} target="_blank" className="btn text-sm sm:text-base" rel="noreferrer">
            {site.stay.ctaButton}
          </a>
        </div>
      </section>

      {/* Fast facts */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {site.stay.amenities.slice(0, 8).map((a, i) => (
            <div key={i} className="frost-layer text-center">
              <p className="text-xs sm:text-sm font-semibold break-words leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">{site.stay.photoGallery.heading}</h2>
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Hero image - larger */}
          <button
            className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl frost-layer-light"
            onClick={() => window.open(photos[0], "_blank")}
            aria-label="Open hero photo"
          >
            <img src={photos[0]} alt="Airbnb hero view" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </button>
          
          {/* 3-column grid for remaining photos */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {photos.slice(1).map((photo, index) => (
              <button
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl frost-layer-light"
                onClick={() => window.open(photo, "_blank")}
                aria-label={`Open photo ${index + 2}`}
              >
                <img 
                  src={photo} 
                  alt={`Property view ${index + 2}`} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 sm:mt-8">
          <a href={AIRBNB_URL} target="_blank" rel="noreferrer" className="btn text-sm sm:text-base">
            {site.stay.photoGallery.seeMoreButton}
          </a>
        </div>
      </section>

    </div>
  );
}
