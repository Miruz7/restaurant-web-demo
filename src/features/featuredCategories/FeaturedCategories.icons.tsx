/**
 * FeaturedCategories.icons.tsx
 *
 * Iconos editoriales inline SVG · 24 x 24 · strokeWidth 1.75.
 *
 * Mantenidos en archivo TSX separado porque constants.ts NO debe
 * contener JSX (TS parser project references lo rechaza).
 */

import type { ReactElement } from "react";

const BASE = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
};

export function CategoryIconEscolares(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M4 6.5 12 3l8 3.5" />
      <path d="M4 6.5V17l8 3.5 8-3.5V6.5" />
      <path d="M12 9v11.5" />
    </svg>
  );
}

export function CategoryIconTecnologia(): ReactElement {
  return (
    <svg {...BASE}>
      <rect x="3" y="4.5" width="18" height="12" rx="2.5" />
      <path d="M8 20h8" />
      <path d="M12 16.5v3.5" />
    </svg>
  );
}

export function CategoryIconImpresion(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M6 18V9h12v9" />
      <rect x="4" y="10" width="16" height="7" rx="2" />
      <rect x="6" y="18" width="12" height="3.5" rx="1.25" />
      <circle cx="17.5" cy="13" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CategoryIconOficina(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M3 20.5V8l9-5 9 5v12.5" />
      <path d="M9 20.5V14h6v6.5" />
      <path d="M9 11h.01M15 11h.01" />
    </svg>
  );
}
