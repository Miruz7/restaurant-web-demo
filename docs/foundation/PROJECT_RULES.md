# PROJECT RULES

## Papelería Nova

Version: 1.0

---

# PROPÓSITO

Este documento define las reglas oficiales del proyecto.

Todas las decisiones de desarrollo deberán respetar estas reglas.

Si alguna regla necesita cambiar, deberá justificarse técnicamente y actualizar este documento.

---

# FILOSOFÍA

Papelería Nova NO es una simple Landing Page.

Es un proyecto de portafolio profesional.

Cada decisión debe transmitir:

- calidad
- elegancia
- simplicidad
- rendimiento
- mantenibilidad

La prioridad siempre será la calidad sobre la velocidad.

---

# IDENTIDAD VISUAL

Inspiración

- Apple
- Awwwards
- Azur Promilia

IMPORTANTE

El proyecto NO copiará:

- imágenes
- ilustraciones
- vídeos
- animaciones
- código
- textos

Solo se tomará inspiración en:

- composición
- ritmo visual
- experiencia de usuario
- sensación cinematográfica
- nivel de acabado

Toda la identidad visual será original.

---

# ALCANCE DEL PROYECTO

El proyecto consiste en una Landing Page premium.

No habrá múltiples páginas.

Toda la navegación será mediante scroll.

Las secciones estarán conectadas mediante navegación suave.

---

# ESTRUCTURA PRINCIPAL

La Landing tendrá las siguientes secciones:

- Hero
- Productos
- Servicios
- Nosotros
- Galería
- Contacto
- Footer

En el futuro podrán añadirse nuevas secciones sin romper la arquitectura.

---

# HERO

El Hero será la sección más importante del proyecto.

Reglas:

- ocupará toda la pantalla
- utilizará vídeo de fondo
- tendrá overlay oscuro
- incluirá un CTA principal
- incluirá indicador de scroll
- utilizará animaciones cinematográficas

Ninguna otra sección utilizará vídeo de fondo.

---

# ANIMACIONES

Todas las animaciones deben tener un propósito.

No se permitirán animaciones innecesarias.

Las animaciones deberán transmitir elegancia.

Las animaciones complejas se realizarán con GSAP.

Lenis controlará el scroll.

Framer Motion solo se utilizará cuando simplifique el componente.

No utilizar más de una librería para resolver el mismo problema.

---

# RESPONSIVE

El proyecto seguirá Mobile First.

Breakpoints mínimos:

320px

768px

1024px

1440px

1920px

3840px

No deberá existir scroll horizontal.

---

# TECNOLOGÍAS

Framework

React

Lenguaje

TypeScript

Bundler

Vite

Estilos

Tailwind CSS v4

Animaciones

GSAP

Lenis

Framer Motion

Iconos

Lucide React

React Icons

Carruseles

Swiper

Lint

ESLint

---

# LIBRERÍAS

No instalar nuevas librerías sin justificarlo.

Antes de instalar una dependencia comprobar:

¿Puede hacerse con React?

¿Puede hacerse con CSS?

¿Puede hacerse con GSAP?

¿Puede hacerse reutilizando código existente?

Solo instalar cuando exista un beneficio claro.

---

# CÓDIGO

Todo el código deberá ser:

- limpio
- modular
- escalable
- reutilizable
- tipado
- mantenible

Nunca escribir código temporal.

Nunca dejar TODOs permanentes.

Nunca dejar código comentado.

---

# TYPESCRIPT

Prohibido:

any

Preferir:

interfaces

types

Readonly

Utility Types

Siempre tipar:

Props

Estados

Funciones

Eventos

---

# COMPONENTES

Cada componente debe tener una sola responsabilidad.

Los componentes UI deberán ser completamente reutilizables.

No crear componentes específicos cuando uno genérico pueda resolver el problema.

---

# ESTILOS

Toda la interfaz utilizará Tailwind CSS.

No utilizar Bootstrap.

No utilizar Material UI.

No utilizar estilos inline.

No mezclar diferentes metodologías CSS.

---

# DESIGN SYSTEM

Todo color deberá provenir del Design System.

Toda tipografía deberá provenir del Design System.

Todos los espacios deberán seguir el sistema de 8px.

No utilizar tamaños arbitrarios sin justificación.

---

# RENDIMIENTO

Objetivo:

Lighthouse superior a 95.

Optimizar:

- imágenes
- vídeos
- JavaScript
- CSS

Usar:

- Lazy Loading
- Code Splitting
- Dynamic Imports
- Intersection Observer

Evitar renders innecesarios.

---

# ACCESIBILIDAD

Todo componente deberá ser accesible.

Utilizar HTML semántico.

Agregar atributos ARIA cuando sean necesarios.

Mantener contraste adecuado.

Permitir navegación mediante teclado.

Respetar prefers-reduced-motion cuando aplique.

---

# SEO

Mantener una jerarquía correcta de encabezados.

Usar metadatos.

Open Graph.

Favicons.

URLs limpias.

Texto alternativo en imágenes.

---

# GIT

Utilizar Conventional Commits.

Cada commit deberá representar una única responsabilidad.

Ejemplos:

feat:

fix:

docs:

style:

refactor:

perf:

build:

test:

ci:

chore:

Nunca realizar commits gigantes.

---

# DOCUMENTACIÓN

Toda decisión importante deberá reflejarse en la documentación.

Si cambia la arquitectura:

Actualizar ARCHITECTURE.md

Si cambia el Design System:

Actualizar DESIGN_SYSTEM.md

Si cambia el flujo:

Actualizar AGENT_WORKFLOW.md

---

# REVISIÓN DE CÓDIGO

Antes de considerar una tarea terminada comprobar:

✔ Arquitectura

✔ Responsive

✔ Tipado

✔ Accesibilidad

✔ Performance

✔ Reutilización

✔ Limpieza del código

✔ Consistencia visual

---

# DEFINICIÓN DE TERMINADO (Definition of Done)

Una funcionalidad solo se considerará terminada cuando:

✔ Funcione correctamente.

✔ Sea responsive.

✔ Esté completamente tipada.

✔ Respete la arquitectura.

✔ Sea reutilizable.

✔ Pase ESLint sin errores.

✔ Mantenga el rendimiento.

✔ Respete el Design System.

✔ Esté documentada cuando sea necesario.

---

# VISIÓN A LARGO PLAZO

Papelería Nova debe convertirse en una plantilla premium reutilizable.

El proyecto debe permitir cambiar fácilmente:

- logotipo
- colores
- contenido
- imágenes
- vídeos

sin modificar la arquitectura.

El objetivo final es reutilizar esta base para futuros clientes y proyectos profesionales.
