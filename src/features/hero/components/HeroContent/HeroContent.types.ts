/**
 * HeroContent.types.ts
 *
 * Props del bloque textual del Hero.
 * TODO el contenido copy se pasa por props (nunca hardcode en el componente).
 *
 * =====================================================================
 * ESTRUCTURA DE SUBCOMPONENTES FUTURA (Sprint 10.3+)
 * =====================================================================
 * Cuando el Hero crezca (nuevas variantes, marketing A/B tests, métricas,
 * CTAs especiales, badges dinámicos, etc.), descomponer el markup interno
 * en 5 subcomponentes ESPECÍFICOS DEL HERO:
 *
 *   HeroContent (actual)
 *     ├── HeroBadge          <- Badge categoría (hoy renderizado con <Text>)
 *     ├── HeroHeading        <- H1 con overrides (hoy markup inline)
 *     ├── HeroDescription    <- Text descriptivo (hoy <Text>)
 *     ├── HeroActions        <- Slot actions wrapper (hoy div+CTAGroup)
 *     └── HeroMetrics        <- Row métricas (hoy slot metrics sin implementar)
 *
 * NO implementar todavía. Solo dejar preparado que HeroContent.tsx NO debe
 * crecer >150 líneas; en ese momento, extraer sub-bloques a carpetas hijas.
 * =====================================================================
 */

import type { ReactNode } from "react";

export interface HeroContentProps {
  /** HTML id="" asociado al H1 (para aria-labelledby del <section> Hero). */
  readonly headingId?: string;

  /** Badge de categoría arriba del título (opcional). */
  readonly badge?: ReactNode;

  /** Título H1 (único por página). */
  readonly heading: ReactNode;

  /** Texto de descripción. */
  readonly description?: ReactNode;

  /** Bloque de CTAs (normalmente <CTAGroup> con 2x <Button>). */
  readonly actions?: ReactNode;

  /** Métricas / Trust row (FUTURO Sprint 11.x — opcional, placeholder). */
  readonly metrics?: ReactNode;

  /** Clase extendida sobre el stack flex. */
  readonly className?: string;
}
