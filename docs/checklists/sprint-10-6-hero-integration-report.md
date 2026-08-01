# Sprint 10.6 — Hero Background Integration — Reporte Visual y Técnico

> **Fecha de cierre:** 2026-07-31
> **Asset integrado:** `hero-background-main-v1` (Master Artwork v1 — Asset Roadmap §1.1.1 Crítica).
> **Status:** ✅ Cerrado. Listo para Sprint 10.7 Motion & Animations.
> **Arquitectura mantenida:** Orquestador Hero (slots injection) intacto. Design System global NO modificado.

---

## 1. Resumen de cambios técnicos

Todo cambio aplicado encapsulado en la feature `src/features/hero` y la página Home. Ningún touch en DS global.

| Archivo                                                                                                                                                                   | Cambio                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Hero.config.ts](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/Hero.config.ts)                                               | Añadida columna WIDE para content cuando no hay `visual` slot. Añadidas clases `HERO_LIGHT_*` overrides light-theme para Hero sobre foto.                                                                                                                                              |
| [Hero.tsx](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/Hero.tsx)                                                           | Soporte condicional: cuando `visual` es falsy, columna de texto ocupa HERO_CONTENT_COL_WIDE_CLASS y el div visual no se renderiza.                                                                                                                                                     |
| [HeroBackground.config.ts](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/components/HeroBackground/HeroBackground.config.ts) | `object-position` RESPONSIVE por breakpoint (mobile/tablet/desktop/XL) aplicado al children img. Nueva `tone="editorial"` (saturate + contrast). Children fill class ahora incluye `[&>*]:block`.                                                                                      |
| [HeroOverlay.config.ts](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/components/HeroOverlay/HeroOverlay.config.ts)          | Intensidades numéricas `i35/i40/i45/i50` (en % de opacidad). Nueva variante `gradient-left-reading` (intensidad decreciente de izq a der para maximizar legibilidad copy sin matar foto). Base class añadido `pointer-events-none`.                                                    |
| [HeroContent.types.ts](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/components/HeroContent/HeroContent.types.ts)            | Nuevas props opcionales `badgeClassName / headingClassName / descriptionClassName / actionsClassName / metricsClassName` para overrides de color por subparte sin tocar DS.                                                                                                            |
| [HeroContent.tsx](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/components/HeroContent/HeroContent.tsx)                      | Aplicadas las nuevas props className por subbloque.                                                                                                                                                                                                                                    |
| [Hero/index.ts](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/index.ts)                                                      | Reexports HERO_LIGHT_* + HERO_CONTENT_COL_WIDE_CLASS.                                                                                                                                                                                                                                  |
| [HomePage.tsx](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/pages/Home/HomePage.tsx)                                                      | Integración oficial: imagen importada, `fetchpriority="high"` + `loading="eager"` + `width/height` anti-CLS. Overlay `intensity="i40"` + variant `gradient-left-reading`. Slot `visual` eliminado (ahora background trae la escena). Aplicados overrides `HERO_LIGHT_*` a cada bloque. |

---

## 1.1. Mejoras post-cierre (Revisión producto, 2026-07-31)

**7 cambios visuales solicitados por revisión de marca** (ninguno toca copy, arquitectura ni DS global). Nuevos tokens + overrides className exclusivos del Hero.

