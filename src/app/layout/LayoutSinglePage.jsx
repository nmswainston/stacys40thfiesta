import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useActiveSection } from "../../routes/HomeSinglePage";
import site from "../../data/siteData";

export default function LayoutSinglePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change and scroll to top
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Navigation items from site data
  const scrollNavItems = site.navigation.homeScroll;
  const otherPageNavItems = site.navigation.otherPages;

  // Function to handle smooth scroll to section
  const handleScrollToSection = (e, sectionId) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false); // Close menu after clicking
      }
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden lg:flex gap-2 sm:gap-4 flex-wrap justify-end items-center" aria-label="Main navigation">
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
                otherPageNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `smallcaps px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-brand-700/90 hover:text-brand-700 rounded focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 whitespace-nowrap ${
                        isActive ? "underline decoration-brand-400" : "hover:underline decoration-brand-400/70"
                      }`
                    }
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </NavLink>
                ))
              )}
            </nav>

            {/* Mobile Menu Button - Visible on Mobile Only */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center p-2 text-brand-700 hover:text-brand-600 hover:bg-brand-200 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-brand-200">
            <span className="font-display text-lg text-brand-700 tracking-tight">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-brand-700 hover:text-brand-600 hover:bg-brand-200 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              aria-label="Close navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2">
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
                      className={`smallcaps px-4 py-3 text-base rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                        isActive
                          ? "bg-brand-600 text-cream border-2 border-brand-800 font-bold"
                          : "text-brand-700 hover:text-brand-600 hover:bg-brand-100"
                      }`}
                      aria-current={activeSection === item.id ? "true" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })
              ) : (
                // Regular navigation for other pages
                otherPageNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `smallcaps px-4 py-3 text-base rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                        isActive 
                          ? "bg-brand-100 text-brand-700 font-bold border-l-4 border-brand-600" 
                          : "text-brand-700 hover:text-brand-600 hover:bg-brand-50"
                      }`
                    }
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </NavLink>
                ))
              )}
            </div>
          </nav>
        </div>
      </div>

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
              otherPageNavItems.filter(item => item.path !== "/").map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className="link hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
                >
                  {item.label}
                </NavLink>
              ))
            )}
          </nav>
          <p className="text-xs sm:text-sm">© 2025 • Stacy's 40th Celebration</p>
        </div>
      </footer>
    </div>
  );
}

