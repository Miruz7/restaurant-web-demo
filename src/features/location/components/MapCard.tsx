/**
 * MapCard.tsx — Sprint 12.4 Location Showcase.
 *
 * Tarjeta premium de mapa (columna derecha / abajo mobile).
 *   • Vidrio glass + borde suave + radio 24 + sombra editorial.
 *   • Header con título + subtítulo.
 *   • Frame responsive 4:3/5:4 (conservar aspect ratio).
 *   • Iframe Google Maps embed (URL desde constants).
 *   • Hover ligero sube 3px + intensifica sombra.
 */

import type { LocationData } from "../Location.types";
import {
  LOCATION_MAP_CARD_CLASS,
  LOCATION_MAP_CARD_HEADER_CLASS,
  LOCATION_MAP_CARD_SUBTITLE_CLASS,
  LOCATION_MAP_CARD_TITLE_CLASS,
  LOCATION_MAP_FRAME_CLASS,
  LOCATION_MAP_IFRAME_CLASS,
} from "../Location.config";
import { cn } from "@/lib/cn";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { CINEMATIC_EXCLUDE_BLUR_ATTR } from "@/features/storytellingNavigation/CinematicScene.config";

export interface MapCardProps {
  readonly map: LocationData["map"];
  readonly primaryHref: string;
  readonly className?: string;
}

export default function MapCard({ map, primaryHref, className }: MapCardProps): ReactElement {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  /* Evita CLS: carga perezosa del iframe hasta mount.
     onLoad → opacidad completa. 0 reflow. */
  useEffect(() => {
    let mounted = true;
    const t = window.setTimeout(() => {
      if (mounted) setIsLoaded(true);
    }, 140);
    return () => {
      mounted = false;
      window.clearTimeout(t);
    };
  }, []);

  return (
    <figure
      className={cn(LOCATION_MAP_CARD_CLASS, className)}
      {...{ [CINEMATIC_EXCLUDE_BLUR_ATTR]: "" as const }}
    >
      {/* ----- Header -------------------------------------------------- */}
      <figcaption
        className={LOCATION_MAP_CARD_HEADER_CLASS}
        style={{ paddingTop: 12, paddingLeft: 16 }}
      >
        <div className="flex flex-col items-start min-w-0">
          <span className={LOCATION_MAP_CARD_TITLE_CLASS}>{map.title}</span>
          <span className={LOCATION_MAP_CARD_SUBTITLE_CLASS}>{map.subtitle}</span>
        </div>
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Abrir ubicación en Google Maps"
          className={cn(
            "flex-none inline-flex items-center gap-[8px]",
            "px-[14px] py-[13px] md:py-[13.5px]",
            "rounded-10",
            "bg-white/10 border border-white/14",
            "text-white text-[13px] font-semibold",
            "hover:bg-white/18 hover:border-white/26",
            "transition-[background-color,border-color,transform,opacity] duration-[240ms] ease-[cubic-bezier(.22,1,.36,1)]",
            "hover:-translate-y-[1px]",
            "min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:rounded-10",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[16px] w-[16px]"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
          <span>Abrir</span>
        </a>
      </figcaption>

      {/* ----- Frame iframe -------------------------------------------- */}
      <div
        className={LOCATION_MAP_FRAME_CLASS}
        role="img"
        aria-label={`${map.title}: ${map.subtitle}`}
      >
        {isLoaded && (
          <iframe
            ref={iframeRef}
            title={map.title}
            src={map.iframeSrc}
            width={map.width}
            height={map.height}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="fullscreen;loading=lazy"
            className={cn(LOCATION_MAP_IFRAME_CLASS, "opacity-0")}
            onLoad={() => {
              if (iframeRef.current) {
                iframeRef.current.style.opacity = "1";
              }
            }}
          />
        )}
        {!isLoaded && (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="h-[26px] w-[26px] rounded-full border-[3px] border-white/18 border-t-white/82 animate-spin" />
          </div>
        )}
      </div>
    </figure>
  );
}
