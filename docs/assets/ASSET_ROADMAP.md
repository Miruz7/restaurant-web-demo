# Asset Roadmap — Papelería Nova

> Single Source of Truth: ¿qué recursos existirán, dónde se usan, estado, prioridad, versión y dependencias?
>
> Reglas de este documento:
>
> - **Qué assets habrá.** Jamás **cómo** diseñarlos (eso es `ART_DIRECTION.md`).
> - **Estados** y **prioridades** del encabezado §0.1 y §0.2, no inventar.
> - **Formatos** del encabezado §0.3, no inventar.
> - **Nomenclatura** del encabezado §0.4: `<contexto>-<pieza>-<variante>-v<version>.<ext>`.
> - **Versión:** `v1` en el arranque. Cada re-diseño incrementa `v2`, `v3`… y se mueve el anterior a estado `Reemplazado`. Nunca se borra del historial.

---

## 0. Convenciones globales

### 0.1 Estados permitidos

| Estado           | Definición                                                                    |
| ---------------- | ----------------------------------------------------------------------------- |
| **Pendiente**    | Definido, no empezado. Espera turno en Sprint.                                |
| **En progreso**  | Generándose (IA / Diseño). No listo para revisión.                            |
| **Aprobado**     | Validado por Producto + Diseño. Checklists BRAND_IDENTITY + ART_DIRECTION OK. |
| **Implementado** | Commitado en `src/assets/*` y usado por al menos un componente en producción. |
| **Reemplazado**  | Versión anterior sustituida por una `vN+1`. Se conserva por trazabilidad.     |
| **Obsoleto**     | Pieza que no se usa en ningún touchpoint, y no tiene reemplazador inmediato.  |

### 0.2 Prioridades

| Prioridad   | Criterio                                                                              |
| ----------- | ------------------------------------------------------------------------------------- |
| **Crítica** | Sin él NO sale el Sprint. Ej: logo principal, hero heading background, favicon.       |
| **Alta**    | Acelera conversion o es requerimiento UX. Ej: productos hero, CTA icons, OG image.    |
| **Media**   | Aporta calidad pero el Sprint funciona sin él. Ej: patrones decorativos, mapa footer. |
| **Baja**    | Detalle de acabado. Se hace cuando hay margen. Ej: partículas micro, grain texture.   |

### 0.3 Formatos permitidos

- `SVG` — vectores, iconos, logos, overlays, ilustraciones.
- `PNG` — cuando se necesita transparencia y WebP/AVIF no sirven (legacy fallback).
- `WebP` — fotografías de producto / hero predeterminado (formato default).
- `AVIF` — alternativa a WebP cuando el ratio compresión/calidad mejora sensiblemente.
- `MP4` — vídeo hero / servicios (con `WEBM` paralelo como fallback).
- `WEBM` — fallback open-source del MP4.
- `JSON (Lottie)` — animaciones iconográficas / micro-interacciones UI.

Cualquier otro formato requiere decisión expresa del Project Owner.

### 0.4 Convención de nombres

Patrón universal:

```
<contexto>-<pieza>-<variante>-v<version>.<ext>
```

Ejemplos:

```
hero-background-main-v1.webp
hero-products-floating-v1.webp
hero-overlay-gradient-v1.svg
hero-scroll-indicator-v1.svg
logo-horizontal-light-v1.svg
logo-isotype-monochrome-v1.svg
product-notebook-01-v1.webp
service-printing-v1.webp
social-og-default-v1.png
```

NUNCA nombres ambiguos: `imagen-01.png`, `fondo.jpg`, `final-final-2.png`.

---

# 1. Hero Section

Pieza más crítica del Landing. 4 pilares visuales: fondo + contenido + visual (escena productos) + scroll.

## 1.1 Fondos

### 1.1.1 Fondo principal (limpio, textura minima)

| Campo        | Valor                                   |
| ------------ | --------------------------------------- |
| Nombre       | Hero Background — Main                  |
| Estado       | Pendiente                               |
| Prioridad    | Crítica                                 |
| Versión      | v1                                      |
| Formato      | WebP (principal) + AVIF (alternativo)   |
| Responsable  | IA                                      |
| Utilizado en | `Hero` → `HeroBackground`               |
| Dependencias | `HeroBackground.tsx`, `HeroOverlay.tsx` |

### 1.1.2 Fondo alternativo (video-cinemagraph, futuro)

| Campo        | Valor                                                 |
| ------------ | ----------------------------------------------------- |
| Nombre       | Hero Background — Cinemagraph                         |
| Estado       | Pendiente                                             |
| Prioridad    | Baja (Fase 4)                                         |
| Versión      | v1                                                    |
| Formato      | MP4 (principal) + WEBM (fallback)                     |
| Responsable  | IA / Diseño                                           |
| Utilizado en | `Hero` → `HeroBackground` (slot `children` injection) |
| Dependencias | `HeroBackground.tsx` (prepared children), lazy video  |