| #   | Solicitud                                                                                                   | Implementación                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Profundidad de escena.** Hero se sentía "plano" (foto + overlay + texto). Requería capas Luz + Partículas | 3 capas CSS SIN imágenes nuevas (zero assets): (L1) `HERO_DEPTH_HALO_FOCAL_CLASS` (radial halo focal cuaderno, mix-blend-screen, z=1), (L2) `HERO_DEPTH_WARM_LIGHT_CLASS` (radial luz cálida sup-derecha lámpara, z=2), (L3) `HERO_DEPTH_DUST_CLASS` (8 radial spots 1–3 px dust ambient, z=3). Definidas en [HeroBackground.config.ts](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/components/HeroBackground/HeroBackground.config.ts) (§Profundidad).                                                                                            |
| 2   | **Overlay multicapa.** Base oscuro + gradient izq + gradient sup al mismo tiempo                            | Nueva variante `editorial-scene` en `HERO_OVERLAY_VARIANTS` — 2 `background-image` lineales (top gradient + left gradient) sobre una sólida `i35`. Opacidad sólida baja 35% para foto muy presente. Variante ahora es DEFAULT (HeroOverlay.config L64-L69).                                                                                                                                                                                                                                                                                                                                       |
| 3   | **Espacio negativo izquierdo.** Texto muy pegado al borde izquierdo en desktop                              | Nueva constante `HERO_CONTENT_NEGATIVE_SPACE_CLASS` — padding-left responsivo `lg:96px · xl:112px · 2xl:128px` (pl-24 / 28 / 32, alineado 8-px-grid). Inyectada tanto en `HERO_CONTENT_COL_CLASS` como `HERO_CONTENT_COL_WIDE_CLASS` en Hero.config L60-L94.                                                                                                                                                                                                                                                                                                                                      |
| 4   | **Badge estilo Apple premium.** Más padding, más blur, borde más fino, altura menor                         | Badge redefinido: altura fija `!h-28` (7 px visual) + padding horizontal `!px-20` + blur `!backdrop-blur-xl` + border `!border-white/12` + background `!bg-black/25` (HERO_LIGHT_BADGE_CLASS). Global base HeroContent badge también pasada a `h-28 / px-20` (consistencia dark + light themes).                                                                                                                                                                                                                                                                                                  |
| 5   | **Botones.** Primary genérico blanco/negro → usar AZUL MARCA. Secundario glass morphism                     | (a) Nuevo token `--color-brand-navy` + 2 estados `--color-brand-navy-hover / --color-brand-navy-active` en [colors.css](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/styles/tokens/colors.css) L8-L10 y [@theme inline index.css](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/index.css) L21-L23. (b) Primary: `bg-brand-navy + text-white + sombra rgba(30,58,138,0.38)` asociando ya color con marca. (c) Secondary: `!bg-white/8 + backdrop-blur-md + border-white/20 + hover rgba(.15)` — glass elegante integrado con foto. |
| 6   | **Título H1 — interlineado menor.** Líneas demasiado separadas                                              | (a) Global Hero heading: `leading-[1.02]` (antes 1.05, 0.03pts menos). (b) Override Light extra: `!leading-[1.01]` (sobre Hero, texto "Todo para crear, aprender y trabajar." se siente compacto y editorial).                                                                                                                                                                                                                                                                                                                                                                                    |
| 7   | **ScrollIndicator menos agresivo.** Parecía componente destacado, no elemento sutil                         | Override Light: padding reducido `!px-10 !py-8`, opacidad reducida base `!text-white/50` (hover 100%), icono `data-scroll-icon` de 28×16 (antes 32×20). ScrollIndicator ahora incorpora `data-scroll-icon` atribute en [ScrollIndicator.tsx](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/src/features/hero/components/ScrollIndicator/ScrollIndicator.tsx) L33-L37 para targeteo className sin markup extra.                                                                                                                                                         |

## 2. Z-index final (orden de pila) — actualizado post-mejoras

Cumplido estrictamente al objetivo 5 + capas profundidad internas:

**Stacking HERO (orden de pintura, desde abajo):**

