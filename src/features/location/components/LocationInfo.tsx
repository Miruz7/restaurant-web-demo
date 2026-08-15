/**
 * LocationInfo.tsx — Sprint 12.4 Location Showcase.
 *
 * Bloque de información editorial (columna izquierda / arriba mobile).
 *   • Eyebrow + Heading + Description.
 *   • 4 info items: Dirección · Horario · Teléfono · WhatsApp.
 *   • 2 CTAs: Cómo llegar · Llamar.
 */

import type { LocationData, LocationIconKey } from "../Location.types";
import {
  LOCATION_ACTIONS_CLASS,
  LOCATION_CTA_PRIMARY_CLASS,
  LOCATION_CTA_SECONDARY_CLASS,
  LOCATION_DESCRIPTION_CLASS,
  LOCATION_EYEBROW_CLASS,
  LOCATION_HEAD_CLASS,
  LOCATION_HEADING_CLASS,
  LOCATION_INFO_ICON_CLASS,
  LOCATION_INFO_ICON_WRAP_CLASS,
  LOCATION_INFO_ITEM_CLASS,
  LOCATION_INFO_LABEL_CLASS,
  LOCATION_INFO_LIST_CLASS,
  LOCATION_INFO_ROOT_CLASS,
  LOCATION_INFO_VALUE_CLASS,
  LOCATION_SCHEDULE_DAY_CLASS,
  LOCATION_SCHEDULE_HOURS_CLASS,
  LOCATION_SCHEDULE_LABEL_CLASS,
} from "../Location.config";
import { cn } from "@/lib/cn";
import type { ReactElement } from "react";

/* ---- Iconos SVG inline premium · stroke white · stroke-width 1.75. ------- */