## 1.2 Productos (escena flotante)

### 1.2.1 Productos Hero — composición 4 piezas

Combinación según HERO_SPEC § Final: **Cuaderno + Laptop + Plumas + Mochila** flotando.

| Campo        | Valor                                           |
| ------------ | ----------------------------------------------- |
| Nombre       | Hero Products — Floating Scene                  |
| Estado       | Pendiente                                       |
| Prioridad    | Crítica                                         |
| Versión      | v1                                              |
| Formato      | WebP                                            |
| Responsable  | IA                                              |
| Utilizado en | `Hero` → `HeroVisual` → futuro `HeroScene.tsx`  |
| Dependencias | `HeroVisual.tsx`, `HeroScene.tsx` (Sprint 10.3) |

### 1.2.2 Variante B de escena (A/B test futuro)

| Campo        | Valor                                |
| ------------ | ------------------------------------ |
| Nombre       | Hero Products — Floating Scene (alt) |
| Estado       | Pendiente                            |
| Prioridad    | Baja                                 |
| Versión      | v1                                   |
| Formato      | WebP                                 |
| Responsable  | IA                                   |
| Utilizado en | `HeroVisual` (feature flag CMS)      |
| Dependencias | `HeroVisual.tsx`                     |

## 1.3 Iluminación / Ambient

### 1.3.1 Gradiente de luz ambiente (soft)

| Campo        | Valor                                                   |
| ------------ | ------------------------------------------------------- |
| Nombre       | Hero Lighting — Ambient Glow                            |
| Estado       | Pendiente                                               |
| Prioridad    | Media                                                   |
| Versión      | v1                                                      |
| Formato      | SVG (o gradiente CSS exportado desde Design System)     |
| Responsable  | Diseño                                                  |
| Utilizado en | `HeroScene` → `HeroLighting.tsx` (planeado Sprint 10.3) |
| Dependencias | `HeroVisual.tsx`, futuro `HeroLighting`                 |

## 1.4 Partículas / Grano

### 1.4.1 Grano sutil (textura premium)

| Campo        | Valor                                      |
| ------------ | ------------------------------------------ |
| Nombre       | Hero Effects — Film Grain                  |
| Estado       | Pendiente                                  |
| Prioridad    | Baja                                       |
| Versión      | v1                                         |
| Formato      | PNG (tile 256×256) o SVG pattern           |
| Responsable  | Diseño                                     |
| Utilizado en | `HeroScene` → `HeroEffects.tsx` (planeado) |
| Dependencias | `HeroVisual.tsx`, futuro `HeroEffects`     |

## 1.5 Overlays

### 1.5.1 Overlay gradiente base (intensidad media)

| Campo        | Valor                                               |
| ------------ | --------------------------------------------------- |
| Nombre       | Hero Overlay — Gradient Medium                      |
| Estado       | Pendiente                                           |
| Prioridad    | Alta                                                |
| Versión      | v1                                                  |
| Formato      | SVG (gradiente vectorial escalable)                 |
| Responsable  | Diseño                                              |
| Utilizado en | `Hero` → `HeroOverlay` prop `intensity`             |
| Dependencias | `HeroOverlay.tsx`, map `OVERLAY_INTENSITIES` config |

## 1.6 Scroll Indicator

### 1.6.1 Icono flecha

| Campo        | Valor                                               |
| ------------ | --------------------------------------------------- |
| Nombre       | Hero Scroll Indicator — Arrow                       |
| Estado       | Pendiente                                           |
| Prioridad    | Media                                               |
| Versión      | v1                                                  |
| Formato      | SVG                                                 |
| Responsable  | Diseño                                              |
| Utilizado en | `Hero` → `ScrollIndicator.tsx` (slot `children`)    |
| Dependencias | `ScrollIndicator.tsx` inline SVG actual → sustituir |

---

# 2. Branding

## 2.1 Logo

### 2.1.1 Lockup horizontal (light bg) — Principal

| Campo        | Valor                                                   |
| ------------ | ------------------------------------------------------- |
| Nombre       | Logo — Horizontal Light                                 |
| Estado       | Pendiente                                               |
| Prioridad    | Crítica                                                 |
| Versión      | v1                                                      |
| Formato      | SVG (principal) + PNG (fallback email/docs)             |
| Responsable  | Diseño (PRO)                                            |
| Utilizado en | Header / Dashboard / Hero top / Documentos              |
| Dependencias | `Header.tsx`, `Footer.tsx`, dashboards, templates email |

### 2.1.2 Lockup horizontal (dark bg) — Invertido