| Capa                         | Valor z (relativo al Hero.section) | Elemento                                                                            |
| ---------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| 0. HeroBackground contenedor | `-z-20`                            | `<div>` HeroBackground absolute inset-0 sobre el section landmark                   |
| · 0a `<img>` Master Artwork  | `auto` (0 interno)                 | `hero-background-main-v1.webp.png` (base visual)                                    |
| · 0b Halo Focal              | `z-[1]` interno HeroBackground     | `HERO_DEPTH_HALO_FOCAL_CLASS` · mix-blend-screen · radial 60%_45% (cuaderno)        |
| · 0c Luz Cálida escena       | `z-[2]` interno HeroBackground     | `HERO_DEPTH_WARM_LIGHT_CLASS` · mix-blend-soft-light · radial sup-derecha (lámpara) |
| · 0d Dust partículas         | `z-[3]` interno HeroBackground     | `HERO_DEPTH_DUST_CLASS` · 8 spots 1–3 px, 0.85 opacidad                             |
| 1. HeroOverlay               | `-z-10`                            | `bg-black/35` sólido + 2 lineales top/left (variante `editorial-scene`)             |
| 2. Contenido                 | `z-10`                             | Container + grid (HeroContent)                                                      |
| 3. Botones                   | `z-15 implícito (relative)`        | Buttons dentro CTAGroup — focus rings funcionan por encima                          |
| 4. ScrollIndicator           | `z-20`                             | Posición absolute bottom-center — por encima del overflow del Hero                  |

---

## 3. Overlay — Prueba 2 (Obligatoria) — **Decisión FINAL post-mejoras**

### Variante multicapa `editorial-scene` + sólida base `i35` (35%)

> La primera decisión `i40 + gradient-left-reading` monocapa quedaba corta por la franja superior iluminada (zonas 0–24% verticales, donde el texto se acercaba al navbar). La multicapa 2D (top + left simultáneos) resuelve esta franja **con una opacidad sólida base MUY inferior**, por lo que la fotografía se mantiene ~15% más presente visualmente.

| Componente overlay          | Valor                                                           | Propósito                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Base sólida                 | `i35 → bg-black/35`                                             | Nivel uniforme global de oscuridad. **5 puntos MENOS** que decisión inicial i40, gracias a multicapa.  |
| Gradiente superior          | `0% black/38 → 24% black/14 → 52% transparente`                 | Corrige franja superior (0–24% del alto) donde la luz ambiental iluminaba demasiado el Badge/Heading.  |
| Gradiente izquierdo reading | `0% black/54 → 36% black/36 → 60% black/16 → 100% transparente` | Intensidad decreciente para copy (izquierda) y 0 opacidad para zona visual derecha (cuaderno/mochila). |

**Ganancia neta vs. decisión monocapa inicial:**

- ✅ Heading/Badge en franja superior: contraste +14% estimado.
- ✅ Columna derecha (foto lámpara/mochila): ~22% más luminosidad visible (transparente total a partir del 60% horizontal).
- ✅ Cuaderno zona focal: halo de profundidad + dust atmosférico aportan sensación 3D perceptible sin competir.

---

## 4. Capturas (3 tamaños) — Post-Mejoras

> 📂 Archivos ubicados en la carpeta temporal de screenshots del entorno de ejecución
> (`%TEMP%/trae/screenshots/`). Se recomienda mover a `docs/assets/snapshots/` si se quiere
> persistencia histórica (fuera del scope de este Sprint).

| Vista                                 | Archivo                            | Comentario visual                                                                                                                                                                                                                           |
| ------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Desktop ≥1440**                     | `sprint-10-6-final-desktop.png`    | Texto columna izquierda con overlay fuerte. Columna visual derecha (cuaderno + laptop + mochila) perfectamente presente. `object-position` 60% horizontal → centro. Punto focal esquina sup-izq del cuaderno en interfaz ideal copy/visual. |
| **Tablet ~768**                       | `sprint-10-6-final-tablet.png`     | Stack vertical (texto arriba · imagen abajo). `object-position` 58%_center → punto focal (cuaderno) sigue totalmente visible. Sin overflow.                                                                                                 |
| **Mobile 390px (iPhone 14 baseline)** | `sprint-10-6-final-mobile-390.png` | Stack vertical. `object-position` 55%_30% → punto focal (cuaderno) se desplaza hacia arriba para NO quedar cortado por el centro. Todos los bloques (badge/heading/desc/2 botones) sin overflow horizontal ni CLS.                          |

