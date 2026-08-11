//ubicación: C:\Users\Madlc\Desktop\ProyectoPersonal\Papeleria\papeleria-nova\src\features\location\LocationSection.tsx
/**
 * LocationSection.tsx — Sprint 12.4.3 Editorial Grid Architecture.
 *                         + Sprint 12.5.4 Cinematic Footer Reveal Overlay Layer.
 *
 * USO NUEVA RETÍCULA COMPARTIDA:
 *   · EditorialContainer (safe 1280 + pad 24/48/84).
 *   · EditorialGrid (cols 560 · gap 120 · justify-center).
 *   · LEFT 560 = Info editorial.
 *   · RIGHT 560 = Mapa (flex items-center justify-center → centrado natural).
 *
 * ✅ SIN hacks alineación: 0 pl / 0 ml / 0 translateX / 0 translateY.
 *
 * NUEVO (Sprint 12.5.4):
 *   Orden final de capas cinematográficas (mismo stacking que Hero):
 *     1) Backdrop Photo · z -20
 *     2) Radial Halo info · z -10
 *     3) Overlay editorial Hero i08 · z 1
 *   + 4) ✨ Footer Reveal Overlay (solo oscurece Location, fade black 0 → 55%) · z 2
 *     5) Contenido (EditorialContainer + Grid + Info + MapCard) · z 10
 *
 *   El progreso eased 0→1 proviene de FooterRevealBus (Singleton IO Footer).
 *   → Scroll-driven (Azur Promilia), no tiempo fijo.
 */

import { cn } from "@/lib/cn";
import { EditorialContainer, EditorialGrid, EDITORIAL_SCENE_INNER_CLASS } from "@/shared/editorial";
import {
  LOCATION_BACKDROP_PHOTO_CLASS,
  LOCATION_ENTRY_CLASS,
  LOCATION_ENTRY_PLAY_CLASS,
  LOCATION_INFO_HALO_RADIAL_CLASS,
  LOCATION_OVERLAY_CLASS,
  LOCATION_SECTION_BG_CLASS,
} from "./Location.config";
import { DEFAULT_LOCATION_SECTION_ID, LOCATION_DATA } from "./Location.constants";
import LocationInfo from "./components/LocationInfo";
import MapCard from "./components/MapCard";
import locationStorefrontSrc from "./assets/location-storefront-day.webp";
import { FooterRevealBus } from "@/features/footer/FooterReveal.bus";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactElement } from "react";

export interface LocationSectionProps {
  readonly id?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/**
 * Overlay Footer Reveal (Sprint 12.5.4):
 *   · Clase base: absolute inset-0 · bg-black pure.
 *   · pointer-events-none · select-none.
 *   · Opacity 0→MAX via style (dinámico por FooterRevealBus eased progress).
 *   · Z 2: después del Overlay editorial (z 1), antes del contenido (z 10).
 *   · Solo afecta LOCATION. No Hero. No Featured. No Footer.
 *
 * ⭐ Sprint 12.5.5.a: Intensidad reveal MÁXIMO 12% (0.12) para
 *   mantener el mapa ~88% iluminado, nunca oscuro (objetivo 5).
 *   Antes 0.55 (55% oscurecimiento) → demasiado agresivo.
 */
const LOCATION_REVEAL_OVERLAY_BASE_CLASS = [
  "pointer-events-none absolute inset-0 select-none",
  "z-[2] bg-black",
  "will-change-opacity",
].join(" ");

const LOCATION_REVEAL_MAX_OPACITY = 0.55;

export default function LocationSection({
  id = DEFAULT_LOCATION_SECTION_ID,
  className,
  style,
}: LocationSectionProps): ReactElement {
  const entryRef = useRef<HTMLDivElement | null>(null);
  const [entryPlay, setEntryPlay] = useState<boolean>(false);

  /* NUEVO Sprint 12.5.4: Eased progress IO Footer → oscurecer Location. */
  const [revealProgress, setRevealProgress] = useState<number>(() =>
    FooterRevealBus.getCurrentProgress(),
  );

  useEffect(() => {
    let mounted = true;
    const raf1 = window.requestAnimationFrame(() => {
      const raf2 = window.requestAnimationFrame(() => {
        if (mounted) setEntryPlay(true);
      });
      return () => window.cancelAnimationFrame(raf2);
    });
    return () => {
      mounted = false;
      window.cancelAnimationFrame(raf1);
    };
  }, []);

  /* NUEVO Sprint 12.5.4: Suscripción al progress eased del Footer Reveal. */
  useEffect(() => {
    const unsubscribe = FooterRevealBus.subscribe((eased) => {
      setRevealProgress(eased);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const backDropStyle = useMemo<CSSProperties>(
    () => ({
      backgroundImage: `url(${locationStorefrontSrc})`,
    }),
    [],
  );

  /* Sprint 12.5.4.a: Reveal Overlay opacity = clamp(eased, 0, 1) * 0.55.
   *   - Garantiza NEVER > 55% (Objetivo 9).
   *   - Montaje inicial eased=0 → opacity 0% exacto (Objetivo 2).
   */
  const revealOverlayStyle = useMemo<CSSProperties>(() => {
    const clampedProgress =
      Number.isFinite(revealProgress) && revealProgress >= 0
        ? revealProgress > 1
          ? 1
          : revealProgress
        : 0;
    const nextOpacity = clampedProgress * LOCATION_REVEAL_MAX_OPACITY;
    return {
      opacity: Number(nextOpacity.toFixed(3)),
    };
  }, [revealProgress]);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(LOCATION_SECTION_BG_CLASS, className)}
      style={style}
    >
      {/* 1) Fondo fotográfico · capa -20 */}
      <div aria-hidden="true" style={backDropStyle} className={LOCATION_BACKDROP_PHOTO_CLASS} />
      {/* 2) Radial suave detrás del info · capa -10 */}
      <div aria-hidden="true" className={LOCATION_INFO_HALO_RADIAL_CLASS} />
      {/* 3) Hero Overlay editorial scene intensity i08 · capa 1 */}
      <div aria-hidden="true" className={LOCATION_OVERLAY_CLASS} />
      {/* 4) ✨ NUEVO · Footer Reveal Overlay · capa 2 */}
      <div
        aria-hidden="true"
        className={LOCATION_REVEAL_OVERLAY_BASE_CLASS}
        style={revealOverlayStyle}
      />

      <EditorialContainer className="h-full w-full relative z-10">
        <div className={EDITORIAL_SCENE_INNER_CLASS}>
          <div
            ref={entryRef}
            className={cn(LOCATION_ENTRY_CLASS, entryPlay && LOCATION_ENTRY_PLAY_CLASS)}
          >
            <EditorialGrid
              mobileReverse
              left={
                <LocationInfo
                  data={LOCATION_DATA}
                  headingId={`${id}-heading`}
                  className="[&_h2]:[scroll-margin-top:0]"
                />
              }
              right={
                <MapCard map={LOCATION_DATA.map} primaryHref={LOCATION_DATA.primaryCTA.href} />
              }
              gridClassName="h-full w-full"
            />
          </div>
        </div>
      </EditorialContainer>
    </section>
  );
}