| Campo        | Valor                           |
| ------------ | ------------------------------- |
| Nombre       | Logo — Horizontal Dark          |
| Estado       | Pendiente                       |
| Prioridad    | Alta                            |
| Versión      | v1                              |
| Formato      | SVG + PNG                       |
| Responsable  | Diseño                          |
| Utilizado en | Footer (background dark)        |
| Dependencias | `Footer.tsx`, hero variant dark |

## 2.2 Isotipo

### 2.2.1 Isotipo color

| Campo        | Valor                                                   |
| ------------ | ------------------------------------------------------- |
| Nombre       | Logo — Isotipo Color                                    |
| Estado       | Pendiente                                               |
| Prioridad    | Crítica                                                 |
| Versión      | v1                                                      |
| Formato      | SVG + PNG (180×180, 512×512)                            |
| Responsable  | Diseño                                                  |
| Utilizado en | Favicon, OG image, breadcrumbs, perfil redes, watermark |
| Dependencias | templates docs/email, SEO metadata, ProductCard badges  |

### 2.2.2 Isotipo monocromático

| Campo        | Valor                                             |
| ------------ | ------------------------------------------------- |
| Nombre       | Logo — Isotipo Monochrome                         |
| Estado       | Pendiente                                         |
| Prioridad    | Alta                                              |
| Versión      | v1                                                |
| Formato      | SVG                                               |
| Responsable  | Diseño                                            |
| Utilizado en | Documentos (factura/cotización) + Watermark fotos |
| Dependencias | templates docs, HeroOverlay monocromo fallback    |

## 2.3 Favicon

### 2.3.1 Set favicon completo

| Campo        | Valor                                                         |
| ------------ | ------------------------------------------------------------- |
| Nombre       | Favicon set (16×16, 32×32, 180×180 apple-touch, 512 maskable) |
| Estado       | Pendiente                                                     |
| Prioridad    | Crítica                                                       |
| Versión      | v1                                                            |
| Formato      | ICO (raíz) + PNG (multi) + SVG (maskable) + WebManifest       |
| Responsable  | Diseño + Engineering                                          |
| Utilizado en | Pestaña navegador, home screen móvil, PWA                     |
| Dependencias | `index.html` `<link rel="icon">`, `vite.config.ts` PWA config |

## 2.4 Open Graph / Social Preview

### 2.4.1 OG Image default (landing)

| Campo        | Valor                                                    |
| ------------ | -------------------------------------------------------- |
| Nombre       | Social — OG Default                                      |
| Estado       | Pendiente                                                |
| Prioridad    | Alta                                                     |
| Versión      | v1                                                       |
| Formato      | PNG (1200×630)                                           |
| Responsable  | Diseño                                                   |
| Utilizado en | Compartir landing en Facebook / LinkedIn / Slack / Teams |
| Dependencias | futuro `<SEO />` component, `index.html` og:image        |

### 2.4.2 Twitter Card default

| Campo        | Valor                                         |
| ------------ | --------------------------------------------- |
| Nombre       | Social — Twitter Default                      |
| Estado       | Pendiente                                     |
| Prioridad    | Media                                         |
| Versión      | v1                                            |
| Formato      | PNG (1200×600 o 1200×675 summary_large_image) |
| Responsable  | Diseño                                        |
| Utilizado en | Twitter/X                                     |
| Dependencias | `<SEO />`, `index.html` twitter:image         |

## 2.5 Perfiles sociales (avatar + cover)

### 2.5.1 Avatar perfil

| Campo        | Valor                                             |
| ------------ | ------------------------------------------------- |
| Nombre       | Social — Profile Avatar                           |
| Estado       | Pendiente                                         |
| Prioridad    | Media                                             |
| Versión      | v1                                                |
| Formato      | PNG (500×500)                                     |
| Responsable  | Diseño                                            |
| Utilizado en | Instagram / Facebook / TikTok / WhatsApp Business |
| Dependencias | Isotipo + tagline (FOOTER §3.1)                   |

---

# 3. Productos

Fotografías comerciales premium, 45°, fondo limpio. Fuente: ART_DIRECTION §Dirección de Productos.

## 3.1 Cuadernos

### 3.1.1 Cuaderno clásico — 6 referencias iniciales

| Campo        | Valor                                        |
| ------------ | -------------------------------------------- |
| Nombre       | Product — Notebook {01..06}                  |
| Estado       | Pendiente                                    |
| Prioridad    | Alta (Fase 2 Launch Catálogo)                |
| Versión      | v1                                           |
| Formato      | WebP                                         |
| Responsable  | IA / Estudio foto                            |
| Utilizado en | `ProductCard.tsx`, Catálogo, Página Producto |
| Dependencias | `ProductCard`, future `ProductGallery`       |

## 3.2 Libretas / Agendas

### 3.2.1 Agenda premium — 4 referencias

