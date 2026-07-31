import AppProviders from "@/app/AppProviders";
import { MainLayout } from "@/layouts";
import { HomePage } from "@/pages";

/**
 * App.tsx
 *
 * Punto de entrada principal del árbol React.
 *
 * =====================================================================
 * NOTA DE REUTILIZACIÓN — Sprint 10.1 (Project Foundation)
 * =====================================================================
 * Este Sprint NO crea los componentes atómicos de UI ni de layout.
 * Los siguientes bloques fueron construidos y aprobados en los
 * Sprints 6.x y se REUTILIZAN tal cual (sin modificación interna):
 *
 *   • components/ui/Button, Container, Section
 *   • components/ui/typography/*  (Heading, Text, Caption)
 *   • components/layout/Header (configurado desde constants/layout.ts)
 *   • components/layout/Navigation
 *   • src/lib/cn.ts + src/data/navigation.ts
 *   • src/styles/tokens/*.css + bridge Tailwind @theme en index.css
 *
 * El alcance de Sprint 10.1 es la arquitectura DE CARPETAS, la
 * configuración global (Vite/TS/ESLint/Prettier/env), el shell
 * App → MainLayout → Footer, accesibilidad y placeholders de
 * crecimiento futuro. Ningún componente UI del Sprint 6.x se toca.
 * =====================================================================
 *
 * Sprint 10.1: Capa de Providers → MainLayout (contiene Header + Main + Footer)
 * → HomePage (componente de página, vacío por ahora).
 *
 * La composición está separada intencionalmente:
 *   - AppProviders  : montar TanStack Query, Router, i18n, ThemeProvider...
 *   - MainLayout    : estructura visual del shell global (A11y, skip-link, landmarks)
 *   - Page          : contenido específico por ruta (actualmente HomePage placeholder)
 */
function App() {
  return (
    <AppProviders>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </AppProviders>
  );
}

export default App;
