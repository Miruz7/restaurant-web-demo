/**
 * Location.constants.ts — Sprint 12.4 Location Showcase.
 *
 * SSOT para el contenido editorial de la escena de Ubicación.
 *   • Cambia el contenido aquí, no los componentes.
 */

import type { LocationData } from "./Location.types";

export const DEFAULT_LOCATION_SECTION_ID = "location-showcase";

/* =========================================================================
 * SSOT GOOGLE MAPS — DIRECTION URL.
 *   ÚNICA definición real del destino. Cambia aquí → actualiza:
 *     • address.gmapsUrl
 *     • primaryCTA.href
 *     • MapCard.primaryHref (botón "Abrir")
 * ======================================================================= */
export const LOCATION_GMAPS_DIRECTION_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Calle+60+245+Centro+Merida+Yucatan" as const;

/* =========================================================================
 * CONTENIDO LOCAL DEL RESTAURANTE (Sabor de Casa - demo ficticia).
 *   Actualizar para producción con datos reales.
 * ======================================================================= */
export const LOCATION_DATA: LocationData = {
  eyebrow: "Visítanos",
  heading: "Encuéntranos en el corazón de Mérida",
  description:
    "Ven a disfrutar del auténtico sabor casero mexicano. Atención cálida, ingredientes frescos y platillos preparados al momento para compartir en familia.",
  address: {
    icon: "map",
    label: "Dirección",
    value: "Calle 60 #245, Centro, Mérida, Yucatán",
    gmapsUrl: LOCATION_GMAPS_DIRECTION_URL,
  },
  schedule: {
    icon: "clock",
    label: "Horario",
    days: [
      { label: "Lunes a Viernes", hours: "08:00 — 22:00", highlight: true },
      { label: "Sábado", hours: "09:00 — 23:00" },
      { label: "Domingo", hours: "09:00 — 18:00" },
    ],
  },
  phone: {
    icon: "phone",
    label: "Teléfono",
    display: "+52 (999) 000 0000",
    telUrl: "tel:+529990000000",
  },
  whatsapp: {
    icon: "whatsapp",
    label: "WhatsApp",
    display: "+52 (999) 000 0001",
    waUrl: "https://wa.me/529990000001",
  },
  map: {
    title: "Ubicación en mapa",
    subtitle: "Estacionamiento cercano disponible",
    iframeSrc: "https://www.google.com/maps?q=Calle+60+245+Centro+Merida+Yucatan&output=embed",
    width: 800,
    height: 600,
  },
  primaryCTA: {
    label: "Cómo llegar",
    href: LOCATION_GMAPS_DIRECTION_URL,
  },
  secondaryCTA: {
    label: "Llamar",
    href: "tel:+529990000000",
  },
} as const;