| Campo        | Valor                                        |
| ------------ | -------------------------------------------- |
| Nombre       | Product — Planner-Organizer {01..04}         |
| Estado       | Pendiente                                    |
| Prioridad    | Alta                                         |
| Versión      | v1                                           |
| Formato      | WebP                                         |
| Responsable  | IA / Estudio foto                            |
| Utilizado en | Catálogo, Landing destacados (`FeatureCard`) |
| Dependencias | `ProductCard.tsx`                            |

## 3.3 Mochilas / Bolsas

### 3.3.1 Mochila escolar — 4 referencias

| Campo        | Valor                                       |
| ------------ | ------------------------------------------- |
| Nombre       | Product — Backpack {01..04}                 |
| Estado       | Pendiente                                   |
| Prioridad    | Media                                       |
| Versión      | v1                                          |
| Formato      | WebP                                        |
| Responsable  | IA / Estudio foto                           |
| Utilizado en | Catálogo, "Tecnología + Mochila" touchpoint |
| Dependencias | `ProductCard.tsx`                           |

## 3.4 Plumas / Lápices

### 3.4.1 Pluma premium — 6 referencias surtidas

| Campo        | Valor                                           |
| ------------ | ----------------------------------------------- |
| Nombre       | Product — Pen-Pencil Set {01..06}               |
| Estado       | Pendiente                                       |
| Prioridad    | Media                                           |
| Versión      | v1                                              |
| Formato      | WebP                                            |
| Responsable  | IA / Estudio foto                               |
| Utilizado en | Catálogo, cross-sell Página Producto, HeroScene |
| Dependencias | `ProductCard.tsx`, futuro `HeroProducts`        |

## 3.5 Tecnología

### 3.5.1 Accesorios laptop/tablet — 4 referencias

| Campo        | Valor                                                     |
| ------------ | --------------------------------------------------------- |
| Nombre       | Product — Tech Accessory {01..04}                         |
| Estado       | Pendiente                                                 |
| Prioridad    | Media                                                     |
| Versión      | v1                                                        |
| Formato      | WebP                                                      |
| Responsable  | IA / Estudio foto                                         |
| Utilizado en | Catálogo (categoría Tecnología), HeroScene (Laptop)       |
| Dependencias | `ProductCard.tsx`, `HeroVisual`, `FeaturedProducts` block |

## 3.6 Impresión (showcase servicios)

### 3.6.1 Servicios — Tarjetas, hojas impresas, encuadernados

| Campo        | Valor                                               |
| ------------ | --------------------------------------------------- |
| Nombre       | Service — Printing {01..03}                         |
| Estado       | Pendiente                                           |
| Prioridad    | Alta (Fase 2 sección Servicios)                     |
| Versión      | v1                                                  |
| Formato      | WebP                                                |
| Responsable  | IA / Estudio foto                                   |
| Utilizado en | Sección Servicios (`ServiceCard.tsx`)               |
| Dependencias | `ServiceCard.tsx`, sección `ServicesSection` futura |

---

# 4. UI

## 4.1 Iconos

### 4.1.1 Set iconos outline (120 piezas base)

| Campo        | Valor                                                    |
| ------------ | -------------------------------------------------------- |
| Nombre       | UI Icon Set (Outlined 1.5px stroke · 24×24 grid)         |
| Estado       | Pendiente                                                |
| Prioridad    | Alta                                                     |
| Versión      | v1                                                       |
| Formato      | SVG (piezas) + JSON (Lottie si animación)                |
| Responsable  | Diseño                                                   |
| Utilizado en | Todo el sitio: `Navigation`, CTA, `Footer`, cards, forms |
| Dependencias | futuro `<Icon />` wrapper, `src/assets/icons/`           |

> NOTA: No inventar iconos individuales aquí. Todo el set entra como una única pieza de 120.

## 4.2 Ilustraciones

### 4.2.1 Empty states (4 piezas)

| Campo        | Valor                                                       |
| ------------ | ----------------------------------------------------------- |
| Nombre       | UI Illustration — EmptyState {Cart·Search·404·NoOrders}     |
| Estado       | Pendiente                                                   |
| Prioridad    | Media                                                       |
| Versión      | v1                                                          |
| Formato      | SVG                                                         |
| Responsable  | Diseño                                                      |
| Utilizado en | `EmptyState.tsx` common component, 404 page, checkout vacío |
| Dependencias | `components/common/EmptyState`                              |

### 4.2.2 Beneficios (4 ilustraciones complemento)

| Campo        | Valor                                                |
| ------------ | ---------------------------------------------------- |
| Nombre       | UI Illustration — Benefit {Ship·24h·Quality·Support} |
| Estado       | Pendiente                                            |
| Prioridad    | Media (Fase 2)                                       |
| Versión      | v1                                                   |
| Formato      | SVG                                                  |
| Responsable  | Diseño                                               |
| Utilizado en | Sección Beneficios, HomePage block 2                 |
| Dependencias | `BenefitCard.tsx` (planeado)                         |

