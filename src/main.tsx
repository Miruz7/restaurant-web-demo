import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";

/**
 * Punto de entrada del runtime.
 * - StrictMode: detecta efectos colgantes y anti-patrones en dev.
 * - Index.css: carga tokens, tailwind, reset + base.
 * - App.tsx: monta Providers → Layout → Página.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
