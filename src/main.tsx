import { ErrorBoundary } from "@components/layout";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