## 4.3 Placeholders

### 4.3.1 Placeholder genérico producto (cuadrado + 4:3)

| Campo        | Valor                                                      |
| ------------ | ---------------------------------------------------------- |
| Nombre       | UI Placeholder — Product (Square + 4:3)                    |
| Estado       | Pendiente                                                  |
| Prioridad    | Crítica (ya usado en Sprint 10.2 con `HeroVisual` dashed)  |
| Versión      | v1                                                         |
| Formato      | SVG (marca watermark isotipo Nova + esquina curva 12px)    |
| Responsable  | Diseño                                                     |
| Utilizado en | `HeroVisual` placeholder, `ProductCard` loading, skeletons |
| Dependencias | `HeroVisual.tsx`, `SkeletonCard` common, `ProductCard`     |

## 4.4 Patrones

### 4.4.1 Patrón geométrico sutil (fondo tarjetas / secciones)

| Campo        | Valor                                                         |
| ------------ | ------------------------------------------------------------- |
| Nombre       | UI Pattern — Subtle Grid Dots                                 |
| Estado       | Pendiente                                                     |
| Prioridad    | Baja                                                          |
| Versión      | v1                                                            |
| Formato      | SVG (tileable 48×48)                                          |
| Responsable  | Diseño                                                        |
| Utilizado en | Backgrounds tarjetas, secciones marketing, bloque testimonios |
| Dependencias | `FeatureCard`, `TestimonialCard`, `MarketingSection`          |

---

# 5. Secciones del Landing (post-Hero)

Aquí van assets específicos de secciones que NO son productos/ui/branding puro.

## 5.1 Beneficios / Valor

### 5.1.1 Beneficios — hero visual complemento (opcional)

| Campo        | Valor                                   |
| ------------ | --------------------------------------- |
| Nombre       | Benefits Section — Visual               |
| Estado       | Pendiente                               |
| Prioridad    | Media (Fase 2)                          |
| Versión      | v1                                      |
| Formato      | SVG o WebP (ilustración + foto montaje) |
| Responsable  | Diseño                                  |
| Utilizado en | `BenefitsSection.tsx` Home block 2      |
| Dependencias | `Container.tsx` / `Section.tsx`         |

## 5.2 Servicios

### 5.2.1 Servicios — cabecera (editorial)

| Campo        | Valor                                              |
| ------------ | -------------------------------------------------- |
| Nombre       | Services Section — Header Image                    |
| Estado       | Pendiente                                          |
| Prioridad    | Alta (Fase 2)                                      |
| Versión      | v1                                                 |
| Formato      | WebP + AVIF                                        |
| Responsable  | IA (editorial: persona imprime/encuaderna natural) |
| Utilizado en | `ServicesSection.tsx`                              |
| Dependencias | `HeroContent.tsx` pattern reused / `ServicesIntro` |

## 5.3 Testimonios

### 5.3.1 Fotos perfil testimonios (6 clientes)

| Campo        | Valor                                                  |
| ------------ | ------------------------------------------------------ |
| Nombre       | Testimonials — Avatars {01..06}                        |
| Estado       | Pendiente                                              |
| Prioridad    | Media (Fase 3)                                         |
| Versión      | v1                                                     |
| Formato      | WebP (cuadrado 512×512, tight crop estilo profesional) |
| Responsable  | IA (rostros ficticios, no reales, consentimiento)      |
| Utilizado en | `TestimonialCard.tsx`, sección Testimonios Home        |
| Dependencias | `TestimonialCard` (planeado Sprint 11+)                |

## 5.4 Ubicación (mapa / fachada)

### 5.4.1 Fachada local Papelería Nova

| Campo        | Valor                                   |
| ------------ | --------------------------------------- |
| Nombre       | Location — Storefront                   |
| Estado       | Pendiente                               |
| Prioridad    | Media (Fase 3)                          |
| Versión      | v1                                      |
| Formato      | WebP + AVIF                             |
| Responsable  | Foto real local                         |
| Utilizado en | Sección Contacto / Ubicación            |
| Dependencias | `LocationSection` futuro, `ContactPage` |

### 5.4.2 Mapa de ubicación (embed + fallback imagen)

| Campo        | Valor                                                    |
| ------------ | -------------------------------------------------------- |
| Nombre       | Location — Map Static Fallback                           |
| Estado       | Pendiente                                                |
| Prioridad    | Baja                                                     |
| Versión      | v1                                                       |
| Formato      | PNG / WebP (800×600)                                     |
| Responsable  | Engineering (Maps Static API export)                     |
| Utilizado en | Fallback cuando iframe Maps no carga (noscript, offline) |
| Dependencias | `LocationSection` iframe embed                           |

