import { ROUTES } from "@/constants";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutSinglePage from "./layout/LayoutSinglePage";

// Eager load Home for above-the-fold content
import Home from "@routes/Home";

// Lazy load all other routes (below the fold / separate pages)
const Stay = lazy(() => import("@routes/Stay"));
const Agenda = lazy(() => import("@routes/Agenda"));
const RSVP = lazy(() => import("@routes/RSVP"));
const Memories = lazy(() => import("@routes/Memories"));
const Travel = lazy(() => import("@routes/Travel"));
const Slideshow = lazy(() => import("@routes/Slideshow"));
const NotFound = lazy(() => import("@routes/NotFound"));

const router = createBrowserRouter(
  [
    {
      element: <LayoutSinglePage />, 
      children: [
        { path: ROUTES.HOME, element: <Home /> },
        { path: ROUTES.STAY, element: <Stay /> },
        { path: ROUTES.AGENDA, element: <Agenda /> },
        { path: ROUTES.RSVP, element: <RSVP /> },
        { path: ROUTES.MEMORIES, element: <Memories /> },
        { path: ROUTES.TRAVEL, element: <Travel /> },
        { path: ROUTES.SLIDESHOW, element: <Slideshow /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      // @ts-expect-error - v7_startTransition exists in runtime but not in current type definitions
      v7_startTransition: true,
    }
  }
);

export default function App() {
  return (
    <RouterProvider 
      router={router} 
      fallbackElement={
        <div className="min-h-screen flex items-center justify-center bg-western-overlay">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-brand-700 font-body">Loading...</p>
          </div>
        </div>
      }
    />
  );
}

