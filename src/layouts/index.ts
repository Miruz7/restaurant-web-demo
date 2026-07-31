/**
 * src/layouts/index.ts
 *
 * Composiciones de Layout por tipo de página.
 *
 * Distinción clara con src/components/layout:
 *   components/layout  → BLOQUES REUTILIZABLES (Header, Footer, Navigation, Sidebar, Drawer)
 *   layouts            → COMPOSICIÓN COMPLETA lista para usar en una página:
 *                         MainLayout, AuthLayout, DashboardLayout, MarketingLayout...
 */

export * from "./MainLayout";
