import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { fireConfetti } from "../lib/confetti";
import site from "../data/siteData";
import MemoryForm from "../components/memories/MemoryForm";
import MemoryFeed from "../components/memories/MemoryFeed";
import CarpoolForm from "../features/carpool/CarpoolForm";
import CarpoolBulletinBoard from "../components/carpool/CarpoolBulletinBoard";
import GlassPanel from "../components/layout/GlassPanel";

// Context for active section
export const ActiveSectionContext = createContext<string>("welcome");

export default function HomeSinglePage() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [activeSection, setActiveSection] = useState("welcome");
  
  const sectionRefs = {
    welcome: useRef<HTMLElement>(null),
    agenda: useRef<HTMLElement>(null),
    rsvp: useRef<HTMLElement>(null),
    stay: useRef<HTMLElement>(null),
    memories: useRef<HTMLElement>(null),
    carpool: useRef<HTMLElement>(null),
  };

  function calculateTimeLeft() {
    const eventDate = new Date("2026-04-24T00:00:00");
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px', // Trigger when section is near top
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleRSVPClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fireConfetti();

    setTimeout(() => {
      sectionRefs.rsvp.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <ActiveSectionContext.Provider value={activeSection}>
      <main className="md:snap-y md:snap-mandatory">
        {/* ===== HERO / WELCOME SECTION ===== */}
        <section 
          id="welcome" 
          ref={sectionRefs.welcome}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative px-6 sm:px-10 py-10 sm:py-12 text-center">
                {/* Festive Bienvenidos Header */}
                <div className="mb-3 sm:mb-4">
                  <div className="text-5xl sm:text-6xl md:text-7xl tracking-wide font-display text-accent">
                    {site.hero.oleText}
                  </div>
                </div>

                {/* Hero Title with Stylized 40 */}
                <div className="mt-3 sm:mt-4">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-display text-primary leading-tight tracking-wide">
                    {site.hero.mainTitle}{" "}
                    <span className="font-accent text-5xl sm:text-7xl md:text-8xl text-accent inline-block">
                      {site.hero.ageNumber}
                    </span>
                    <span className="text-3xl sm:text-5xl md:text-6xl align-middle">{site.hero.ageSuffix}</span>
                  </h1>
                </div>

              {/* Celebrate Stacy Subline with Stars */}
              <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 text-brand-700/80">
                <svg
                  className="w-5 h-5 text-accent opacity-80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-lg sm:text-xl font-bold text-accent">
                  {site.hero.celebrationText}
                </span>
                <svg
                  className="w-5 h-5 text-accent opacity-80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

                <p className="mt-2 sm:mt-3 text-text-dark/80 max-w-2xl mx-auto px-2 font-body tracking-normal">
                  {site.hero.subtitle}
                </p>

                {/* Countdown */}
                <div className="mt-6 sm:mt-8 mb-4 sm:mb-6" aria-live="polite" aria-label="Countdown to event">
                  <div className="grid grid-cols-4 max-w-xl mx-auto divide-x divide-secondary/30">
                    <div className="text-center px-2">
                      <div className="text-3xl sm:text-4xl font-bold text-accent font-accent">
                        {timeLeft.days}
                      </div>
                      <div className="text-xs sm:text-sm text-text-dark/80 uppercase tracking-wide mt-1 font-body">days</div>
                    </div>
                    <div className="text-center px-2">
                      <div className="text-3xl sm:text-4xl font-bold text-accent font-accent">
                        {timeLeft.hours}
                      </div>
                      <div className="text-xs sm:text-sm text-text-dark/80 uppercase tracking-wide mt-1 font-body">hours</div>
                    </div>
                    <div className="text-center px-2">
                      <div className="text-3xl sm:text-4xl font-bold text-accent font-accent">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-xs sm:text-sm text-text-dark/80 uppercase tracking-wide mt-1 font-body">mins</div>
                    </div>
                    <div className="text-center px-2">
                      <div className="text-3xl sm:text-4xl font-bold text-accent font-accent">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-xs sm:text-sm text-text-dark/80 uppercase tracking-wide mt-1 font-body">secs</div>
                    </div>
                  </div>
                </div>

                {/* Ornament Divider */}
                <div className="rule-ornate mt-6 mb-8 mx-auto" aria-hidden="true" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <img
                    src="/assets/vaquero.svg"
                    alt="Vaquero"
                    className="w-10 h-10 sm:w-12 sm:h-12 opacity-90"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <div className="text-sm sm:text-base font-medium text-text-dark/80 font-body tracking-normal">
                    <span className="block sm:inline">{site.meta.date}</span>
                    <span className="hidden sm:inline"> • </span>
                    <span className="block sm:inline">{site.meta.locationCity}</span>
                  </div>
                </div>

                <div className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-3">
                  <button 
                    id="rsvpCta" 
                    onClick={handleRSVPClick} 
                    className="btn focus-ring"
                  >
                    {site.hero.ctaButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== AGENDA SECTION ===== */}
        <section 
          id="agenda" 
          ref={sectionRefs.agenda}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">{site.sections.agenda.heading}</h2>
                <div className="rule-ornate mt-6 mx-auto" />
                <p className="mt-6 text-text-dark/80 font-body tracking-normal">
                  {site.sections.agenda.subheading}
                </p>
              </div>
              <div className="relative grid md:grid-cols-3 gap-6 mt-8">
                {site.agenda.map((s, i) => (
                  <article key={i} className="card-base focus-within:ring-2 focus-within:ring-primary/50">
                    <div className="text-2xl" role="img" aria-label={`${s.title} icon`}>
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-extrabold mt-2 text-primary font-display tracking-wide">{s.day}</h3>
                    <div className="font-semibold mt-1 font-body tracking-normal text-text-dark">{s.title}</div>
                    <div className="text-sm mt-1 font-body tracking-normal text-text-dark/80">{s.details}</div>
                    {s.link && (
                      <a
                        className="text-secondary hover:text-primary underline mt-2 inline-block font-body tracking-normal focus-ring"
                        href={s.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more
                      </a>
                    )}
                    <div className="text-sm mt-3 font-body tracking-normal text-text-dark/80">🕐 {s.time}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== RSVP SECTION ===== */}
        <section 
          id="rsvp" 
          ref={sectionRefs.rsvp}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="container mx-auto px-6 md:px-8 max-w-2xl">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">{site.sections.rsvp.heading}</h2>
                <div className="rule-ornate mt-6 mx-auto" />
                <p className="mt-6 text-text-dark/80 font-body tracking-normal">
                  {site.sections.rsvp.description}
                </p>
              </div>
              <div className="relative text-center">
                <Link 
                  to="/rsvp" 
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-primary text-text-light shadow-md ring-2 ring-primary/20 hover:bg-primary/90 hover:shadow-lg active:translate-y-[1px] transition focus-ring font-body"
                >
                  {site.sections.rsvp.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STAY / LODGING SECTION ===== */}
        <section 
          id="stay" 
          ref={sectionRefs.stay}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">{site.sections.stay.heading}</h2>
                <div className="rule-ornate mt-6 mx-auto" />
                <p className="mt-6 text-text-dark/80 font-body tracking-normal max-w-2xl mx-auto">
                  {site.sections.stay.description}
                </p>
              </div>
              <div className="relative grid md:grid-cols-4 gap-4 mt-8">
                {site.stay.amenities.map((amenity, i) => (
                  <div key={i} className="frost-layer text-center">
                    <p className="text-sm font-semibold font-body tracking-normal">{amenity}</p>
                  </div>
                ))}
              </div>
              <div className="relative text-center mt-8">
                <Link 
                  to="/stay" 
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-primary text-text-light shadow-md ring-2 ring-primary/20 hover:bg-primary/90 hover:shadow-lg active:translate-y-[1px] transition focus-ring font-body"
                >
                  {site.sections.stay.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MEMORIES SECTION ===== */}
        <section 
          id="memories" 
          ref={sectionRefs.memories}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="container mx-auto px-6 md:px-8 max-w-7xl">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">{site.sections.memories.heading}</h2>
                <div className="rule-ornate mt-6 mx-auto" />
                <p className="mt-6 text-text-dark/80 font-body tracking-normal">
                  {site.sections.memories.description}
                </p>
              </div>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="card-base">
                  <MemoryForm />
                </div>
                <div className="card-base">
                  <MemoryFeed />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CARPOOL SECTION ===== */}
        <section 
          id="carpool" 
          ref={sectionRefs.carpool}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="container mx-auto px-6 md:px-8 max-w-7xl">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">{site.sections.carpool.heading}</h2>
                <div className="rule-ornate mt-6 mx-auto" />
                <p className="mt-6 text-text-dark/80 font-body tracking-normal max-w-3xl mx-auto">
                  {site.sections.carpool.description}
                </p>
              </div>

              <div className="relative grid lg:grid-cols-2 gap-8 mt-8">
                {/* Left Side: Sign Up Form */}
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="frost-layer">
                      <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2 tracking-wide">
                        <span role="img" aria-label="car">{site.sections.carpool.offeringCard.icon}</span>
                        <span>{site.sections.carpool.offeringCard.title}</span>
                      </h3>
                      <p className="text-sm text-text-dark/70 mt-2 font-body tracking-normal">
                        {site.sections.carpool.offeringCard.description}
                      </p>
                    </div>

                    <div className="frost-layer">
                      <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2 tracking-wide">
                        <span role="img" aria-label="raising hand">{site.sections.carpool.needingCard.icon}</span>
                        <span>{site.sections.carpool.needingCard.title}</span>
                      </h3>
                      <p className="text-sm text-text-dark/70 mt-2 font-body tracking-normal">
                        {site.sections.carpool.needingCard.description}
                      </p>
                    </div>
                  </div>

                  <div className="card-base">
                    <h3 className="text-2xl font-display font-bold mb-6 text-primary border-b-2 border-secondary/30 pb-3 tracking-wide">{site.sections.carpool.formHeading}</h3>
                    <CarpoolForm />
                  </div>
                </div>

                {/* Right Side: Bulletin Board */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <CarpoolBulletinBoard />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ActiveSectionContext.Provider>
  );
}

// Hook to use active section context
export const useActiveSection = () => useContext(ActiveSectionContext);

