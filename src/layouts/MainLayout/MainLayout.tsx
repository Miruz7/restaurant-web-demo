import { cn } from "@/lib/cn";
import {
  MAIN_LAYOUT_MAIN_CLASS,
  MAIN_LAYOUT_MAIN_ID,
  MAIN_LAYOUT_SHELL_CLASS,
  MAIN_LAYOUT_SKIP_LINK_CLASS,
} from "./MainLayout.config";
import type { MainLayoutProps } from "./MainLayout.types";

/**
 * MainLayout
 *
 * ⭐ Sprint 12.5.5.a — Storytelling Exit Correction & Minimal Footer Architecture.
 * RETIRADA de Header global y Footer global del shell MainLayout.
 * La página final es 100%:
 *   Storytelling (Hero ↓ Featured ↓ Location) ↓ Footer (Minimal Editorial).
 *   - SIN segunda página.
 *   - SIN Header duplicado después del Storytelling.
 *   - SIN components/layout/Footer.tsx antiguo corporativo.
 *
 * Solo mantenemos:
 *   · Skip link (A11y).
 *   · <main> landmark (children = HomePage).
 */
function MainLayout({ children, className, style }: MainLayoutProps) {
  return (
    <div className={MAIN_LAYOUT_SHELL_CLASS} data-layout="main">
      {/* 1. Skip link (solo visible en foco de teclado) */}
      <a href={`#${MAIN_LAYOUT_MAIN_ID}`} className={MAIN_LAYOUT_SKIP_LINK_CLASS}>
        Saltar al contenido principal
      </a>

      {/* 2. Main — landmark principal con id para skip-link + tabindex=-1 para foco programático
           · Sprint 12.5.5.a: NO paddingTop (ya no hay Header que empujar el flujo). */}
      <main
        id={MAIN_LAYOUT_MAIN_ID}
        role="main"
        tabIndex={-1}
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          margin: 0,
          scrollMarginTop: 16,
          ...style,
        }}
        className={cn(MAIN_LAYOUT_MAIN_CLASS, className)}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
