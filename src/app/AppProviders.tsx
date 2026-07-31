/**
 * src/app/AppProviders.tsx
 *
 * Punto único donde montar Providers globales (TanStack Query,
 * Router, Theme, i18n, TooltipProvider, etc.).
 *
 * Actualmente el proyecto no requiere providers adicionales.
 * La estructura existe para evitar refactors cuando se añadan.
 */

import type { ReactNode } from "react";

export interface AppProvidersProps {
  readonly children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>;
}

export default AppProviders;
