import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useActiveSection } from "../../routes/HomeSinglePage";
import site from "../../data/siteData";

export default function LayoutSinglePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items for single-page scroll
  const scrollNavItems = [
    { label: "Home", id: "welcome" },
    { label: "Agenda", id: "agenda" },
    { label: "RSVP", id: "rsvp" },
    { label: "Stay", id: "stay" },
    { label: "Memories", id: "memories" },
    { label: "Carpool", id: "carpool" },
  ];

  // Function to handle smooth scroll to section
  const handleScrollToSection = (e, sectionId) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-dvh bg-western-overlay">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-brand-600 focus:rounded focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Skip to content
      </a>

      {/* Navigation bar */}
      <header role="banner">
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-sm shadow-md" : "bg-white/90 backdrop-blur-sm shadow-sm"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
            <NavLink
              to="/"
              className="text-lg sm:text-xl font-display tracking-tight flex items-center gap-2 text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded shrink-0"
              aria-label="Home - Stacy's 40th Fiesta"
            >
              <img
                src="/assets/vaquero.svg"
                alt=""
                className="vaquero-8 vaquero-shadow opacity-90"
                width="32"
                height="32"
                loading="eager"
              />
              <span className="hidden sm:inline">Stacy's 40th Fiesta</span>
              <span className="sm:hidden">Stacy's 40th</span>
            </NavLink>
            <nav className="flex gap-2 sm:gap-4 flex-wrap justify-end items-center" aria-label="Main navigation">
              {isHomePage ? (
                // Scroll navigation for home page
                scrollNavItems.map((item) => {
                  const isHome = item.id === "welcome";
                  const isActive = activeSection === item.id && !isHome;
                  
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollToSection(e, item.id)}
                      className={`smallcaps px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded transition-all focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 whitespace-nowrap ${
                        isActive
                          ? "bg-brand-600 border-2 border-brand-800 font-bold"
                          : "text-brand-700 hover:text-brand-600 hover:bg-brand-200"
                      } ${isActive ? 'text-cream' : ''}`}
                      aria-current={activeSection === item.id ? "true" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })
              ) : (
                // Regular navigation for other pages
                [
                  ["Home", "/"],
                  ["Stay", "/stay"],
                  ["Agenda", "/agenda"],
                  ["RSVP", "/rsvp"],
                  ["Memories", "/memories"],
                  ["Travel", "/travel"],
                ].map(([label, to]) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `smallcaps px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-brand-700/90 hover:text-brand-700 rounded focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 whitespace-nowrap ${
                        isActive ? "underline decoration-brand-400" : "hover:underline decoration-brand-400/70"
                      }`
                    }
                    aria-label={`Navigate to ${label}`}
                  >
                    {label}
                  </NavLink>
                ))
              )}
            </nav>
          </div>
        </div>
      </header>
      <main id="main-content" className="text-ink pt-20" role="main">
        <Outlet />
      </main>
      <footer className="py-8 sm:py-10 text-center text-sm opacity-70 text-ink border-t border-brand-200 mt-12" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex justify-center items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm flex-wrap" aria-label="Footer navigation">
            {isHomePage ? (
              scrollNavItems.slice(1).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollToSection(e, item.id)}
                  className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))
            ) : (
              <>
                <NavLink to="/stay" className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap">
                  Stay
                </NavLink>
                <NavLink to="/agenda" className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap">
                  Agenda
                </NavLink>
                <NavLink to="/rsvp" className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap">
                  RSVP
                </NavLink>
                <NavLink to="/memories" className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap">
                  Share a Memory
                </NavLink>
                <NavLink to="/carpool" className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap">
                  Carpool
                </NavLink>
                <NavLink to="/travel" className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap">
                  Travel
                </NavLink>
              </>
            )}
          </nav>
          <p className="text-xs sm:text-sm">© 2025 • Stacy's 40th Celebration</p>
        </div>
      </footer>
    </div>
  );
}