const ICON_PATH: Record<LocationIconKey, ReactElement> = {
  map: (
    <>
      <path d="M12 21s-7-4.35-7-10a7 7 0 0114 0c0 5.65-7 10-7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  phone: (
    <path d="M22 16.92V20a2 2 0 01-2.18 2A19.79 19.79 0 012 4.18 2 2 0 014 2h3.09a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  ),
  whatsapp: (
    <>
      <path d="M20.52 3.48A11.92 11.92 0 0012.04 0C5.47 0 .13 5.33.13 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.36-1.67a11.9 11.9 0 005.68 1.45h.01c6.57 0 11.91-5.33 11.91-11.91 0-3.18-1.24-6.17-3.44-8.39z" />
      <path d="M17.37 14.92c-.28-.14-1.66-.82-1.92-.92s-.44-.14-.62.14-.7.92-.86 1.11-.32.22-.6.07c-.28-.15-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93s-.02-.43.12-.57c.12-.12.28-.32.42-.48.14-.16.18-.28.28-.47.1-.19.05-.36-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48h-.53c-.18 0-.48.07-.73.34-.25.28-.96.93-.96 2.27 0 1.34.98 2.64 1.12 2.82.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.53-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.2-.54-.34z" />
    </>
  ),
};

function LocationIcon({
  name,
  className,
}: {
  readonly name: LocationIconKey;
  readonly className?: string;
}): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICON_PATH[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------------- */

export interface LocationInfoProps {
  readonly data: LocationData;
  readonly className?: string;
  readonly headingId?: string;
}

export default function LocationInfo({
  data,
  className,
  headingId,
}: LocationInfoProps): ReactElement {
  return (
    <div className={cn(LOCATION_INFO_ROOT_CLASS, className)}>
      {/* ----- Head: eyebrow · heading · description --------------------- */}
      <header className={LOCATION_HEAD_CLASS}>
        <span className={LOCATION_EYEBROW_CLASS}>{data.eyebrow}</span>
        <h2 id={headingId} className={LOCATION_HEADING_CLASS}>
          {data.heading}
        </h2>
        <p className={LOCATION_DESCRIPTION_CLASS}>{data.description}</p>
      </header>

      {/* ----- Info list · 4 items --------------------------------------- */}
      <dl className={LOCATION_INFO_LIST_CLASS}>
        {/* Dirección */}
        <div className={LOCATION_INFO_ITEM_CLASS}>
          <div className={LOCATION_INFO_ICON_WRAP_CLASS} aria-hidden="true">
            <LocationIcon name={data.address.icon} className={LOCATION_INFO_ICON_CLASS} />
          </div>
          <div className="min-w-0 flex-1">
            <dt className={LOCATION_INFO_LABEL_CLASS}>{data.address.label}</dt>
            <dd className={LOCATION_INFO_VALUE_CLASS}>{data.address.value}</dd>
          </div>
        </div>

        {/* Horario */}
        <div className={LOCATION_INFO_ITEM_CLASS}>
          <div className={LOCATION_INFO_ICON_WRAP_CLASS} aria-hidden="true">
            <LocationIcon name={data.schedule.icon} className={LOCATION_INFO_ICON_CLASS} />
          </div>
          <div className="min-w-0 flex-1">
            <dt className={LOCATION_INFO_LABEL_CLASS}>{data.schedule.label}</dt>
            <dd className="flex flex-col items-stretch">
              {data.schedule.days.map((day) => (
                <div key={`${day.label}-${day.hours}`} className={LOCATION_SCHEDULE_DAY_CLASS}>
                  <span
                    className={cn(
                      LOCATION_SCHEDULE_LABEL_CLASS,
                      day.highlight ? "text-white font-medium" : "",
                    )}
                  >
                    {day.label}
                  </span>
                  <span className={LOCATION_SCHEDULE_HOURS_CLASS}>{day.hours}</span>
                </div>
              ))}
            </dd>
          </div>
        </div>

        {/* Teléfono */}
        <div className={LOCATION_INFO_ITEM_CLASS}>
          <div className={LOCATION_INFO_ICON_WRAP_CLASS} aria-hidden="true">
            <LocationIcon name={data.phone.icon} className={LOCATION_INFO_ICON_CLASS} />
          </div>
          <div className="min-w-0 flex-1">
            <dt className={LOCATION_INFO_LABEL_CLASS}>{data.phone.label}</dt>
            <dd>
              <a
                href={data.phone.telUrl}
                className={cn(
                  LOCATION_INFO_VALUE_CLASS,
                  "hover:text-white/86 underline-offset-4 hover:underline",
                  "inline-flex items-center min-h-[44px] w-full",
                )}
                aria-label={`Llamar al ${data.phone.display}`}
              >
                {data.phone.display}
              </a>
            </dd>
          </div>
        </div>

        {/* WhatsApp */}
        <div className={LOCATION_INFO_ITEM_CLASS}>
          <div className={LOCATION_INFO_ICON_WRAP_CLASS} aria-hidden="true">
            <LocationIcon name={data.whatsapp.icon} className={LOCATION_INFO_ICON_CLASS} />
          </div>
          <div className="min-w-0 flex-1">
            <dt className={LOCATION_INFO_LABEL_CLASS}>{data.whatsapp.label}</dt>
            <dd>
              <a
                href={data.whatsapp.waUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={cn(
                  LOCATION_INFO_VALUE_CLASS,
                  "hover:text-white/86 underline-offset-4 hover:underline",
                  "inline-flex items-center min-h-[44px] w-full",
                )}
                aria-label={`Abrir WhatsApp con ${data.whatsapp.display}`}
              >
                {data.whatsapp.display}
              </a>
            </dd>
          </div>
        </div>
      </dl>

      {/* ----- Actions 2 botones ---------------------------------------- */}
      <nav aria-label="Acciones ubicación" className={LOCATION_ACTIONS_CLASS}>
        <a
          href={data.primaryCTA.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={cn(LOCATION_CTA_PRIMARY_CLASS, "min-h-[44px]")}
        >
          <span className="font-sans">{data.primaryCTA.label}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px] flex-none"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </a>
        <a
          href={data.secondaryCTA.href}
          aria-label={`Llamar al restaurante ${data.phone.display}`}
          className={cn(LOCATION_CTA_SECONDARY_CLASS, "min-h-[44px]")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px] flex-none"
            aria-hidden="true"
          >
            <path d="M22 16.92V20a2 2 0 01-2.18 2A19.79 19.79 0 012 4.18 2 2 0 014 2h3.09a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="font-sans">{data.secondaryCTA.label}</span>
        </a>
      </nav>
    </div>
  );
}
