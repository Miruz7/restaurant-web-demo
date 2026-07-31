/**
 * src/pages/Home/HomePage.tsx
 *
 * Página "Home" / Landing.
 *
 * Sprint 10.1 = infraestructura. El contenido definitivo vendrá
 * en sprints posteriores (Hero, Productos, Servicios, etc.).
 *
 * Nota: HomePage NO monta su propio MainLayout. App.tsx envuelve la página
 * con el Layout global. Esto evita doble-wrapping y permite que páginas
 * especiales (Login, Dashboard...) elijan su propio Layout desde layouts/.
 */

import { cn } from "@/lib/cn";

export interface HomePageProps {
  readonly className?: string;
}

function HomePage({ className }: HomePageProps) {
  return <div className={cn("min-h-[60vh]", className)} />;
}

export default HomePage;