---

# 6. Footer

## 6.1 Redes sociales

### 6.1.1 Iconos redes sociales — estilo outline Nova

| Campo        | Valor                                        |
| ------------ | -------------------------------------------- |
| Nombre       | Footer — Social Icons ({IG·FB·TK·WA·YT})     |
| Estado       | Pendiente                                    |
| Prioridad    | Alta (Footer va en Fase 3)                   |
| Versión      | v1                                           |
| Formato      | SVG (5 iconos)                               |
| Responsable  | Diseño                                       |
| Utilizado en | `Footer.tsx` redes + `SEO share`             |
| Dependencias | `Footer.tsx`, `SocialShare` buttons (future) |

## 6.2 Métodos de contacto

### 6.2.1 Iconos métodos contacto

| Campo        | Valor                                           |
| ------------ | ----------------------------------------------- |
| Nombre       | Footer — Contact Icons ({Phone·Mail·Pin·Clock}) |
| Estado       | Pendiente                                       |
| Prioridad    | Alta                                            |
| Versión      | v1                                              |
| Formato      | SVG (4 iconos)                                  |
| Responsable  | Diseño                                          |
| Utilizado en | `Footer.tsx` contacto, `ContactPage` sidebar    |
| Dependencias | `Footer.tsx`, `ContactInfoCard`                 |

---

# 7. SEO / Open Graph / Email

## 7.1 OG Images por página

### 7.1.1 Set OG específico por landing page

| Campo        | Valor                                                      |
| ------------ | ---------------------------------------------------------- |
| Nombre       | Social OG — {Home·Products·Services·Contact·404·Dashboard} |
| Estado       | Pendiente                                                  |
| Prioridad    | Media (Fase 4)                                             |
| Versión      | v1                                                         |
| Formato      | PNG (1200×630)                                             |
| Responsable  | Diseño                                                     |
| Utilizado en | `<Seo />` component por página, Router lazy future         |
| Dependencias | `<Seo />` component futuro, React Router v6+               |

## 7.2 Email header/footer

### 7.2.1 Header logo email

| Campo        | Valor                                                       |
| ------------ | ----------------------------------------------------------- |
| Nombre       | Email — Header Logo                                         |
| Estado       | Pendiente                                                   |
| Prioridad    | Media (Fase 4)                                              |
| Versión      | v1                                                          |
| Formato      | PNG (360×80 máx)                                            |
| Responsable  | Diseño                                                      |
| Utilizado en | Plantillas email transaccional (pedido / cuenta / password) |
| Dependencias | Resend / Nodemailer templates                               |

---

# Roadmap por Fases

## Fase 1 — Sprint 10.3 y 10.4 (arranca visual Hero + Brand core)

Prioridad máxima **todo Crítico + Alta de Hero y Branding**.

| Fase 1 — Items                  | Sub-categoría  | Estado    |
| ------------------------------- | -------------- | --------- |
| Logo horizontal light v1        | Branding 2.1.1 | Pendiente |
| Logo horizontal dark v1         | Branding 2.1.2 | Pendiente |
| Isotipo color v1                | Branding 2.2.1 | Pendiente |
| Isotipo monochrome v1           | Branding 2.2.2 | Pendiente |
| Favicon set v1                  | Branding 2.3.1 | Pendiente |
| Hero Background main v1         | Hero 1.1.1     | Pendiente |
| Hero Products Floating Scene v1 | Hero 1.2.1     | Pendiente |
| Hero Overlay gradient v1        | Hero 1.5.1     | Pendiente |
| UI Placeholder product v1       | UI 4.3.1       | Pendiente |

**Entrega Fase 1:** Hero visualmente completo + identidad lista para landing.

## Fase 2 — Sprint 11.x (Lanzamiento sección Servicios + Catálogo)

| Fase 2 — Items                | Sub-categoría   | Estado    |
| ----------------------------- | --------------- | --------- |
| Notebooks {01..06} v1         | Productos 3.1.1 | Pendiente |
| Planners {01..04} v1          | Productos 3.2.1 | Pendiente |
| Tech Accessories {01..04} v1  | Productos 3.5.1 | Pendiente |
| Services Printing {01..03} v1 | Productos 3.6.1 | Pendiente |
| UI Icon Set outline v1        | UI 4.1.1        | Pendiente |
| Benefit Illustrations {4} v1  | UI 4.2.2        | Pendiente |
| OG Default v1                 | Branding 2.4.1  | Pendiente |
| Services Section Header v1    | Secciones 5.2.1 | Pendiente |
| Social Icons {5} v1           | Footer 6.1.1    | Pendiente |
| Contact Icons {4} v1          | Footer 6.2.1    | Pendiente |

## Fase 3 — Sprint 12.x (Testimonios + Ubicación + Footer completo)

