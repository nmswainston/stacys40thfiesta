import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import site from "../../data/siteData";

export default function Layout(){
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-western-overlay">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-brand-600 focus:rounded"
      >
        Skip to content
      </a>

      {/* Navigation bar */}
      <header role="banner" className="sticky top-0 z-40 bg-cream/90 border-b border-secondary/20 backdrop-blur-sm shadow-[0_1px_0_0_rgba(160,116,82,0.15)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink 
            to="/" 
            className="text-xl font-display tracking-wide flex items-center gap-2 text-primary focus-ring"
            aria-label="Home - Stacy's 40th Fiesta"
          >
            <img src="/assets/vaquero.svg" alt="" className="vaquero-8 vaquero-shadow opacity-90" width="32" height="32" loading="eager" />
            <span>Stacy's 40th</span>
          </NavLink>
          <nav className="flex gap-4" aria-label="Main navigation">
            {[
              ["Home","/"],
              ["Stay","/stay"],
              ["Agenda","/agenda"],
              ["RSVP","/rsvp"],
              ["Share a Memory","/memories"],
              ["Travel","/travel"],
            ].map(([label, to]) => (
              <NavLink 
                key={to} 
                to={to} 
                className={({isActive})=>`smallcaps px-3 py-2 text-sm text-text-dark/90 hover:text-primary focus-ring transition-colors ${isActive ? 'underline decoration-primary' : 'hover:underline decoration-primary/70'}`}
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" className="text-ink pt-20" role="main">
        <Outlet />
      </main>
      <footer className="py-10 text-center text-sm opacity-70 text-ink border-t border-brand-200 mt-12" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex justify-center gap-4 mb-4 text-sm" aria-label="Footer navigation">
            <NavLink to="/stay" className="link hover:text-brand-700">Stay</NavLink>
            <NavLink to="/agenda" className="link hover:text-brand-700">Agenda</NavLink>
            <NavLink to="/rsvp" className="link hover:text-brand-700">RSVP</NavLink>
            <NavLink to="/memories" className="link hover:text-brand-700">Share a Memory</NavLink>
            <NavLink to="/carpool" className="link hover:text-brand-700">Carpool</NavLink>
            <NavLink to="/travel" className="link hover:text-brand-700">Travel</NavLink>
          </nav>
          <p>© 2025 • Stacy's 40th Celebration</p>
        </div>
      </footer>
    </div>
  );
}

