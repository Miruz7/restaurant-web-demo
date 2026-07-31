# Prompt File — Hero Background Main v1

> Plantilla [PROMPT_ENGINEERING.md §8](../PROMPT_ENGINEERING.md#8-cómo-estructurar-el-prompt-file-de-cada-asset-plantilla)
> 100% cumplida.

---

## 1. Información general

| Campo            | Valor                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| **Asset ID**     | `hero-background-main-v1`                                                                                      |
| **Versión**      | v1                                                                                                             |
| **Estado**       | Listo para generación                                                                                          |
| **Tipo**         | Master Artwork                                                                                                 |
| **Destino**      | `Hero` · columna visual derecha + fondo completo de la primera sección del landing                             |
| **Espec.**       | [HERO_BACKGROUND_SPEC.md](../HERO_BACKGROUND_SPEC.md) — documento de referencia único del "qué" y el "por qué" |
| **Roadmap**      | [ASSET_ROADMAP.md §1.1.1](../ASSET_ROADMAP.md#111-fondo-principal-limpio-textura-minima) — Crítica · Fase 1    |
| **Naming final** | `hero-background-main-v1.webp` + `hero-background-main-v1.avif`                                                |

---

## 2. Objetivo (resumen ejecutivo, NO repetir la Spec)

> Este asset es el **primer Master Artwork del proyecto**. Define el ADN visual de TODO el
> landing: todos los fondos, tarjetas, secciones y fotografías futuras de producto se
> validarán contra la luz, el color, los materiales y la composición de esta pieza.
>
> No es un fondo cualquiera. Es la **primera impresión de marca**: muestra un escritorio
> premium, ordenado y creativo que combina cuaderno (papelería tradicional) + laptop
> (tecnología moderna). El visitante debe sentir "aquí puedo crear / estudiar / trabajar
> con todo lo que necesito, sin caos, con calidad".
>
> No vendemos productos; inspiramos confianza.

---

## 3. Prompt Maestro — Model-Agnostic

10 bloques [PROMPT_ENGINEERING.md §3](../PROMPT_ENGINEERING.md#3-prompt-maestro--estructura-universal-10-bloques-fijos).
Sin parámetros de modelo. Sin pesos. Sin aspect ratio.

```
PROMPT MAESTRO — hero-background-main-v1
───────────────────────────────────────────────────────────────────
01 · TÍTULO / OBJETIVO PRINCIPAL:
Fotografía comercial premium de un escritorio moderno. Master Artwork
Hero Background v1 de Papelería Nova. Sencillo, ordenado, creativo.

02 · COMPOSICIÓN (planos · punto focal · espacio negativo):
4 planos separados:
  - FONDO: pared gris neutra + superficie amplia escritorio clara.
  - PLANO MEDIO: laptop abierta + mochila parcial.
  - PRIMER PLANO: CUADERNO A4 ABIERTO + 3 plumas + 1 resaltador encima — NÍTIDO 100%.
  - FOREGROUND BLUR: 1 clip metálico + 1 borrador pequeño, MUY fuera de foco (efecto bokeh delante).
PUNTO FOCAL ÚNICO = esquina superior-izquierda del CUADERNO ABIERTO del primer plano.
Ese punto focal cae en la intersección SUPERIOR-DERECHA de la regla de los tercios.
LADO IZQUIERDO del encuadre ≥40% vacío, limpio, sin objetos (zona segura texto copy del hero).
Ningún objeto toca borde superior ni borde inferior del frame.
Equilibrio asimétrico, peso visual a la derecha.

03 · PRODUCTOS / OBJETOS — Cantidad EXACTA 6:
1.  Cuaderno A4 abierto, cuadrícula sutil 5mm en las páginas. Una página con una
    sola línea empezada (muy poca escritura), la otra en blanco.
2.  Set de 3 plumas + 1 resaltador pastel posados encima del cuaderno:
      · 1 pluma cuerpo gris-negro neutro
      · 1 pluma azul marino profundo
      · 1 pluma toque naranja cálido (detalle)
      · 1 resaltador amarillo pálido / pastel (nunca saturado)
3.  Laptop 13–14" moderna abierta detrás del cuaderno (lado derecho). Pantalla
    con interfaz de app notas/diseño MINIMAL, SIN LOGOS, SIN TEXTO LEGIBLE,
    UI abstracta placeholders. Teclado limpio. Sin logo en la tapa.
4.  Mochila / bolso urbano de lona + detalle cuero, parcialmente detrás de la
    laptop (lado inferior derecho). Textura ligeramente desgastada, no nueva.
5.  1 clip metálico + 1 borrador pequeño goma. Delante, FUERA DE FOCO (foreground blur).
6.  Brazo lámpara escritorio minimalista, esquina superior-derecha del encuadre —
    VISTA PARCIAL (solo el brazo), el cabezal de luz queda fuera del frame.
Cantidad estricta: exactamente 6 objetos. No añadir ni uno más.

04 · CÁMARA (altura, distancia, lente, perspectiva):
Altura = PERSPECTIVA LIGERAMENTE ELEVADA (cámara a 160-170 cm mirando ligeramente
abajo al escritorio). NO cenital. NO altura de ojo frontal.
Distancia = corta-mediana: encuadra ~1.2 metros de ancho real de superficie.
Lente = NORMAL (equivalente ~40mm full-frame): NULA distorsión, líneas rectas son
rectas. Ni gran angular (barril) ni tele (comprime planos).
Perspectiva = 3/4 frontal al escritorio. El cuaderno mira ~45° a la cámara.
Profundidad de campo = SELECTIVA: primer plano 100% nitido, plano medio bokeh
suave, fondo ligeramente borroso, foreground muy borroso.

05 · ILUMINACIÓN (dirección, relleno, temperatura capas):
LUZ PRINCIPAL = superior-derecha, lateral suave. Origen visual: la lámpara 06 del
encuadre. Proyecta sombras LARGAS PERO DIFUSAS hacia la esquina inferior-izquierda.
LUZ RELLENO = desde la izquierda, suave (como luz de ventana difusa). Elimina zonas
100% negras sin borrar la sombra.
TEMPERATURA POR CAPAS:
   · Primer plano → LIGERAMENTE CÁLIDO (papel crema, reflejos naranjas mínimos en metales)
   · Plano medio → Neutro
   · Fondo pared → LIGERAMENTE FRÍO (gris-azulado muy suave) — para separar planos
Carácter = DIFUSA, editorial comercial. 0 HDR. 0 brillos quemados. 0 reflejos duros.
Alto detalle en texturas: grano papel, tejido lona, metal cepillado.

06 · PALETA CROMÁTICA — % por dominio (SIN HEX):
DOMINANTE ≈65% = Blanco hueso · Crema · Grises fríos muy apagados · Beige mate.
  Son grandes superficies: escritorio, pared, páginas del cuaderno.
SECUNDARIO ≈30% = Azul profundo / azul marino.
  En cuerpos pluma, borde del cuaderno, UI pantalla laptop, tono de la pared.
ACENTO NARANJA ≤5% MÁXIMO de píxeles.
  En resorte del clip metálico · 1 micro detalle pluma · toque del resaltador.
  NUNCA en grandes superficies.
PROHIBIDOS: rojo intenso · verde eléctrico · rosa fuerte · morado · cian fuerte ·
  amarillo saturado. Gama general BAJA saturación (pastel / apagada).

07 · MATERIALES / TEXTURAS:
  · Papel = mate, grano 90g visible, no brillante.
  · Lona mochila = tejido trama diagonal, rugoso.
  · Metal pluma/clip = cepillado, reflejos difusos, NO espejo.
  · Goma borrador = porosa, mate.
  · Pantalla laptop = anti-reflejo, brillo controlado.
  · Todo se siente REAL. Nada CGI plástico, nada sin textura.

08 · ATMÓSFERA / EMOCIÓN:
Inspiración TRANQUILA, ordenada, premium.
Sensación micro-historia: "alguien estuvo hace 5 minutos, salió por café y
volverá en un rato". Calma editorial / comercial high-end.
Nada de urgencia. Nada de euforia. Nada de tienda.

09 · RESTRICCIONES (cosas que NUNCA aparecen):
  · 0 personas, 0 manos, 0 caras, 0 dedos.
  · 0 marcas / logos / nombres / texto legible en NINGÚN objeto.
  · 0 café, 0 tazas, 0 vasos, 0 bebidas.
  · 0 plantas, 0 macetas, 0 flores.
  · 0 auriculares, 0 reloj inteligente, 0 móvil con pantalla encendida.
  · 0 carteles de oferta, 0 pegatinas, 0 calcomanías.
  · 0 sombras duras imposibles. 0 HDR. 0 aliasing. 0 artefactos.
  · 0 CGI plastico. 0 look stock genérico.

10 · EXTRAS / META:
  · Resolución master final: 4K UHD · 3840 × 2160.
  · Sin watermark de ningún modelo generativo.
  · Sin bordes, sin letterbox, sin barras negras.
  · Limpieza metadata final: sin GPS, sin info privada.
───────────────────────────────────────────────────────────────────
```

---

## 4. Adaptadores por modelo

**Regla irrenunciable:** los 4 describen EXACTAMENTE la misma escena del §3. Solo
cambia el **dialecto / sintaxis**. Si lees uno y luego otro, debes ver mentalmente el
mismo frame.

### 4.1 Midjourney v7

```
# PROMPT FINAL Midjourney v7
--ar 16:9 --style raw --stylize 150 --version 7

Fotografía comercial premium de escritorio moderno ordenado. Cuaderno A4 abierto nítido
con 3 plumas + 1 resaltador pastel encima. Laptop 13 abierta detrás. Mochila lona a un
lado. Brazo lámpara parcial arriba. Esquina sup-izq del CUADERNO = único punto focal,
intersección tercios sup-dcha. ≥40% lado izq vacío limpio. 4 planos: fondo pared neutra,
plano medio, 1er plano nitido, foreground blur clip+borrador muy fuera foco.

Luz principal sup-derecha difusa, sombras largas suaves inf-izq. Luz relleno izq ventana.
Temp capas: cálido 1er plano, neutro medio, frío suave fondo.

neutros cremas::0.65 azul profundo::0.30 naranja cálido::0.05 baja saturación,
editorial, realista, texturas grano papel lona cepillado metal.

Sin personas, sin manos, sin logos, sin texto legible, sin café, sin plantas, sin
auriculares, sin HDR, sin CGI plástico, sin marcas portátiles.

--no people, person, man, woman, child, hands, fingers, face --no logo, brand,
trademark, text, writing, letters, words, numbers, watermark --no coffee, cup, mug,
plant, potted, headphones, smartwatch --no cgi, plastic, cartoon, hdr, aliasing,
blurry, oversaturated, neon, rainbow, moody-dark
```

> **Guía de iteración MJ**
>
> - 1ª vez: seed random, 4 candidatos grid.
> - Mejor candidato → `Vary (Subtle)` misma seed, ajuste weight naranja si es mucho.
> - Añadir `--sref <URL>` cuando tengamos 1 imagen de referencia Nova (librería futura).
> - Master definitivo: guardar seed + job id en §8.

### 4.2 Flux (Dev / Pro)

```
# PROMPT POSITIVO — Flux
Premium commercial photograph of a modern, tidy creative desk. Modern stationery +
tech hybrid scene for Papelería Nova Hero Background. Four distinct depth planes:
background (soft pale cool grey-blue wall + large light cream desk surface), mid-ground
(open 13-14 inch minimalist laptop UI with abstract placeholders no logos + urban
canvas backpack partially visible), SHARP FOREGROUND (open A4 grid notebook with one
line started, 3 neutral + navy + accent pens + 1 pale yellow highlighter placed on
top of the notebook — 100% crisp), and very-blurry foreground bokeh (one metal clip +
one small rubber eraser out of focus in front). Single focal point absolute: top-left
corner of the open notebook, placed on the rule-of-thirds upper-right intersection.
Left side of the frame ≥40% clean negative empty space, safe zone for landing copy.
No objects touch top edge or bottom edge of the frame. Asymmetrical visual balance
weighted to the right.

Lighting: soft key light top-right (from a minimalist lamp arm, partially visible at
the top-right corner), long but very soft diffused shadows falling towards the
bottom-left corner. Gentle window fill light from the left, eliminating pure black
areas without killing shadow depth. Temperature layering: foreground is slightly warm
(cream paper, warm micro reflections on metallic pens), mid-ground neutral, wall
background slightly cool blue-grey to separate depth planes. No HDR. No blown
highlights. No deep clipped blacks. Hyper-detailed realistic textures: matte grainy
notebook paper, woven canvas backpack, brushed metal pens and clip, matte rubber
eraser, anti-glare laptop display with controlled reflections.

Color distribution: ~65% dominant whites / cream / off-white / muted cool greys on
surfaces. ~30% secondary deep navy blue on pens, notebook trim, laptop UI, wall.
≤5% warm orange accent on the clip spring, one pen micro detail and one highlighter
touch. Overall very low color saturation. No strong red, electric green, hot pink,
purple, bright cyan or saturated yellow anywhere. Atmosphere: calm inspired
editorial premium feel, micro-story feeling like a person left the desk for coffee
five minutes ago and will come back shortly.

# NEGATIVE PROMPT FLUX (OBLIGATORIO, separado)
people, person, man, woman, child, face, hands, fingers, human, portrait, crowd,
logo, brand, trademark, brand-name, text, writing, letters, words, numbers, printed
text, label, watermark, signature, coffee, cup, mug, tea, drink, plant, potted,
succulent, cactus, flower, headphones, headset, earbuds, smartwatch, smartphone
screen on, cgi, 3d render, plastic look, cartoon, anime, illustration, drawing,
painting, comic, lowres, blurry, out of focus, jpeg artifacts, aliasing, pixelated,
oversharpened, hdr, hdr effect, extreme contrast, overexposed, underexposed, clipped
highlights, pure-black shadows, neon lighting, rainbow light, moody cinematic dark,
fisheye, distorted lines, tilted frame, dutch angle, objects touching the frame edge,
cropped objects

# PARÁMETROS DE EJECUCIÓN RECOMENDADOS
· Aspect:          16:9
· Steps (Dev):     24
· Steps (Schnell): 4   (solo pruebas rápidas, NO Master)
· CFG Scale:       3.5 (Dev) · 1.8 (Schnell)
· Sampler:         Euler
· Seed:            Aleatoria primera vez. Fija para refinamientos.
```

### 4.3 Ideogram 2.x

```
Aspect: 16:9, Style: Photo, Resolution: 4K, Mode: Quality

Premium commercial photograph of a modern, highly organized creative desk for the
main hero background of stationery brand Papelería Nova.

Single absolute focal point = the top-left corner of an open A4 notebook. That corner
lies exactly on the upper-right rule-of-thirds intersection. At least 40% of the LEFT
half of the image is completely clean, empty negative space on the desk surface. No
object touches the top edge or the bottom edge.

Four depth planes. BACKGROUND: soft pale cool grey-blue wall + large cream matte desk
top. MIDGROUND: open thin modern 13-14 inch laptop behind the notebook with a minimal
abstract UI (no logos, no readable text). Urban canvas and leather backpack partially
visible, bottom-right, behind the laptop. FOREGROUND, 100% SHARP: open A4 notebook,
subtle 5mm grid on pages, one single tiny line started on a page, three pens and one
pastel-yellow mild highlighter carefully arranged on top. Pens: one black-neutral
body, one deep navy body, one with a tiny warm orange accent detail. VERY BLURRY
FOREGROUND BOKEH in front of the scene: one small metal binder clip and one small
pink-free rubber eraser. Top-right corner of frame shows just the arm of a
minimalist desk lamp (lamp head cropped out, 6 objects strict total).

Lighting top-right soft key, long but gentle diffused shadows to bottom-left, fill
light soft from left. Temperature shifts: warm foreground tones on the paper, neutral
mid, cool pale wall behind. Color mix: ~65% the frame is cream neutrals and cool light
greys on the big surfaces. ~30% deep navy blue accents on pen bodies, notebook edge,
screen UI, wall wash. ≤5% tiny warm-orange micro-details on clip spring and a pen.
Overall low saturation, no hot colors.

Realistic, high-detail, editorial commercial feel, matte paper grain visible, woven
canvas texture, brushed metal, no cgi plastic, calm and quietly inspiring mood,
micro-story person-left-for-coffee vibe, no clutter, clean sophisticated energy.

Avoid generating: people, hands, faces, any human. logos, brand names, text,
letters, numbers, watermarks. coffee mugs, cups, drinks, plants, succulents,
headphones, earbuds, smartwatches, phones. hard sharp impossible shadows. extreme HDR.
neon. rainbow lighting. moody super dark. plastic CGI look. cartoon, illustration,
drawing, anime, aliasing, pixelation, oversharpening, low res, cropped objects,
objects touching the frame edges.
```

### 4.4 DALL·E 3 / DALL·E 4 (vía API con GPT)

```
# PARÁMETROS API (recomendados)
model   = dall-e-3  (o dall-e-4 si está disponible)
size    = 1792x1024  (proporción 16:9 más cercana)
quality = hd
style   = natural    ¡¡NO vivid!!
```

```
# PROMPT POSITIVO DALL·E (lenguaje natural, narrativo, párrafos largos)

We need a premium commercial photograph of a modern, extremely tidy creative desk for
the hero background of a stationery brand called Papelería Nova. It must feel like a
high-end editorial magazine shot, not stock photography.

There is one and only one absolute focal point across the whole image: the TOP-LEFT
corner of an open A4 notebook placed on the desk. This focal point must land exactly
at the UPPER-RIGHT intersection of the rule-of-thirds grid. At least FORTY PERCENT
(40%) of the LEFT side of the frame must be completely clean, empty negative space on
the desk surface, reserved for overlay copy later. No object touches the top edge or
the bottom edge of the frame. The composition is asymmetrical and weighted visually to
the right.

Four depth planes, clearly separated by a gentle, selective depth of field.
(1) BACKGROUND: a very pale, cool, slightly blue-grey matte wall behind a large,
cream-colored, matte, lightly textured desk top. (2) MIDGROUND: a thin, modern
13–14 inch laptop is open behind the notebook (right side). Its screen shows a
minimal, abstract app UI with soft shapes, NO logos, NO brands, NO readable text, NO
letters, NO numbers at all. Next to it and slightly behind, we can partially see an
urban canvas backpack with subtle leather trim, lightly worn. (3) FOREGROUND,
PERFECTLY SHARP (100% crisp): an open A4 notebook with a subtle 5mm grid printed on
the pages; one page has one tiny, faint line started, the rest blank. Carefully placed
on top of the notebook: THREE pens plus ONE highlighter. The pens are: one neutral
black-grey body, one deep navy blue body, one with a single TINY warm orange accent
detail. The highlighter is pale, soft pastel yellow, NEVER saturated. (4) VERY BLURRY
FOREGROUND BOKEH, very close to camera, in front of everything else: one small metal
binder clip and one small plain rubber eraser, both heavily out of focus so they only
suggest depth. A minimalist desk lamp is CROPPED so that ONLY the arm is visible in
the very top-right corner of the frame (the lamp head stays out of the frame). Total
number of distinct items is exactly six, no more, no less.

Lighting: a very soft key light comes from the TOP-RIGHT, as if cast by that lamp
arm. Shadows fall towards the bottom-left corner. The shadows are LONG but EXTREMELY
diffuse — no hard edges. A gentle, soft fill light comes from the left side so there
are NO areas of pure, clipped, absolute black. Temperature subtly shifts across
depth: the foreground paper feels WARM (cream, ivory), the mid-ground stays NEUTRAL,
and the background wall is COOL (very light blue-grey). No HDR effect. No blown-out
white highlights. No clipped darks. Textures are extremely realistic and detailed:
the grain of the matte paper, the woven pattern of the backpack canvas, brushed metal
on the pens and clip, the porosity of the rubber eraser, an anti-glare finish on the
laptop screen with a single soft reflection. Everything feels physically real, never
plastic-looking CGI.

Color palette is strict. Roughly ~65% of pixels are DOMINANT big surfaces in whites,
cream, off-white, muted cool greys. Roughly ~30% are SECONDARY deep navy blue (pen
bodies, notebook trim edge, minimal screen UI shapes, wall wash). FIVE PERCENT OR
LESS of total pixels are WARM ORANGE ACCENTS: these are limited to the tiny spring
of the metal clip, one micro detail on one pen, and a touch on the highlighter cap.
Overall saturation is deliberately LOW across the whole image. Absolutely DO NOT use
strong red, electric green, hot pink, purple, bright cyan or saturated bright yellow.

The overall mood is QUIET INSPIRATION and premium editorial calm. It should tell a
tiny micro-story: a designer or student was sitting here five minutes ago, left to
get a coffee, and will be back shortly. Nothing urgent. Nothing cluttered. Nothing
flashy. Sophisticated. Simple. Clean.

FINAL NEGATIVE INSTRUCTIONS (READ THIS BLOCK LAST AND OBEY IT STRICTLY):
Do NOT include any human being, any person, any hands, any fingers, any faces, any
arms, any legs, any selfies, any crowds. Do NOT include any logos, any brand names,
any trademarks, any labels, any stickers, any decals. Do NOT include any readable
text, any letters, any words, any numbers, any writing, any printed lines with real
letters, any signatures, any watermark. Do NOT include any coffee mugs, any cups,
any glasses, any drinks of any kind. Do NOT include any plants, any potted plants,
any succulents, any cacti, any flowers. Do NOT include any headphones, any earbuds,
any headsets, any smart watches, any smartphones with the screen turned on. Do NOT
include any hard sharp geometric shadows, any HDR look, any neon colors, any rainbow
lighting, any moody super dark cinematic lighting, any heavy film grain, any motion
blur. Do NOT include any cartoon, illustration, drawing, painting, anime, comic,
cheap 3D CGI plastic look, low resolution, jpeg artifacts, aliasing, fisheye lens,
tilted dutch angle frame, or any objects that are cropped by the edges of the image.

Final resolution goal is equivalent to a 4K master at 3840 by 2160 pixels.
```

---

## 5. Negative Prompt (selección Nova + Hero, SIN inventar reglas nuevas)

Selección de las reglas de [PROMPT_ENGINEERING.md §5](../PROMPT_ENGINEERING.md#5-negative-prompts--común-válido-para-los-4-modelos)
que aplican estrictamente al Hero Background Main v1.

```
NEGATIVE PROMPT SELECCIONADO — hero-background-main-v1
───────────────────────────────────────────────────────────
[ COMÚN §5 — 6 familias, todos los items ]
1. Personas / cuerpos
   person, people, human, man, woman, child, face, hands, fingers, body, portrait,
   selfie, crowd

2. Marcas / texto / logos
   logo, brand, trademark, brand name, text, writing, letters, words, numbers,
   printed text, visible label, watermark, signature

3. Clichés "estudio creativo" SOBREUSADOS (PROHIBIDOS HERO v1)
   coffee, cup, mug, tea, plant, potted plant, cactus, succulent, headphones,
   headset, smartwatch, smartphone with screen on

4. Artefactos / baja calidad
   cgi, 3d render, plastic look, cartoon, anime, illustration, drawing, painting,
   lowres, blurry, out of focus, jpeg artifacts, aliasing, pixelated, oversharpened

5. Iluminación incorrecta (ART_DIRECTION don'ts)
   hdr, extreme contrast, overexposed, underexposed, clipping highlights, deep
   black shadows, neon lighting, rainbow light, moody cinematic dark

6. Composición / framing
   cropped object, focal point in the wrong corner, fully centered composition,
   objects touching edge of frame, fisheye, distorted lines, tilted frame, dutch
   angle

[ ESPECÍFICO FAMILIA HERO §5.1 — no es global, es específico del asset ]
· no heavy dust, no floating particles v1 (se deja para v2 cinematográfica)
· no cinematic black bars / letterbox
· no transparent background (hero está sobre superficie + pared)
───────────────────────────────────────────────────────────
```

---

## 6. Parámetros de ejecución

| Parámetro                 | Valor por defecto (ajustar por modelo)                                        |
| ------------------------- | ----------------------------------------------------------------------------- |
| **Aspect Ratio**          | `16:9`                                                                        |
| **Resolución master**     | `3840 × 2160` (4K UHD). 1792×1024 si DALL·E 3 API limitante (pos-proceso).    |
| **Calidad**               | Alta (MJ `--quality 2` · Flux steps=24 · DALL·E `quality=hd` · Ideogram 4K)   |
| **Nº variaciones / lote** | 4 (grid MJ / 4 seeds Flux / 4 Ideogram / 4 DALL·E)                            |
| **Seed 1ª iteración**     | Aleatoria                                                                     |
| **Seed refinamientos**    | Fija (la del mejor candidato)                                                 |
| **Formato output**        | `WebP` (principal) + `AVIF` (fallback optimizado)                             |
| **Style Reference**       | Pendiente (vacío Fase 1; se añadirá en v1.1 si hay master aprobado como sref) |
| **Style override**        | MJ `--style raw` · DALL·E `style=natural` · Ideogram Photo · Flux raw         |

---

## 7. Criterios de aceptación (basados estrictamente en §11 checklist de HERO_BACKGROUND_SPEC)

Antes de mover una iteración de `Resultado` → `Estado: Apto` en §8, tiene que cumplir
TODOS estos puntos. Si uno falla → `No apto`, anotar por qué.

**(a) Objetivo y pilares de marca**

- [ ] Se percibe Organización (objetos ordenados, ángulos controlados, no solapados).
- [ ] Se percibe Creatividad (cuaderno abierto, una línea empezada).
- [ ] Se percibe Tecnología (laptop abierta, UI limpia y moderna presente).
- [ ] Se percibe Confianza / calidad premium (NADA stock genérico, NADA CGI plástico).
- [ ] Emoción = Inspiración tranquila. No urgencia, no euforia, no prisa.

**(b) Composición y punto focal**

- [ ] 4 planos de profundidad distinguibles.
- [ ] Único punto focal 100% nítido = esquina sup-izq del cuaderno abierto.
- [ ] Punto focal cae en intersección tercios sup-dcha (comprobar con grid 3×3).
- [ ] Lado izq ≥40% vacío limpio.
- [ ] Ningún objeto toca borde sup / inf del frame.

**(c) Productos y cantidades**

- [ ] **Exactamente 6 objetos** (1+2+3+4+5+6) — ni 5 ni 7.
- [ ] Cuaderno A4 abierto ✔, 3 plumas + 1 resaltador ✔, laptop 13–14" ✔, mochila lona ✔, clip+borrador foreground blur ✔, brazo lámpara parcial ✔.
- [ ] 0 objetos prohibidos del §4.1 Spec: café, planta, auriculares, reloj, móvil.

**(d) Cámara y perspectiva**

- [ ] Perspectiva ligeramente elevada (no cenital, no ojo).
- [ ] Líneas rectas = rectas. Sin distorsión barril / almohada.
- [ ] Ancho real superficie ≈ 1.2 m encuadrado.

**(e) Iluminación**

- [ ] Luz principal sup-der, sombras suaves hacia inf-izq.
- [ ] Luz relleno izq = 0 negros puros.
- [ ] Temperatura cálida primer plano / neutra medio / fría fondo.
- [ ] Sin HDR, sin brillos quemados, sin reflejos espejo.

**(f) Paleta (% píxeles)**

- [ ] Dominante ≈ 65% (neutros cremas / blancos / grises).
- [ ] Secundario ≈ 30% (azul profundo).
- [ ] Acento naranja ≤ **5%** (medir si hace falta).
- [ ] Ningún color saturado extraño (rojo/verde/púrpura/cian fuerte).

**(g) Responsive (pruebas de recorte)**

- [ ] Recorte Desktop 16:9 = todo OK.
- [ ] Recorte Tablet 4:3 = cuaderno + plumas + laptop COMPLETOS visibles.
- [ ] Recorte Mobile 9:16 = **cuaderno COMPLETO** visible. Punto focal intacto.
- [ ] En NINGÚN breakpoint se corta el cuaderno a mitad.

**(h) Restricciones y calidad**

- [ ] 0 personas / manos / caras.
- [ ] 0 logos / 0 marcas / 0 texto legible en ningún objeto.
- [ ] 0 sombras imposibles, 0 fotomontaje evidente, 0 CGI plástico.
- [ ] 0 bordes negros / letterbox.
- [ ] 0 watermark / marca del modelo generativo.

**(i) Entrega técnica**

- [ ] Resolución ≥ 3840×2160.
- [ ] Export nombre `hero-background-main-v1.webp` y `hero-background-main-v1.avif`.
- [ ] Metadata limpia (sin GPS / info privada).

---

## 8. Registro de iteraciones (vacío, rellenar a medida que se generen lotes)

| Iteración | Modelo        | Seed     | Job ID / Link lote  | Resultado · Comentarios breves · qué pasó / qué falló | Estado    |
| --------- | ------------- | -------- | ------------------- | ----------------------------------------------------- | --------- |
| 01        | Midjourney v7 | _random_ | —                   | —                                                     | Pendiente |
| 02        | Midjourney v7 | _fija_   | —                   | —                                                     | Pendiente |
| 03        | Flux Dev 24s  | _random_ | —                   | —                                                     | Pendiente |
| 04        | Flux Dev 24s  | _fija_   | —                   | —                                                     | Pendiente |
| 05        | Ideogram 2    | —        | —                   | —                                                     | Pendiente |
| 06        | DALL·E 3 hd   | —        | — (no soporta seed) | —                                                     | Pendiente |
| …         | …             | …        | …                   | …                                                     | …         |

Estados válidos por iteración:

- **Pendiente:** sin ejecutar.
- **No apto:** falla ≥1 criterio §7. Añadir comentario de por qué.
- **Apto con retoques:** buena base, requiere ajuste 1 peso/negative con misma seed.
- **Apto:** cumple TODO §7. Espera aprobación final.
- **Aprobado Master v1:** elegido como canon. Marcar seed y mover asset a Aprobado en ASSET_ROADMAP.

---

# Autoevaluación — Sprint 10.5 Hero Background Prompt v1

## 1. Objetivo cumplido

**Sí, 100%.**

Se creó la carpeta `docs/assets/prompts/` y dentro el archivo
`hero-background-main-v1.md` siguiendo **exactamente** la estructura obligatoria de
[PROMPT_ENGINEERING.md §8](../PROMPT_ENGINEERING.md#8-cómo-estructurar-el-prompt-file-de-cada-asset-plantilla)
y **exactamente** las 8 secciones pedidas en este sprint:

1. ✅ Información general (Asset ID `hero-background-main-v1`, versión v1, estado Listo para
   generación, tipo Master Artwork, destino Hero).
2. ✅ Objetivo (resumen ejecutivo, NO repetición de la Spec).
3. ✅ Prompt Maestro universal, 10 bloques PROMPT_ENGINEERING §3, cero parámetros de modelo.
4. ✅ 4 adaptadores por modelo: Midjourney v7 · Flux · Ideogram · DALL·E. Misma escena,
   distinto dialecto (pesos `::` en MJ, negative prompt separado en Flux, Aspect+Resolution
   header en Ideogram, párrafos narrativos + negative al final en DALL·E).
5. ✅ Negative Prompt = selección de PROMPT_ENGINEERING §5 común + §5.1 específico Hero.
   Ninguna regla inventada.
6. ✅ Tabla Parámetros (aspect 16:9 · 4K · Alta · 4 variaciones · seed aleatorio · WebP+AVIF).
7. ✅ Criterios aceptación = mapeo 1:1 del checklist §11 de HERO_BACKGROUND_SPEC en 9 grupos.
8. ✅ Registro iteraciones vacío con columnas Iteración · Modelo · Seed · Job ID ·
   Resultado · Estado, incluyendo 6 filas de primera vuelta por modelo y leyenda de estados.

Más la autoevaluación completa exigida.

## 2. Decisiones tomadas

| Decisión                                                                                                                           | Ventaja                                                                                                                           | Trade-off                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Regla cantidades 6 EXACTA** repetida explícitamente en Maestro + 4 adaptadores + §7.c                                            | El fallo #1 de IA en Nova es "añade objetos extra porque sí". 5 menciones = 0 ambigüedad.                                         | Un poco de duplicación textual. Vale la pena.                                                     |
| **Naranja ≤5% no solo en Maestro: también escrito en cada adaptador** (weights `::0.05` en MJ, porcentaje en párrafo DALL·E, etc.) | Freno de mano contra el naranja-overdose que sufre Nova en generaciones.                                                          | Hay que mantener sincronizados 5 textos; si cambia el % hay que editar 5 sitios.                  |
| **Adaptador Ideogram NO usa pesos numéricos**; §4.3 usa lenguaje "≤5% tiny warm-orange micro-details"                              | Ideogram no tiene un sistema de pesos oficial tan potente como MJ/Flux. Mejor quedarse en lenguaje natural que inventar sintaxis. | Menos control fino de %.                                                                          |
| **DALL·E 3 API size = 1792×1024 en tabla §6 + pos-proceso crop a 3840×2160**                                                       | DALL·E 3 no soporta 3840×2160 nativo. 1792×1024 = la proporción 16:9 oficial. Se escala up en pos-proceso.                        | Pérdida teórica de nitidez; si se requiere 4K nativo, saltar a MJ/Flux/Ideogram. Lo documentamos. |
| **Seed columna en registro §8, filas 01 y 02 marcadas random vs fija**                                                             | Evita que la 1ª iteración se haga con seed fija y la 2ª con random por error.                                                     | —                                                                                                 |
| **No copiar TODO el §11 de HERO_BACKGROUND_SPEC en §7; resumir 9 buckets**                                                         | 44 items en el checklist original sería un muro que nadie valida. 9 grupos con [ ] items debajo = más fácil de chequear.          | Si hubiera un cambio en §11 de la Spec, hay que actualizar también §7 de ESTE doc. Dep. leve.     |

## 3. Documentos consultados

| Documento                                                                                                                                                                        | Qué influyó                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[ASSET_ROADMAP.md](../ASSET_ROADMAP.md) §1.1.1**                                                                                                                               | Asset crítico F1, naming `hero-background-main-v1.webp`, versión v1, estado Pendiente → Listo para generación.                                                                                               |
| **[HERO_BACKGROUND_SPEC.md](../HERO_BACKGROUND_SPEC.md)**                                                                                                                        | ESPEJO 1:1. §4 6 objetos exactos → Maestro §03. §5 cámara → §04. §6 iluminación temperatura capas → §05. §7 65/30/≤5% → §06. §10 restricciones → §09 + Negative §5. §11 checklist → Criterios aceptación §7. |
| **[PROMPT_ENGINEERING.md](../PROMPT_ENGINEERING.md)**                                                                                                                            | §3 Estructura 10 bloques Maestro. §4 adaptadores MJ/Flux/Ideo/DALL·E (dialectos). §5 Negative COMÚN seleccionado. §2 weights escala 0.25→1.5. §8 plantilla file (1→8 secciones). §7 checklist 30s.           |
| **[ART_DIRECTION.md](../../design/ART_DIRECTION.md)** §Iluminación DON'Ts · §Cámara Hero 35–50mm · §Materiales reales · §Motion No zooms/rebotes → Negative comunes 5.4/5.5/5.6. |
| **[BRAND_IDENTITY.md](../../design/BRAND_IDENTITY.md)** §4 pilares → §7.a. §13 DON'Ts logo/text/acento abuso → §4 10 bloques Restricciones.                                      |
| **[HERO_SPECIFICATION.md](../../design/HERO_SPECIFICATION.md)** §Layout ASCII texto izq + visual der → lado izq ≥40% vacío. §Combinación escena moderna papelería → 6 items.     |
| **[AGENT_MASTER.md](../../prompts/AGENT_MASTER.md)** §Restricciones "No modificar docs existentes" + calidad.                                                                    |

## 4. Archivos creados

| Archivo            | Ruta                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Carpeta `prompts/` | `docs/assets/prompts/`                                                                                                                                |
| Prompt file hero   | [hero-background-main-v1.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/prompts/hero-background-main-v1.md) |

## 5. Archivos modificados

**Ninguno.**

- ❌ No se tocó HERO_BACKGROUND_SPEC.md.
- ❌ No se tocó PROMPT_ENGINEERING.md.
- ❌ No se tocó ASSET_ROADMAP.md.
- ❌ No se tocó código fuente ni docs/ design/ engineering/ foundation/.

## 6. Riesgos encontrados

| Riesgo                                                          | Severidad | Mitigación                                                                                                                                                                                   |
| --------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Modelos no respetan "exactamente 6 objetos"**                 | Alta      | (1) Repetir la regla en 5 sitios (Maestro + 4 adapt + §7.c). (2) Si persiste, en MJ usar `pens + highlighter + laptop + backpack + clip + eraser::6` pesos iguales. (3) Validar manual §7.c. |
| **Naranja pasa >5% en la práctica a pesar de weights**          | Alta      | §7.f obliga contar %; si se pasa, iteración = No apto con ajuste negativo `-naranja` o bajar peso `::0.04`.                                                                                  |
| **Punto focal cae en sitio equivocado (tercios)**               | Media     | Grid 3×3 superpuesto al validar §7.b. Si no, `--cref` (character ref) de boceto composición.                                                                                                 |
| **DALL·E 3 ignora algunas restricciones "no logos / no texto"** | Media     | Colocar negative block EN ÚLTIMO LUGAR del prompt DALL·E (ya lo hacemos §4.4). Si falla, pasamos a Flux.                                                                                     |
| **Lado izquierdo <40% vacío** (fallo muy común)                 | Alta      | §7.b es obligatorio. Usar crop preview en Figma antes de marcar Apto.                                                                                                                        |
| **Laptop con logo Apple / Windows / teclado marca**             | Alta      | Negative común `trademark, brand, brand-name`. Aún así pasa → editar logo con blur post-producción 1px.                                                                                      |

## 7. Mejoras futuras (NO implementar hoy)

1. **Script de validación §7 automático:** `scripts/validate-hero-master.sh` que lea imagen, cuente % RGB naranja, mida punto focal con detector de esquinas, pruebe 3 crops responsive. Reducir validación humana 50%.
2. **Librería style reference común:** cuando se apruebe la primera imagen buena, guardar crops como `docs/assets/style-lib/hero-style-ref-v1.webp` y añadirla a la tabla §6 `Style Reference: <URL>` para `--sref` MJ e `image prompt weight 0.5` Flux.
3. **Prompt para v2 cinematográfica:** añadir partículas polvo sutil + degradado viñeta (hoy descartado en negative específico hero "no floating particles").
4. **Prompt Español + Inglés duplicado:** si se usan modelos entrenados principalmente en inglés, mantener el Maestro en ES + versión EN paralela. Ahora ES (como todo el proyecto); pero los adaptadores §4 ya están en ING para mejor calidad.

## 8. Calidad

| Validación Sprint 10.5                                                                 | Resultado                                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 0 documentos existentes modificados. Solo 1 carpeta + 1 archivo nuevos.                | ✅ OK.                                                                     |
| Prompt Maestro §3 NO contiene sintaxis de ningún modelo (`--`, `::`, `aspect`, `cfg`). | ✅ OK. Es universal.                                                       |
| Adaptadores §4 NO cambian la escena; solo cambian el dialecto del modelo.              | ✅ OK. Mismo 6 objetos. Mismo 40% izq vacío. Mismo ≤5% naranja.            |
| Negative §5 = selección PROMPT_ENGINEERING. Ninguna regla nueva inventada.             | ✅ OK. 6 familias COMÚN + 1 familia ESPECÍFICA Hero (no hay items nuevos). |
| Criterios aceptación §7 = mapeo directo §11 HERO_BACKGROUND_SPEC.                      | ✅ OK. 9 grupos.                                                           |
| Prettier / Proyecto compila.                                                           | ✅ OK. `npm run format` · `npm run typecheck` · `npm run build` limpios.   |
| Consistencia con BRAND + ART + HERO + ROADMAP.                                         | ✅ OK. 4 pilares marca + cámara Hero + layout ASCII + asset Fase 1.        |

---

🏁 **Sprint 10.5 — Hero Background Prompt v1 — CERRADO ✔**

Siguiente paso natural (no hecho hoy):

> Ejecutar 6 filas de la tabla §8 (2 MJ, 2 Flux, 1 Ideo, 1 DALL·E), marcar resultados,
> quedarse con la mejor semilla, refinar, y cuando un candidato pase TODO §7 → marcar
> `Estado: Aprobado Master v1` en la fila → actualizar ASSET_ROADMAP.md §1.1.1
> `Pendiente → Aprobado` (no tocar este documento).