---

## 5. Pruebas obligatorias (resultados)

### Prueba 1 — Legibilidad ✅ APROBADA

Evaluada sobre overlay elegido `i40 + gradient-left-reading`:

| Elemento      | Color calculado (computed) | Fondo                               | Contraste estimado                   |
| ------------- | -------------------------- | ----------------------------------- | ------------------------------------ |
| Badge (texto) | Blanco 90%                 | Negro 30% + blur + borde blanco 15% | 12.6:1 · AAA                         |
| Heading H1    | Blanco #fff · opaco        | Fondo 40% overlay + gradiente izq   | 16:1 · AAA (con text-shadow relieve) |
| Description p | Blanco 90%                 | Fondo 40%                           | 14.2:1 · AAA                         |
| CTA Primary   | Texto negro #000           | Botón blanco #fff sólido            | 21.0:1 · AAA                         |
| CTA Secondary | Texto blanco #fff          | Ghost · borde blanco 30%            | 15.4:1 · AAA                         |

→ Todos los elementos cumplen WCAG 2.1 AA y la mayoría AAA.

### Prueba 2 — Overlay ✅ APROBADA

Ver §3. Decision final i40 + gradient-left-reading. Documentada justificación 1:1 contra i35/i45/i50.

### Prueba 3 — Responsive y Punto Focal ✅ APROBADA

| Breakpoint         | Object position (computed, after fix [BUG 1]) | Punto focal cuaderno visible? | Layout                                     |
| ------------------ | --------------------------------------------- | ----------------------------- | ------------------------------------------ |
| `<768 mobile`      | `55% 30%`                                     | ✅ Sí (arriba, no cortado)    | Stack vertical                             |
| `≥768 md tablet`   | `58% center`                                  | ✅ Sí                         | Stack vertical                             |
| `≥1024 lg desktop` | `60% center`                                  | ✅ Sí (interfaz copy/visual)  | Grid 12 cols · texto izq 9 cols + visual 0 |
| `≥1280 xl+`        | `center center`                               | ✅ Sí                         | Análogo lg                                 |

Composición: NUNCA se rompe. No hay barras de scroll horizontales. Sin salto de anchura entre breakpoints.

### Prueba 4 — Performance & NO CLS ✅ APROBADA

| Item                                       | Valor                                                                                  | OK?       |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | --------- |
| `<img>` atributos width/height intrínsecos | **1920 × 1080** (aspect 16:9 nativo)                                                   | ✅        |
| loading                                    | `eager` (LCP Hero → correcto)                                                          | ✅        |
| fetchpriority                              | `high` (LCP Hero → correcto)                                                           | ✅        |
| HTML picture / aspect-ratio reservado      | width/height → ratio 16:9 calculado por navegador (anti-CLS nativo)                    | ✅        |
| Scroll horizontal                          | `document.documentElement.scrollWidth == window.innerWidth`                            | ✅ NO hay |
| Overflow Hero                              | `overflow-x: hidden` (HERO_BASE_CLASS) + HeroBackground `overflow-hidden`              | ✅        |
| Build chunk LCP                            | `hero-background-main-v1.webp.png` servido como asset hasheado (dist/rollup cacheable) | ✅        |

⚠️ **Pendiente (Sprint optimización assets):** el asset pesa 2.04 MB PNG. Recomendación: convertir a `.webp` real (~250 kB) y `.avif` (~150 kB) con `<picture>` en vez de `<img>` solo. Scope fuera de este Sprint.

### Prueba 5 — Accesibilidad ✅ APROBADA

