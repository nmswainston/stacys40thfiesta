/**
 * Application route paths
 */

export const ROUTES = {
  HOME: "/",
  STAY: "/stay",
  AGENDA: "/agenda",
  RSVP: "/rsvp",
  MEMORIES: "/memories",
  TRAVEL: "/travel",
  SLIDESHOW: "/slideshow",
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