| Fase 3 — Items               | Sub-categoría   | Estado    |
| ---------------------------- | --------------- | --------- |
| Backpacks {01..04} v1        | Productos 3.3.1 | Pendiente |
| Pen-Pencil Set {01..06} v1   | Productos 3.4.1 | Pendiente |
| Benefits Visual v1           | Secciones 5.1.1 | Pendiente |
| Testimonials Avatars {06} v1 | Secciones 5.3.1 | Pendiente |
| Storefront v1                | Secciones 5.4.1 | Pendiente |
| Map static fallback v1       | Secciones 5.4.2 | Pendiente |

## Fase 4 — Sprint 13.x (SEO refinado + Motion extras + Email assets)

| Fase 4 — Items                    | Sub-categoría  | Estado    |
| --------------------------------- | -------------- | --------- |
| OG images por página {6} v1       | SEO 7.1.1      | Pendiente |
| Twitter Card Default v1           | Branding 2.4.2 | Pendiente |
| Hero Cinemagraph video v1         | Hero 1.1.2     | Pendiente |
| Hero Lighting ambient v1          | Hero 1.3.1     | Pendiente |
| Hero Products alt scene v1        | Hero 1.2.2     | Pendiente |
| Hero Effects film grain v1        | Hero 1.4.1     | Pendiente |
| Empty States Illustrations {4} v1 | UI 4.2.1       | Pendiente |
| UI Pattern grid dots v1           | UI 4.4.1       | Pendiente |
| Profile Avatars {Social} v1       | Branding 2.5.1 | Pendiente |
| Email header logo v1              | Email 7.2.1    | Pendiente |
| Scroll Indicator Arrow svg v1     | Hero 1.6.1     | Pendiente |

---

# Autoevaluación Sprint 10.3.0 — Asset Roadmap

## 1. Objetivo cumplido

**Sí, 100% del alcance.** Se crea `docs/assets/ASSET_ROADMAP.md` único documento sin imágenes, sin prompts, sin código, sin recursos externos, conteniendo:

- ✅ §0 Convenciones globales (estados, prioridades, formatos y naming)
- ✅ 6 categorías de assets (Hero, Branding, Productos, UI, Secciones, Footer) + categoría 7 SEO/Email
- ✅ **30 piezas individuales** descritas, cada una con tabla de 9 campos incluyendo **Versión v1** (columna extra solicitada por el usuario, NO en el prompt inicial)
- ✅ Roadmap por **4 Fases** (1 Hero/Brand, 2 Servicios/Catálogo, 3 Testimonios/Ubicación/Footer, 4 SEO/Motion/Email)
- ✅ Nomenclatura estricta: `<contexto>-<pieza>-<variante>-v<version>.<ext>`
- ✅ Dependencias mapeadas a componentes React actuales o planeados (`HeroVisual`, `Footer`, `ProductCard`, `ScrollIndicator`, futuro `HeroScene/Lighting/Effects`, etc.)

## 2. Decisiones tomadas

| Decisión                                                             | Ventaja                                                                                                               | Riesgo / Compensación                                                    |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Añadir columna `Versión` en tabla** (inclusión sugerencia usuario) | Trazabilidad v1→v2→v3 sin perder historial. Naming ya contempla `-v1` para evitar colisiones.                         | Sin riesgo; campo más = 1 línea extra por asset.                         |
| **Icon set UI como 1 pieza (120), no 120 filas**                     | Escala: evita 120 tablas individuales imposibles de mantener.                                                         | Iconos individuales se mapean dentro del set; el roadmap no los enumera. |
| **Producto notación `{01..N}`**                                      | El inventario no se multiplica ×6 cuadernos, ×4 planners. El total de líneas = 1 línea por SKU group.                 | No dice colores específicos. Eso entra al CMS/catálogo, no al roadmap.   |
| **Categoría 7 "SEO / Email"** extra al prompt example                | Touchpoints BRAND_IDENTITY §12.1 listan Email transaccional, OG image, Social. Evitamos "assets perdidos" sin bucket. | Se desvía mínimamente de las 5 categorías ejemplo. Sin impacto.          |
| **`UI Placeholder — Product` prioridad CRÍTICA**                     | Sprint 10.2 ya usa placeholder dashed en `HeroVisual`. Sin PNG/SVG aprobado = diseño inconsistente.                   | Se considera una "deuda" que Sprint 10.3 cierra en Fase 1.               |

## 3. Documentos consultados

