export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const PUBLIC_NAVIGATION: readonly NavigationItem[] = [
  {
    id: "home",
    label: "Inicio",
    href: "#home",
  },
  {
    id: "catalog",
    label: "Catálogo",
    href: "#catalogo",
  },
  {
    id: "about",
    label: "Nosotros",
    href: "#nosotros",
  },
  {
    id: "blog",
    label: "Blog",
    href: "#blog",
  },
  {
    id: "contact",
    label: "Contacto",
    href: "#contacto",
  },
] as const;
