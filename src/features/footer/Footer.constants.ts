import type { FooterData } from "./Footer.types";

export const DEFAULT_FOOTER_ID = "pie-pagina" as const;

export const FOOTER_DATA: FooterData = {
  brand: {
    name: "Sabor de Casa",
    tagline: "Restaurante de comida mexicana",
    description:
      "Desayunos, comidas, cenas y bebidas preparadas con ingredientes frescos y el auténtico sabor de la cocina casera mexicana. Un lugar para compartir buenos momentos.",
  },
  navigation: [
    { label: "Inicio", href: "#inicio", ariaLabel: "Ir al inicio" },
    { label: "Menú", href: "#menu", ariaLabel: "Ver nuestro menú" },
    { label: "Nosotros", href: "#nosotros", ariaLabel: "Conoce nuestro restaurante" },
    { label: "Ubicación", href: "#ubicacion", ariaLabel: "Ver nuestra ubicación" },
    { label: "Horarios", href: "#horarios", ariaLabel: "Ver nuestros horarios" },
    { label: "Contacto", href: "#pie-pagina", ariaLabel: "Ir a contacto" },
  ],
  contact: [
    {
      label: "Dirección",
      value: "Calle 60 #245, Centro, Mérida, Yucatán",
    },
    {
      label: "Teléfono",
      value: "+52 (999) 000 0000",
      href: "tel:+529990000000",
      ariaLabel: "Llamar a Sabor de Casa",
    },
    {
      label: "WhatsApp",
      value: "+52 (999) 000 0001",
      href: "https://wa.me/529990000001",
      ariaLabel: "Abrir chat de WhatsApp con Sabor de Casa",
    },
    {
      label: "Correo",
      value: "hola@sabordecasa.example",
      href: "mailto:hola@sabordecasa.example",
      ariaLabel: "Enviar correo a Sabor de Casa",
    },
  ],
  hours: [
    { day: "Lunes", hours: "08:00 — 22:00" },
    { day: "Martes", hours: "08:00 — 22:00" },
    { day: "Miércoles", hours: "08:00 — 22:00" },
    { day: "Jueves", hours: "08:00 — 22:00" },
    { day: "Viernes", hours: "08:00 — 23:00" },
    { day: "Sábado", hours: "09:00 — 23:00", highlight: true },
    { day: "Domingo", hours: "09:00 — 18:00" },
  ],
  legal: {
    copy: "© 2026 Sabor de Casa.",
    rights: "Todos los derechos reservados.",
  },
} as const;
