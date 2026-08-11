/**
 * Location.constants.ts — Sprint 12.4 Location Showcase.
 *
 * SSOT para el contenido editorial de la escena de Ubicación.
 *   • Cambia el contenido aquí, no los componentes.
 */

import type { LocationData } from "./Location.types";

export const DEFAULT_LOCATION_SECTION_ID = "location-showcase";

/* =========================================================================
 * CONTENIDO LOCAL DE LA TIENDA FÍSICA (Papelería Nova).
 *   Actualizar para producción con datos reales.
 * ======================================================================= */
export const LOCATION_DATA: LocationData = {
  eyebrow: "Visítanos",
  heading: "Encuéntranos en el corazón de la ciudad",
  description:
    "Ven a conocer nuestra tienda física. Atención personalizada, asesoramiento especializado y productos listos para llevar en el momento.",
  address: {
    icon: "map",
    label: "Dirección",
    value: "Av. Revolución 123, Col. Centro, C.P. 06600, Ciudad de México",
    gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Revolucion+123+Centro+CDMX",
  },
  schedule: {
    icon: "clock",
    label: "Horario",
    days: [
      { label: "Lunes a Viernes", hours: "09:00 — 20:00", highlight: true },
      { label: "Sábado", hours: "10:00 — 18:00" },
      { label: "Domingo", hours: "Cerrado" },
    ],
  },
  phone: {
    icon: "phone",
    label: "Teléfono",
    display: "+52 (55) 1234 5678",
    telUrl: "tel:+525512345678",
  },
  whatsapp: {
    icon: "whatsapp",
    label: "WhatsApp",
    display: "+52 (55) 8765 4321",
    waUrl: "https://wa.me/525587654321",
  },
  map: {
    title: "Ubicación en mapa",
    subtitle: "Estacionamiento cercano disponible",
    iframeSrc:
      "https://www.google.com/maps?q=Av.+Revolucion+123+Centro+Ciudad+de+Mexico&output=embed",
    width: 800,
    height: 600,
  },
  primaryCTA: {
    label: "Cómo llegar",
    href: "https://www.google.com/maps/dir/?api=1&destination=Av.+Revolucion+123+Centro+CDMX",
  },
  secondaryCTA: {
    label: "Llamar",
    href: "tel:+525512345678",
  },
} as const;