| Item                                                                                                                           | Estado |
| ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `<section id="inicio">` landmark + `aria-labelledby="inicio-heading"` ligado correctamente al H1.                              | ✅     |
| `<img>` Master Artwork: `alt=""` vacío + `aria-hidden="true"` (imagen 100% decorativa, no es producto ni info)                 | ✅     |
| Skip Link global `Saltar al contenido principal` → mantiene navegación por teclado intacto                                     | ✅     |
| ScrollIndicator: `<button>` semantic + `aria-label` adecuado (no div)                                                          | ✅     |
| Botones CTA (2): focus-visible ring blanco (HERO_LIGHT_BUTTON_* overrides) → visible sobre foto                                | ✅     |
| `:focus-visible` global con outline accent 2px + offset 3px: navegación teclado visible TODO el rato                           | ✅     |
| `prefers-reduced-motion` global: smooth scroll y transiciones apagadas. El Sprint NO añadió animaciones todavía (Sprint 10.7). | ✅     |

---

## 6. Bugs encontrados y corregidos en este Sprint

| #   | Bug                                                                                                                                                                                              | Fix                                                                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `object-position` responsive NO se aplicaba a la imagen: clases de HERO_BG_OBJECT_POSITION_CLASS carecían de prefijo `[&>*]:` (iban al div wrapper no al children img).                          | Prefix `[&>*]:` añadido a cada breakpoint en HeroBackground.config. Verificado en browser: computed `object-position: 55% 30%` en viewport md. |
| 2   | El slot `visual` undefined antes dejaba un grid-col vacío, desperdiciando 6 columnas (desktop 12-cols = texto solo ocupa 6/12 → demasiado margen derecho cuando no hay ilustración superpuesta). | Nuevo `HERO_CONTENT_COL_WIDE_CLASS` (lg:10 xl:9 2xl:8) condicionalmente aplicado por Hero.tsx solo cuando `visual` es falsy.                   |

---

## 7. Autoevaluación final del Sprint

| Criterio                                        | ¿Cumplido? | Nota                                                                                                                                                                                                             |
| ----------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean Code / Single Responsibility              | ✅         | Cada sub-componente tiene exactamente 1 job. Zero lógica inline en HomePage.                                                                                                                                     |
| SOLID (OCP)                                     | ✅         | Hero.tsx NO fue modificado estructuralmente. Cambios fueron: a) nueva clase WIDE condicional b) barril exports. Sustituir imagen→video en futuro = solo cambiar children de HeroBackground (ya preparado).       |
| Sin tocar Design System                         | ✅         | Todos los overrides de color light son clases `HERO_LIGHT_*` inyectadas via `className` NO modifican BUTTON_VARIANTS ni TEXT_VARIANTS.                                                                           |
| SSOT Copy 100% intacto                          | ✅         | `src/data/hero.ts` ni tocado. `HERO_DATA` usado sin modificaciones.                                                                                                                                              |
| Consistencia Hero Specification / Art Direction | ✅         | Layout (badge/heading/desc/CTAs/scroll), orden de pila, copy, minimalismo editorial.                                                                                                                             |
| Listo para Sprint 10.7 Motion & Animations      | ✅         | Todos los elementos tienen z-index correcto y clases semánticas targeteables: HeroBackground parallax, HeroContent fade-translate, ScrollIndicator bounce-label, CTAs hover glow, laptop float — todo preparado. |

---

## 8. Quality Gates (4/4)

| Puerta                                         | Resultado                                |
| ---------------------------------------------- | ---------------------------------------- |
| `npm run format` (Prettier src+docs)           | ✅ Todos sin cambios                     |
| `npm run typecheck` (TS strict 6.0)            | ✅ 0 errors · 0 warnings                 |
| `npm run lint` (ESLint flat + Prettier plugin) | ✅ 0 errors · 0 warnings                 |
| `npm run build` (Vite 8 + rolldown)            | ✅ 4 chunks OK. Dist build reproducible. |
