import { createContext, useContext } from "react";

/**
 * Context for tracking the active section on scroll
 */
export const ActiveSectionContext = createContext<string>("welcome");

/**
 * Hook to access the currently active section
 * @returns The ID of the currently active section
 */
export const useActiveSection = () => useContext(ActiveSectionContext);

