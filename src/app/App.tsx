import { ROUTES } from "@/constants";
import Agenda from "@routes/Agenda";
import Home from "@routes/Home";
import Memories from "@routes/Memories";
import NotFound from "@routes/NotFound";
import RSVP from "@routes/RSVP";
import Slideshow from "@routes/Slideshow";
import Stay from "@routes/Stay";
import Travel from "@routes/Travel";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutSinglePage from "./layout/LayoutSinglePage";

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
    }
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}

