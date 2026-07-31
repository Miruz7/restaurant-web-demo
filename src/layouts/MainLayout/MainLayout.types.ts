import type { CSSProperties, ReactNode } from "react";

export interface MainLayoutProps {
  /** Contenido que se renderiza dentro del <main> (landmark principal). */
  readonly children: ReactNode;
  /** Clases extra opcionales, pasadas al contenedor interno de <main>. */
  readonly className?: string;
  /** Estilos inline opcionales (raramente necesarios). */
  readonly style?: CSSProperties;
}
