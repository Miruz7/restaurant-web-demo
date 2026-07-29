# AI CONTEXT

## Papelería Nova

Version: 1.0

---

# IDENTIDAD DEL PROYECTO

Papelería Nova es una Landing Page premium desarrollada como proyecto de portafolio.

No representa una empresa real.

Su propósito es demostrar habilidades avanzadas de Frontend Engineering.

El proyecto está inspirado en la calidad visual de sitios como:

- Apple
- Awwwards
- Azur Promilia

IMPORTANTE

Nunca copiar:

- código
- imágenes
- videos
- ilustraciones
- textos

Únicamente inspirarse en:

- experiencia de usuario
- composición
- ritmo visual
- elegancia
- sensación cinematográfica
- microinteracciones

Todo el diseño debe ser completamente original.

---

# OBJETIVOS

El objetivo NO es construir una página web.

El objetivo es construir una experiencia.

Cada sección debe transmitir calidad.

Cada animación debe tener un propósito.

Cada componente debe ser reutilizable.

Cada línea de código debe ser mantenible.

---

# TECNOLOGÍAS

Frontend

- React
- Vite
- TypeScript
- React Compiler

Estilos

- Tailwind CSS v4

Animaciones

- GSAP
- Lenis
- Framer Motion

Iconos

- React Icons
- Lucide React

Carruseles

- Swiper

Lint

- ESLint

---

# FILOSOFÍA DE DISEÑO

Minimalismo.

Muchísimo espacio en blanco.

Tipografía protagonista.

Fotografía de gran tamaño.

Video cinematográfico.

Movimiento elegante.

No saturar la interfaz.

No llenar la pantalla de botones.

No utilizar colores estridentes.

El contenido debe respirar.

Cada sección debe sentirse como una diapositiva premium.

---

# EXPERIENCIA DE USUARIO

La experiencia debe sentirse fluida.

El usuario nunca debe sentirse perdido.

Todas las transiciones deben ser suaves.

No utilizar animaciones innecesarias.

No animar por animar.

Las animaciones deben mejorar la experiencia.

---

# ARQUITECTURA

Siempre respetar la arquitectura del proyecto.

Nunca crear carpetas innecesarias.

Nunca mezclar lógica con presentación.

Nunca colocar datos dentro de componentes.

Separar responsabilidades.

Seguir principios SOLID cuando sea posible.

---

# ESTRUCTURA

src

assets

components

sections

layouts

hooks

lib

services

constants

data

styles

types

utils

animations

---

# COMPONENTES

Todos los componentes deben:

tener una sola responsabilidad

ser reutilizables

estar tipados

tener nombres descriptivos

evitar duplicación

no superar aproximadamente 250 líneas

Si un componente comienza a crecer demasiado:

dividirlo.

---

# TYPESCRIPT

Nunca usar:

any

Preferir:

interfaces

types

Readonly

Record

Enums únicamente cuando aporten claridad.

Siempre tipar Props.

Siempre tipar funciones.

Siempre tipar estados.

---

# REACT

Usar componentes funcionales.

Hooks.

React Compiler.

No usar clases.

Evitar renderizados innecesarios.

No abusar de useEffect.

Usar custom hooks cuando exista lógica reutilizable.

---

# ESTILOS

Utilizar Tailwind CSS.

No utilizar Bootstrap.

No utilizar Material UI.

No escribir estilos inline.

No duplicar clases.

Extraer componentes reutilizables.

---

# ANIMACIONES

La prioridad es GSAP.

Lenis controla el scroll.

Framer Motion únicamente cuando simplifique el componente.

Animaciones suaves.

Duraciones

0.6

0.8

1

segundos.

Easing preferido

power2.out

power3.out

Animaciones permitidas

Fade

Parallax

Reveal

ClipPath

Mask

Scale

Text Reveal

Opacity

Translate

Evitar

Bounce

Shake

Rotate exagerado

Zoom agresivo

---

# RESPONSIVE

Mobile First.

Debe verse correctamente desde

320px

hasta

3840px

No ocultar contenido importante.

No romper layouts.

No crear scroll horizontal.

---

# ACCESIBILIDAD

Usar HTML semántico.

Agregar alt en imágenes.

Botones con aria-label cuando sea necesario.

Contraste suficiente.

Navegación mediante teclado.

Respeto por prefers-reduced-motion cuando aplique.

---

# RENDIMIENTO

Objetivo

Lighthouse superior a 95.

Optimizar imágenes.

Usar WebP.

Usar AVIF cuando sea posible.

Videos comprimidos.

Lazy Loading.

Code Splitting.

Dynamic Imports.

Intersection Observer.

Evitar renders innecesarios.

No bloquear el hilo principal.

---

# SEO

Usar etiquetas semánticas.

Jerarquía correcta de encabezados.

Meta descripción.

Open Graph.

Favicons.

URLs limpias.

---

# GIT

Seguir Conventional Commits.

Ejemplos

feat:

fix:

docs:

style:

perf:

refactor:

test:

ci:

build:

chore:

Nunca crear commits enormes.

Realizar commits pequeños y descriptivos.

---

# CALIDAD DEL CÓDIGO

El código debe parecer escrito por un Senior Frontend Engineer.

Debe ser:

legible

escalable

mantenible

predecible

autoexplicativo

No escribir comentarios obvios.

Los nombres deben explicar la intención.

---

# DOCUMENTACIÓN

Cuando se cree un componente importante:

actualizar la documentación correspondiente.

Si cambia la arquitectura:

actualizar ARCHITECTURE.md

Si cambia el Design System:

actualizar DESIGN_SYSTEM.md

Si cambia el flujo Git:

actualizar GIT_WORKFLOW.md

---

# COMPORTAMIENTO ESPERADO DE LA IA

Antes de generar código:

1. Analizar el problema.

2. Revisar la arquitectura existente.

3. Verificar reutilización.

4. Detectar posibles mejoras.

5. Generar una solución limpia.

No generar código rápidamente.

Priorizar calidad sobre velocidad.

Siempre justificar decisiones técnicas cuando existan varias alternativas.

Nunca asumir dependencias no instaladas.

Nunca romper la arquitectura existente.

Si existe una mejor solución:

proponerla antes de implementarla.

---

# VISIÓN FINAL

Este proyecto debe parecer desarrollado por una agencia profesional.

El resultado esperado es un portafolio capaz de impresionar:

- clientes
- reclutadores
- desarrolladores senior

Cada decisión debe acercar el proyecto a ese objetivo.
