import type { FooterData } from "./Footer.types";

export const DEFAULT_FOOTER_ID = "pie-pagina" as const;

export const FOOTER_DATA: FooterData = {
  brand: {
    name: "Papelería Nova",
    tagline: "Tu tienda de confianza.",
    description:
      "Todo para crear, aprender y trabajar. Artículos escolares, tecnología, impresión digital y soluciones para oficina con atención personalizada y asesoramiento experto.",
  },
  navigation: [
    { label: "Inicio", href: "#inicio", ariaLabel: "Ir al inicio" },
    { label: "Escolares", href: "#escolares", ariaLabel: "Ver productos escolares" },
    { label: "Tecnología", href: "#tecnologia", ariaLabel: "Ver productos de tecnología" },
    { label: "Impresión", href: "#impresion", ariaLabel: "Ver servicios de impresión" },
    { label: "Oficina", href: "#oficina", ariaLabel: "Ver productos de oficina" },
    { label: "Ubicación", href: "#ubicacion", ariaLabel: "Ver ubicación de la tienda" },
  ],
  contact: [
    {
      label: "Dirección",
      value: "Av. Revolución 123, Col. Centro, C.P. 06600, Ciudad de México",
    },
    {
      label: "Teléfono",
      value: "+52 (55) 1234 5678",
      href: "tel:+525512345678",
      ariaLabel: "Llamar a Papelería Nova",
    },
    {
      label: "WhatsApp",
      value: "+52 (55) 8765 4321",
      href: "https://wa.me/525587654321",
      ariaLabel: "Abrir chat de WhatsApp con Papelería Nova",
    },
    {
      label: "Correo",
      value: "hola@papelerianova.com",
      href: "mailto:hola@papelerianova.com",
      ariaLabel: "Enviar correo a Papelería Nova",
    },
  ],
  hours: [
    { day: "Lunes", hours: "09:00 — 20:00" },
    { day: "Martes", hours: "09:00 — 20:00" },
    { day: "Miércoles", hours: "09:00 — 20:00" },
    { day: "Jueves", hours: "09:00 — 20:00" },
    { day: "Viernes", hours: "09:00 — 20:00" },
    { day: "Sábado", hours: "10:00 — 18:00", highlight: true },
    { day: "Domingo", hours: "Cerrado" },
  ],
  legal: {
    copy: "© 2026 Papelería Nova.",
    rights: "Todos los derechos reservados.",
  },
} as const;
