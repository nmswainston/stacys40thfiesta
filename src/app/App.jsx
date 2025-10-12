import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutSinglePage from "./layout/LayoutSinglePage";
import HomeSinglePage from "../routes/HomeSinglePage";
import Stay from "../routes/Stay";
import Agenda from "../routes/Agenda";
import RSVP from "../routes/RSVP";
import Memories from "../routes/Memories";
import Travel from "../routes/Travel";
import Slideshow from "../routes/Slideshow";
import NotFound from "../routes/NotFound";

const router = createBrowserRouter(
  [
    {
      element: <LayoutSinglePage />, 
      children: [
        { path: "/", element: <HomeSinglePage /> },
        { path: "/stay", element: <Stay /> },
        { path: "/agenda", element: <Agenda /> },
        { path: "/rsvp", element: <RSVP /> },
        { path: "/memories", element: <Memories /> },
        { path: "/travel", element: <Travel /> },
        { path: "/slideshow", element: <Slideshow /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    }
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}

