# Hero Specification

1. Objetivo

2. Principios del Hero

3. Arquitectura del Hero

4. Layout

5. Contenido

6. Componentes

7. Motion

8. Recursos Visuales

9. Responsive

10. Accesibilidad

11. Implementación

12. Checklist

## Objetivo

El Hero es el primer punto de contacto entre el usuario y Papelería Nova.

Su función principal es comunicar la identidad de la marca, generar confianza y presentar de forma inmediata la propuesta de valor.

El Hero debe transmitir organización, creatividad y profesionalismo antes de que el usuario comience a explorar el resto del sitio.

## Principios

El Hero debe:

- Comunicar confianza en menos de cinco segundos.
- Mantener una composición limpia.
- Utilizar movimiento únicamente para reforzar la experiencia.
- Destacar el contenido por encima de los efectos visuales.
- Mantener una excelente legibilidad.

## Arquitectura

Hero
│
├── Background
│
├── Overlay
│
├── HeroContent
│ ├── Badge
│ ├── Heading
│ ├── Description
│ ├── CTAGroup
│ └── Metrics
│
└── HeroVisual

## Layout

┌──────────────────────────────────────────────────────────────┐

           HEADER

──────────────────────────────────────────────────────────────

TEXTO IMAGEN

Badge Productos

Título Cuadernos

Descripción Laptop

Botones Plumas

                                Mochila

──────────────────────────────────────────────────────────────

Scroll Indicator

└──────────────────────────────────────────────────────────────┘

## Contenido

Aquí escribiremos el copy definitivo.
No improvisaremos cuando programemos.
Ejemplo:
Badge
Papelería • Impresión • Tecnología
Título
Yo propondría algo como:
Todo para crear, aprender y trabajar.
Es corto.
Fácil de recordar.
Y representa toda la marca.
Descripción
Desde artículos escolares hasta soluciones para oficina e impresión digital. Todo en un mismo lugar con una experiencia moderna y organizada.
CTA principal
Explorar productos
CTA secundario
Conoce nuestros servicios

## Componentes React

Hero
↓
HeroBackground
↓
HeroContent
↓
HeroVisual
↓
CTAGroup
↓
ScrollIndicator

## Motion

Aquí sí reutilizaremos VA-3.
Por ejemplo:
Entrada
Fade + TranslateY
600 ms.
Imagen
Movimiento flotante muy lento.
Botones
Hover
Escala
Glow
Scroll Indicator
Movimiento vertical continuo.
Cambio de imágenes
Aquí quiero proponerte algo distinto.
En lugar de cambiar completamente el Hero cada 4 segundos como Azur Promilia...
Podemos dejar fija la composición y hacer que solo algunos productos roten lentamente.
Eso sería mucho más apropiado para Nova.

## Recursos visuales

Aquí haremos una lista.
Necesitaremos:
Logo.
Hero principal.
Productos.
Ilustraciones.
Iconos.
Patrones.
Fondos.
Cada recurso tendrá un prompt y una guía para mantener coherencia visual.

## Responsive

Aquí definiremos el comportamiento.
Desktop
Dos columnas.
Tablet
Imagen debajo.
Móvil
Una sola columna.
Nada de improvisar durante el desarrollo.

## Accesibilidad

Lista de comprobación:
Contraste AA.
Navegación por teclado.
Alt en imágenes.
Botones con nombres descriptivos.
Animaciones respetan prefers-reduced-motion.

## Implementación

Aquí conectaremos con React.
Componentes.
Props.
Estados.
Animaciones.
Hooks.
Responsabilidades.
Todo definido antes de escribir código.

## Checklist

- [ ] El Hero debe transmitir la identidad de la marca.
- [ ] Copy aprobado
- [ ] Layout aprobado
- [ ] Motion aprobado
- [ ] Responsive aprobado
- [ ] Recursos generados
- [ ] Implementado
- [ ] Revisado
- [ ] Documentado

## Diseñemos el Hero como una historia, no como un banner.

La mayoría de las landing pages tienen un Hero que solo dice "Compra aquí". Nosotros podemos hacer que el Hero responda, en orden, a las preguntas que un visitante se hace al entrar:
¿Qué es Nova? (Badge y título).
¿Por qué debería interesarme? (Descripción).
¿Qué puedo hacer aquí? (CTAs).
¿Qué transmite la marca? (Composición visual, iluminación y movimiento).
Si el usuario obtiene esas respuestas en pocos segundos, el Hero habrá cumplido su objetivo.

## Combinación

Una escena moderna de la papelería con una composición de productos destacándose en primer plano.
Es la más ambiciosa, pero también la que puede ofrecer una identidad visual más fuerte.