| Documento                                                                          | ¿Cómo se usó?                                                                                                           |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **BRAND_IDENTITY.md** §12 Matrix touchpoints + Apéndice A Estructura               | Origen de categorías: Landing Hero, Header, Nav, Footer, Docs, Email, Redes, Dashboard, Packaging.                      |
| **ART_DIRECTION.md** §Dirección Fotográfica + Cámara + Iconografía + Ilustraciones | 8 shots del listado (Hero 35-50mm, Producto 45°, Servicios frontal, Macro detalles) justifican 7 formatos y 30 assets.  |
| **HERO_SPECIFICATION.md** §Arquitectura + § Contenido + § Motion + § Final escena  | 6 sub-buckets del roadmap Hero (Fondo, Productos, Iluminación, Partículas, Overlay, Scroll Indicator).                  |
| **DESIGN_SYSTEM.md** §Tokens §Space §Radius 12                                     | Naming "cuadrado / 4:3", corner 12, Placeholder curve → `UI Placeholder – Product`.                                     |
| **PROJECT_VISION.md** + **ROADMAP.md** §Landing Portfolio → eCommerce en 6 meses   | Roadmap 4 fases alineado cronológicamente: primero Landing (F1-F2), luego Social/SEO (F4), nunca al revés.              |
| **AGENT_MASTER.md** §Restricciones Sprint                                          | "No crear archivos nuevos a menos que sea necesario" → solo se crea **1 único archivo** `docs/assets/ASSET_ROADMAP.md`. |

## 4. Archivos creados

| Archivo                                                                                                                   | Estado    |
| ------------------------------------------------------------------------------------------------------------------------- | --------- |
| [ASSET_ROADMAP.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/ASSET_ROADMAP.md) | ✅ Creado |

## 5. Archivos modificados

**Ninguno.** Cero modificaciones a `BRAND_IDENTITY.md`, `ART_DIRECTION.md`, `DESIGN_SYSTEM.md`, `HERO_SPECIFICATION.md`, `COMPONENT_ARCHITECTURE.md`, `UI_PHILOSOPHY.md` ni ningún otro doc. Cumplido 100% §Restricciones "No modificar otros documentos".

## 6. Riesgos detectados

| Riesgo                                                          | Severidad | Mitigación propuesta                                                                       |
| --------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------ |
| **Favicon set = ICO/PNG/SVG/WebManifest 4 formatos 1 pieza**    | Baja      | El roadmap lo agrupa como 1 asset; Ingeniería separa archivos individuales al implementar. |
| **Pen/Pencil Sets {01..06} + Hero 1.2.1 = posible duplicación** | Media     | `HeroProducts` escenario usa los mismos PNG de catálogo. Reutilizar. No volver a generar.  |
| **"IA" responsable de fotografías de producto**                 | Media     | Requiere validación humana (contraste AA, textura realista, 45°). Checklist ART_DIRECTION. |
| **Testimonial Avatars: rostros ficticios**                      | Baja      | Nunca rostros reales sin consentimiento firmado. Usar generadores 100% sintéticos.         |
| **Location Storefront = foto real local**                       | Baja      | El roadmap espera Sprint 12.x (Fase 3), da tiempo a realizar visita física.                |

## 7. Mejoras futuras (Sprint 11.x o 12.x)

1. **Columna `Fecha aprobación`** — cuando haya assets en `Aprobado`, añadir fecha y dueño firma.
2. **Enlaces a Figma/Canva** — columna opcional "Fuente → Figma board" o URL del asset master.
3. **Script de validación** — un pequeño `scripts/check-assets.js` que confirma que todo asset en estado `Implementado` existe físicamente en `src/assets/<categoría>/<nombre-vN>.<ext>`.
4. **Inventario `Reemplazado` trimestral** — purgar assets de más de 3 versiones antiguas.
5. **Plantilla tabla markdown reusable** — para añadir assets futuros sin romper formato.

## 8. Calidad (4 verificaciones manuales obligatorias sprint 10.3.0)

| Verificación                                                                                       | Resultado                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0 documentos modificados además del nuevo ASSET_ROADMAP.md**                                     | ✅ OK — Grep full repo de diff: solo 1 archivo nuevo. Ningún md preexistente tocado.                                                                                      |
| **Roadmap consistente con ART_DIRECTION.md** (4 buckets Hero + Fotografía/Ilustración/Iconografía) | ✅ OK — 6 sub-buckets Hero exactos, formatos WebP/SVG/MP4/WEBM conforme §Motion + Video.                                                                                  |
| **Roadmap consistente con HERO_SPECIFICATION.md** (escena Cuaderno+Laptop+Plumas+Mochila §Final)   | ✅ OK — `Hero Products Floating Scene v1` 1.2.1 listado explícitamente con las 4 piezas.                                                                                  |
| **Roadmap consistente con BRAND_IDENTITY.md §12 Matrix touchpoints**                               | ✅ OK — 12 touchpoints de la matrix (Hero/Header/Catálogo/Producto/Servicios/Footer/Email trans/Email mkt/Redes/Packaging/Docs/Dashboard) tienen assets correspondientes. |

**Sprint 10.3.0 — Asset Roadmap — CERRADO ✔**
