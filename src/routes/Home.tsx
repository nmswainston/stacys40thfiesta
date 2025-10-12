import { EVENT_DATE, ROUTES } from "@/constants";
import { ActiveSectionContext, useCountdown, useSectionObserver } from "@/hooks";
import site from "@data/siteData";
import { CarpoolBulletinBoard, CarpoolForm } from "@features/carpool";
import { MemoryFeed, MemoryForm } from "@features/memories";
import { fireConfetti } from "@lib/utils/confetti";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export { useActiveSection } from "@/hooks";

export default function Home() {
  const timeLeft = useCountdown(EVENT_DATE);
  const [activeSection, setActiveSection] = useState("welcome");
  
  const sectionRefs = {
    welcome: useRef<HTMLElement>(null),
    agenda: useRef<HTMLElement>(null),
    rsvp: useRef<HTMLElement>(null),
    stay: useRef<HTMLElement>(null),
    memories: useRef<HTMLElement>(null),
    carpool: useRef<HTMLElement>(null),
    travel: useRef<HTMLElement>(null),
  };

  // Observe sections for active tracking
  useSectionObserver(sectionRefs, setActiveSection);

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
              
              <div className="relative px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 text-center -mt-[100px]">
                {/* Festive Bienvenidos Header */}
                <div className="mb-3 sm:mb-4">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide font-display text-accent leading-tight">
                    {site.hero.oleText}
                  </div>
                </div>

                {/* Hero Title with Stylized 40 */}
                <div className="mt-3 sm:mt-4">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display text-primary leading-tight tracking-wide px-2">
                    {site.hero.mainTitle}
                  </h1>
                </div>

              {/* Celebrate Stacy Subline with Stars */}
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-brand-700/80 flex-wrap px-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-accent opacity-80 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-base sm:text-lg md:text-xl font-bold text-accent">
                  {site.hero.celebrationText}
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-accent opacity-80 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-dark/80 max-w-2xl mx-auto px-4 font-body tracking-normal leading-relaxed">
                  {site.hero.subtitle}
                </p>

                {/* Countdown */}
                <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 px-2" aria-live="polite" aria-label="Countdown to event">
                  <div className="grid grid-cols-4 gap-2 sm:gap-0 max-w-xl mx-auto sm:divide-x divide-secondary/30">
                    <div className="text-center px-1 sm:px-2">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent font-accent">
                        {timeLeft.days}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-text-dark/80 uppercase tracking-wide mt-0.5 sm:mt-1 font-body">days</div>
                    </div>
                    <div className="text-center px-1 sm:px-2">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent font-accent">
                        {timeLeft.hours}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-text-dark/80 uppercase tracking-wide mt-0.5 sm:mt-1 font-body">hours</div>
                    </div>
                    <div className="text-center px-1 sm:px-2">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent font-accent">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-text-dark/80 uppercase tracking-wide mt-0.5 sm:mt-1 font-body">mins</div>
                    </div>
                    <div className="text-center px-1 sm:px-2">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent font-accent">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-text-dark/80 uppercase tracking-wide mt-0.5 sm:mt-1 font-body">secs</div>
                    </div>
                  </div>
                </div>

                {/* Ornament Divider */}
                <div className="rule-ornate mt-6 mb-8 mx-auto" aria-hidden="true" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-4">
                  <img
                    src="/assets/vaquero.svg"
                    alt="Vaquero"
                    className="w-10 h-10 sm:w-12 sm:h-12 opacity-90 flex-shrink-0"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <div className="text-sm sm:text-base font-medium text-text-dark/80 font-body tracking-normal text-center leading-relaxed">
                    <div className="block">{site.hero.date}</div>
                    <div className="block mt-1">{site.hero.location}</div>
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
              
              <div className="relative text-center mb-8 sm:mb-10 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wide">{site.sections.agenda.heading}</h2>
                <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-text-dark/80 font-body tracking-normal leading-relaxed max-w-2xl mx-auto">
                  {site.sections.agenda.subheading}
                </p>
              </div>
              <div className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
                {site.agenda.map((s, i) => (
                  <article key={i} className="card-base focus-within:ring-2 focus-within:ring-primary/50 flex flex-col h-full">
                    {/* Header with icon and day */}
                    <div className="flex items-start sm:items-center gap-3 mb-4">
                      <div className="text-2xl sm:text-3xl flex-shrink-0" role="img" aria-label={`${s.title} icon`}>
                        {s.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-extrabold text-primary font-display tracking-wide leading-tight whitespace-pre-line break-words">{s.day}</h3>
                        <div className="font-semibold text-sm sm:text-base text-text-dark font-body tracking-normal leading-tight mt-1">{s.title}</div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="text-sm font-body tracking-normal text-text-dark/80 mb-4 flex-1 leading-relaxed">
                      {s.details}
                    </div>
                    
                    {/* Learn more link */}
                    {s.link && (
                      <div className="mb-4">
                        <a
                          className="text-secondary hover:text-primary underline font-body tracking-normal focus-ring text-sm font-medium"
                          href={s.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {s.linkText || "View Details"} →
                        </a>
                      </div>
                    )}
                    
                    {/* Time and cost footer */}
                    <div className="mt-auto pt-3 border-t border-secondary/20">
                      <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-text-dark/80">
                          <span className="text-accent text-sm">🕐</span>
                          <span className="font-body tracking-normal">{s.time}</span>
                        </div>
                        {s.estimatedCost && (
                          <div className="flex items-center gap-1.5 sm:gap-2 text-text-dark/70">
                            <span className="text-accent text-sm">💰</span>
                            <span className="font-body tracking-normal font-medium">{s.estimatedCost}</span>
                          </div>
                        )}
                      </div>
                    </div>
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
              
              <div className="relative text-center mb-8 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wide">{site.sections.rsvp.heading}</h2>
                <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-dark/90 font-body font-normal leading-loose max-w-lg mx-auto whitespace-pre-line text-center">
                  {site.sections.rsvp.description}
                </p>
              </div>
              <div className="relative text-center">
                <Link 
                  to={ROUTES.RSVP} 
                  className="btn"
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
              
              <div className="relative text-center mb-8 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wide">{site.sections.stay.heading}</h2>
                <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-text-dark/80 font-body tracking-normal leading-relaxed max-w-2xl mx-auto">
                  {site.sections.stay.description}
                </p>
              </div>
              <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
                {site.stay.amenities.map((amenity, i) => (
                  <div key={i} className="frost-layer text-center">
                    <p className="text-xs sm:text-sm font-semibold font-body tracking-normal leading-relaxed break-words">{amenity}</p>
                  </div>
                ))}
              </div>
              <div className="relative text-center mt-8">
                <Link 
                  to={ROUTES.STAY} 
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
              
              <div className="relative text-center mb-8 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wide">{site.sections.memories.heading}</h2>
                <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-text-dark/80 font-body tracking-normal leading-relaxed max-w-2xl mx-auto">
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
              
              <div className="relative text-center mb-8 sm:mb-10 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wide">{site.sections.carpool.heading}</h2>
                <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-text-dark/80 font-body tracking-normal leading-relaxed max-w-3xl mx-auto">
                  {site.sections.carpool.description}
                </p>
              </div>

              <div className="relative grid lg:grid-cols-2 gap-6 sm:gap-8 mt-8">
                {/* Left Side: Sign Up Form */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="frost-layer">
                      <h3 className="text-base sm:text-lg font-display font-bold text-primary flex items-start sm:items-center gap-2 tracking-wide">
                        <span role="img" aria-label="car" className="text-lg sm:text-xl flex-shrink-0">{site.sections.carpool.offeringCard.icon}</span>
                        <span className="leading-tight">{site.sections.carpool.offeringCard.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-text-dark/70 mt-2 font-body tracking-normal leading-relaxed">
                        {site.sections.carpool.offeringCard.description}
                      </p>
                    </div>

                    <div className="frost-layer">
                      <h3 className="text-base sm:text-lg font-display font-bold text-primary flex items-start sm:items-center gap-2 tracking-wide">
                        <span role="img" aria-label="raising hand" className="text-lg sm:text-xl flex-shrink-0">{site.sections.carpool.needingCard.icon}</span>
                        <span className="leading-tight">{site.sections.carpool.needingCard.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-text-dark/70 mt-2 font-body tracking-normal leading-relaxed">
                        {site.sections.carpool.needingCard.description}
                      </p>
                    </div>
                  </div>

                  <div className="card-base">
                    <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-primary border-b-2 border-secondary/30 pb-3 tracking-wide">{site.sections.carpool.formHeading}</h3>
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

        {/* ===== TRAVEL SECTION ===== */}
        <section 
          id="travel" 
          ref={sectionRefs.travel}
          className="scroll-mt-24 bg-transparent py-16 md:py-24"
        >
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <div className="relative">
              {/* Cream fade overlay for readability */}
              <div className="absolute inset-x-0 -top-8 h-48 pointer-events-none bg-cream-fade" aria-hidden="true" />
              
              <div className="relative text-center mb-8 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wide">{site.travel.heading}</h2>
                <div className="rule-ornate mt-4 sm:mt-6 mx-auto" />
              </div>
              
              <div className="relative grid gap-3 sm:gap-4 mt-8">
                {site.travel.tips.map((tip, i) => (
                  <div key={i} className="frost-layer text-left">
                    <p className="text-xs sm:text-sm font-body tracking-normal text-text-dark/80 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </ActiveSectionContext.Provider>
  );
}


