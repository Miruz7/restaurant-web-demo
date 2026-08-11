/**
 * Location.types.ts — Sprint 12.4 Location Showcase.
 *
 * Contratos tipados para la nueva escena editorial de Ubicación.
 *   • Tipos SSOT — sin dependencias del motor Storytelling.
 */

export interface LocationScheduleDay {
  readonly label: string;
  readonly hours: string;
  readonly highlight?: boolean;
}

export interface LocationData {
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
  readonly address: {
    readonly icon: "map";
    readonly label: string;
    readonly value: string;
    readonly gmapsUrl: string;
  };
  readonly schedule: {
    readonly icon: "clock";
    readonly label: string;
    readonly days: ReadonlyArray<LocationScheduleDay>;
  };
  readonly phone: {
    readonly icon: "phone";
    readonly label: string;
    readonly display: string;
    readonly telUrl: string;
  };
  readonly whatsapp: {
    readonly icon: "whatsapp";
    readonly label: string;
    readonly display: string;
    readonly waUrl: string;
  };
  readonly map: {
    readonly title: string;
    readonly subtitle: string;
    readonly iframeSrc: string;
    readonly width: number;
    readonly height: number;
  };
  readonly primaryCTA: {
    readonly label: string;
    readonly href: string;
  };
  readonly secondaryCTA: {
    readonly label: string;
    readonly href: string;
  };
}

export type LocationIconKey = "map" | "clock" | "phone" | "whatsapp";

export const LOCATION_ICON_KEYS = [
  "map",
  "clock",
  "phone",
  "whatsapp",
] as const satisfies ReadonlyArray<LocationIconKey>;
