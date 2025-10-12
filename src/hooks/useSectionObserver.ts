import { RefObject, useEffect } from "react";

interface SectionRefs {
  [key: string]: RefObject<HTMLElement>;
}

/**
 * Custom hook to observe sections and track which one is currently active
 * @param sectionRefs - Object containing refs for all sections to observe
 * @param setActiveSection - Callback to update active section state
 */
export function useSectionObserver(
  sectionRefs: SectionRefs,
  setActiveSection: (id: string) => void
) {
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
  }, [sectionRefs, setActiveSection]);
}

