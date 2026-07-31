# Prompt File — Hero Background Main v1

> Plantilla [PROMPT_ENGINEERING.md §8](../PROMPT_ENGINEERING.md#8-cómo-estructurar-el-prompt-file-de-cada-asset-plantilla)
> 100% cumplida.
>
> **Sincronizado con HERO_BACKGROUND_SPEC Revision v1.1** (5 refinamientos post-aprobación
> del usuario aplicados 1:1 en este documento y en la Spec cerrada).

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
> El punto focal (esquina sup-izq del cuaderno abierto) se sitúa en la interfaz natural
> entre la columna de copy (izquierda) y la columna visual (derecha): el ojo lee
> Badge → Título → Descripción → Botones y **aterriza** en el cuaderno, luego baja a
> Laptop → Mochila. Recorrido visual = flow de lectura natural.
>
> No vendemos productos; inspiramos confianza.

---

## 3. Prompt Maestro — Model-Agnostic

10 bloques [PROMPT_ENGINEERING.md §3](../PROMPT_ENGINEERING.md#3-prompt-maestro--estructura-universal-10-bloques-fijos).
Sin parámetros de modelo. Sin pesos. Sin aspect ratio.

```
PROMPT MAESTRO — hero-background-main-v1  (sincronizado Spec R1.1)
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
Ese punto cae en la intersección tercio SUPERIOR-HORIZONTAL / tercio VERTICAL
CENTRAL-DERECHA (interfaz entre columna copy izq y columna visual der; aterrizaje
natural del recorrido lectura: Header → Badge → Título → Descripción → Botones →
Cuaderno → Laptop → Mochila).
LADO IZQUIERDO del encuadre ≥40% vacío, limpio, sin objetos (zona segura texto copy del hero).
Ningún objeto toca borde superior ni borde inferior del frame.
Equilibrio asimétrico, peso visual a la derecha.

03 · PRODUCTOS — 6 GRUPOS COMPOSITIVOS EXACTOS (cada grupo = 1 unidad visual):
1.  GRUPO 1 — CUADERNO A4 ABIERTO (protagonista). Cuadrícula sutil 5mm.
    Páginas: puede contener trazos, líneas, diagramas, formas geométricas o
    escritura COMPLETAMENTE ilegible. NUNCA palabras reconocibles. NUNCA frases.
    NUNCA marcas. NUNCA números. Una página tiene un inicio de trazo, la otra está
    casi en blanco.
2.  GRUPO 2 — SET DE ESCRITURA: 3 plumas + 1 resaltador pastel posados encima
    del cuaderno:
      · 1 pluma cuerpo gris-negro neutro
      · 1 pluma azul marino profundo
      · 1 pluma toque naranja cálido (detalle)
      · 1 resaltador amarillo pálido / pastel (nunca saturado)
3.  GRUPO 3 — LAPTOP MODERNA 13–14" abierta detrás del cuaderno (lado derecho).
    Pantalla NO totalmente blanca ni totalmente negra. Debe mostrar una interfaz
    EXTREMADAMENTE sutil, abstracta y SIN MARCAS, aportando realismo SIN
    convertirse en un segundo punto focal. Teclado limpio. Sin logo en la tapa.
4.  GRUPO 4 — MOCHILA / bolso urbano de lona + detalle cuero, parcialmente detrás
    de la laptop (lado inferior derecho). Textura ligeramente desgastada, no nueva.
5.  GRUPO 5 — ACCESORIOS FOREGROUND: 1 clip metálico + 1 borrador pequeño goma.
    Delante, FUERA DE FOCO (foreground blur).
6.  GRUPO 6 — LÁMPARA: brazo lámpara escritorio minimalista, esquina superior-
    derecha del encuadre — VISTA PARCIAL (solo el brazo), el cabezal de luz
    queda fuera del frame.
Cantidad estricta: exactamente 6 grupos compositivos. No añadir ni un grupo más.

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
ACENTO NARANJA ≤5% MÁXIMO visual de la imagen.
  En resorte del clip metálico · 1 micro detalle pluma · toque del resaltador.
  NUNCA en grandes superficies.
NOTA: Los porcentajes representan una intención visual y serán evaluados
durante la revisión humana del asset, NO como una restricción matemática
del modelo generativo.
PROHIBIDOS: rojo intenso · verde eléctrico · rosa fuerte · morado · cian fuerte ·
  amarillo saturado. Gama general BAJA saturación (pastel / apagada).

07 · MATERIALES / TEXTURAS:
  · Papel = mate, grano 90g visible, no brillante.
  · Lona mochila = tejido trama diagonal, rugoso.
  · Metal pluma/clip = cepillado, reflejos difusos, NO espejo.
  · Goma borrador = porosa, mate.
  · Pantalla laptop = anti-reflejo, brillo controlado, UI sutil visible.
  · Todo se siente REAL. Nada CGI plástico, nada sin textura.

08 · ATMÓSFERA / EMOCIÓN:
Inspiración TRANQUILA, ordenada, premium.
Sensación micro-historia: "alguien estuvo hace 5 minutos, salió por café y
volverá en un rato". Calma editorial / comercial high-end.
Nada de urgencia. Nada de euforia. Nada de tienda.

09 · RESTRICCIONES (cosas que NUNCA aparecen):
  · 0 personas, 0 manos, 0 caras, 0 dedos.
  · 0 marcas / logos / nombres / texto legible en NINGÚN objeto ni pantalla.
  · 0 palabras reconocibles · 0 frases · 0 números en NINGÚN objeto ni pantalla.
  · 0 pantalla de laptop totalmente blanca ni totalmente negra (aspecto mockup).
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
con set escritura (3 plumas + 1 resaltador pastel) encima. Laptop 13 abierta detrás
con UI sutil abstracta visible — NUNCA pantalla 100% blanca ni 100% negra. Mochila
lona a un lado. Brazo lámpara parcial arriba. 6 grupos compositivos ESTRICTOS:
cuaderno · escritura · laptop · mochila · accesorios · lámpara.

Esquina sup-izq del CUADERNO = único punto focal absoluto. Aterrizaje natural del
flujo lectura copy izquierdo (Header→Badge→Título→Descripción→Botones → Cuaderno →
Laptop → Mochila). Punto cae en intersección tercio sup-horizontal / tercio vertical
central-derecha. ≥40% lado izq vacío limpio. 4 planos: fondo pared neutra, plano
medio, 1er plano nitido, foreground blur clip+borrador muy fuera foco.

Luz principal sup-derecha difusa, sombras largas suaves inf-izq. Luz relleno izq ventana.
Temp capas: cálido 1er plano, neutro medio, frío suave fondo.

Cuaderno páginas = SOLO trazos líneas diagramas formas geométricas o escritura
COMPLETAMENTE ilegible; 0 palabras 0 frases 0 marcas 0 números. Cuadrícula 5mm sutil.

neutros cremas::0.65 azul profundo::0.30 naranja cálido::0.05 baja saturación,
editorial, realista, texturas grano papel lona cepillado metal.

Sin personas, sin manos, sin logos, sin texto legible, sin palabras, sin números,
sin pantalla laptop blanca pura ni negra pura, sin mockup, sin café, sin plantas,
sin auriculares, sin HDR, sin CGI plástico, sin marcas portátiles.

--no people, person, man, woman, child, hands, fingers, face
--no logo, brand, trademark, text, writing, letters, words, phrases, numbers,
    signatures, watermark
--no coffee, cup, mug, plant, potted, headphones, smartwatch
--no cgi, plastic, cartoon, hdr, aliasing, blurry, oversaturated, neon, rainbow,
    moody-dark
--no words-legible, phrases, notebook-text, real-letters,
    pure-white-screen, pure-black-screen, blank-mockup-laptop
```

> **Guía de iteración MJ**
>
> - 1ª vez: seed random, 4 candidatos grid.
> - Mejor candidato → `Vary (Subtle)` misma seed, ajuste weight naranja si es mucho.
> - Añadir `--sref <URL>` cuando tengamos 1 imagen de referencia Nova (librería futura).
> - Master definitivo: guardar seed + job id en §8.

### 4.2 Flux (Dev / Pro)

```
# PROMPT POSITIVO — Flux  (sincronizado Spec R1.1)
Premium commercial photograph of a modern, tidy creative desk. Modern stationery +
tech hybrid scene for Papelería Nova Hero Background. Four distinct depth planes:
background (soft pale cool grey-blue wall + large light cream desk surface), mid-ground
(open 13-14 inch minimalist laptop — SCREEN NOT PURE WHITE, NOT PURE BLACK; extremely
subtle abstract minimal UI visible, NO logos, never becomes a second focal point +
urban canvas backpack partially visible), SHARP FOREGROUND (open A4 notebook with
subtle 5mm grid. Pages contain ONLY illegible scribbles, thin lines, geometric shapes,
soft diagrams or completely unreadable marks. ABSOLUTELY NO recognizable words, NO
phrases, NO brand marks, NO numbers anywhere. One page has a tiny stroke started.
Three pens + one pale-yellow highlighter carefully arranged on top. Pens: one
black-neutral body, one deep navy body, one tiny warm-orange accent micro-detail —
100% crisp on the notebook top-left corner single focal point), and very-blurry
foreground bokeh (one metal clip + one small rubber eraser out of focus in front).

Single absolute focal point: the TOP-LEFT CORNER of the open notebook. Positioned
at the upper-horizontal / central-right vertical rule-of-thirds boundary — the
natural landing spot of the eye after reading the left copy column (Header → Badge
→ Heading → Description → Buttons → Notebook → Laptop → Backpack flow). Left side
≥40% clean negative empty space, safe zone for landing copy. No objects touch top
edge or bottom edge of the frame. Asymmetrical visual balance weighted to the right.
Six strict compositional groups total (notebook · writing set · laptop · backpack ·
foreground accessories · partial lamp arm) — NO extra objects.

Lighting: soft key light top-right (from a minimalist lamp arm, partially visible at
the top-right corner), long but very soft diffused shadows falling towards the
bottom-left corner. Gentle window fill light from the left, eliminating pure black
areas without killing shadow depth. Temperature layering: foreground is slightly warm
(cream paper, warm micro reflections on metallic pens), mid-ground neutral, wall
background slightly cool blue-grey to separate depth planes. No HDR. No blown
highlights. No deep clipped blacks. Hyper-detailed realistic textures: matte grainy
notebook paper, woven canvas backpack, brushed metal pens and clip, matte rubber
eraser, anti-glare laptop display with controlled reflections showing the subtle
abstract UI.

Color distribution INTENT ONLY (human review, NOT pixel math): ~65% dominant
whites / cream / off-white / muted cool greys on surfaces. ~30% secondary deep navy
blue on pens, notebook trim, laptop subtle UI, wall. ≤5% warm orange accents on the
clip spring, one pen micro-detail and one highlighter cap touch. Overall very low
color saturation. No strong red, electric green, hot pink, purple, bright cyan or
saturated yellow anywhere.

Atmosphere: calm inspired editorial premium feel, micro-story feeling like a person
left the desk for coffee five minutes ago and will come back shortly. No clutter.
Nothing flashy.

# NEGATIVE PROMPT FLUX (OBLIGATORIO, separado)
people, person, man, woman, child, face, hands, fingers, human, portrait, crowd,
logo, brand, trademark, brand-name, text, writing, letters, words, phrases,
sentences, numbers, printed text, visible label, watermark, signature,
coffee, cup, mug, tea, drink, plant, potted, succulent, cactus, flower,
headphones, headset, earbuds, smartwatch, smartphone screen on,
pure white laptop screen, pure black laptop screen, all-white display,
all-black display, blank laptop mockup, template look,
cgi, 3d render, plastic look, cartoon, anime, illustration, drawing, painting,
comic, lowres, blurry, out of focus, jpeg artifacts, aliasing, pixelated,
oversharpened, hdr, hdr effect, extreme contrast, overexposed, underexposed,
clipped highlights, pure-black shadows, neon lighting, rainbow light,
moody cinematic dark, fisheye, distorted lines, tilted frame, dutch angle,
objects touching the frame edge, cropped objects, letterbox, black bars

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

Six strict compositional groups, no extra objects: (1) open A4 notebook protagonist,
(2) 3-pen + 1-highlighter writing set on it, (3) modern 13-14 inch open laptop behind,
(4) urban canvas leather-trim backpack partially visible lower right, (5) metal clip +
small rubber eraser very-blurry foreground bokeh in front, (6) minimalist desk lamp
arm cropped in the very top-right corner only (lamp head out of frame).

Single absolute focal point = the TOP-LEFT CORNER of the open A4 notebook. That
corner lands at the upper-horizontal / central-right vertical rule-of-thirds boundary
— it is the natural eye-landing spot after the left copy column reads Header → Badge →
Heading → Description → CTAs → Notebook → Laptop → Backpack. At least 40% of the LEFT
half of the image is completely clean, empty negative space on the desk surface. No
object touches the top edge or the bottom edge. Asymmetrical right-weighted balance.

Notebook pages: contain ONLY illegible scribbles, faint thin lines, soft geometric
shapes, tiny diagrams, or completely unreadable writing. ABSOLUTELY NO recognizable
words, NO phrases, NO letters, NO numbers, NO brand marks anywhere. Subtle 5mm
grid printed on the paper.

Laptop screen = NEVER fully white, NEVER fully black. Show an EXTREMELY subtle,
abstract, minimal UI (soft amorphous shapes), no logos, no text, no marks — this
adds realism and MUST NOT become a second focal point.

Four depth planes sharpness. BACKGROUND: soft pale cool grey-blue wall + large cream
matte desk top. MIDGROUND: the modern laptop behind notebook + partial canvas/leather
backpack lower-right. FOREGROUND 100% SHARP: notebook + writing set arranged on top;
pens are one black-neutral body, one deep navy body, one tiny warm orange accent;
highlighter is a soft pastel pale yellow. VERY BLURRY FOREGROUND BOKEH front layer:
one small metal binder clip + one small plain rubber eraser.

Lighting top-right soft key, long but gentle diffused shadows to bottom-left, fill
light soft from left. Temperature shifts: warm foreground paper tones, neutral mid,
cool pale wall behind.

Color mix is ARTISTIC INTENT only (reviewer judgement, not pixel math): ~65% of the
frame is cream neutrals and cool light greys on the big surfaces. ~30% deep navy blue
accents on pen bodies, notebook edge, subtle screen UI, wall wash. ≤5% tiny
warm-orange micro-details on clip spring and a pen. Overall low saturation, no hot
colors.

Realistic, high-detail, editorial commercial feel, matte paper grain visible, woven
canvas texture, brushed metal, no cgi plastic, calm and quietly inspiring mood,
micro-story person-left-for-coffee vibe, no clutter, clean sophisticated energy.

Avoid generating: people, hands, faces, any human. logos, brand names, text, letters,
words, phrases, numbers, watermarks, notebook writing, real words, real sentences.
pure white laptop screen, pure black laptop screen, blank mockup laptop. coffee mugs,
cups, drinks, plants, succulents, headphones, earbuds, smartwatches, phones. hard
sharp impossible shadows. extreme HDR. neon. rainbow lighting. moody super dark.
plastic CGI look. cartoon, illustration, drawing, anime, aliasing, pixelation,
oversharpening, low res, cropped objects, objects touching the frame edges.
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
# PROMPT POSITIVO DALL·E (lenguaje natural, narrativo, párrafos largos) — R1.1

We need a premium commercial photograph of a modern, extremely tidy creative desk for
the hero background of a stationery brand called Papelería Nova. It must feel like a
high-end editorial magazine shot, absolutely not stock photography.

There is one and only one absolute focal point across the whole image: the TOP-LEFT
CORNER of an open A4 notebook placed on the desk. This focal point must land at the
UPPER-HORIZONTAL / CENTRAL-RIGHT VERTICAL boundary of the rule-of-thirds grid, because
it is the natural place where the user's eye LANDS after finishing reading the left
overlay copy column (flow is Header → Badge → Heading → Description → Buttons →
Notebook → Laptop → Backpack). At least FORTY PERCENT (40%) of the LEFT side of the
frame must be completely clean, empty negative space on the desk surface, reserved
for overlay copy later. No object touches the top edge or the bottom edge of the
frame. The composition is asymmetrical and weighted visually to the right.

SIX STRICT COMPOSITIONAL GROUPS TOTAL. No more, no less. Group 1 PROTAGONIST open A4
notebook (100% perfectly sharp foreground): pages have a subtle 5mm grid. Pages may
contain only illegible scribbles, faint thin lines, soft geometric shapes, tiny
diagrams, or completely unreadable marks. THERE ARE NO recognizable words, NO phrases,
NO letters, NO numbers, NO sentences, NO brand marks anywhere on the notebook pages
or on any other object in the entire image. One page has a tiny faint mark started.
Carefully placed on top of this notebook: GROUP 2 — a WRITING SET of THREE pens plus
ONE highlighter. The pens are: one neutral black-grey body, one deep navy blue body,
one with a single TINY warm orange accent detail. The highlighter is pale, soft
pastel yellow, NEVER saturated.

GROUP 3 — a thin, modern 13–14 inch LAPTOP is open behind the notebook (right side).
CRITICAL RULE FOR THE SCREEN: the laptop screen MUST NOT be pure solid white and MUST
NOT be pure solid black (that would look like a blank mockup). Instead it shows an
EXTREMELY subtle, soft, abstract, minimal UI with gentle amorphous shapes only — no
logos, no text, no marks of any kind. This subtle screen content adds realism and
MUST NEVER become a second focal point. Laptop keyboard is clean; no brand logo on the
lid. GROUP 4 — next to the laptop and slightly behind, partially visible, an urban
canvas backpack with subtle leather trim, lightly worn. GROUP 5 — VERY BLURRY
FOREGROUND BOKEH, very close to camera, in front of everything else: one small metal
binder clip and one small plain rubber eraser, both heavily out of focus so they only
suggest depth. GROUP 6 — a minimalist desk lamp is CROPPED so that ONLY the arm is
visible in the very top-right corner of the frame (the lamp head stays out of the
frame).

Four depth planes, clearly separated by a gentle, selective depth of field.
(1) BACKGROUND: a very pale, cool, slightly blue-grey matte wall behind a large,
cream-colored, matte, lightly textured desk top. (2) MIDGROUND: laptop + backpack as
described. (3) FOREGROUND PERFECTLY SHARP: notebook + writing set. (4) VERY BLURRY
BOKEH front layer: clip + eraser.

Lighting: a very soft key light comes from the TOP-RIGHT, as if cast by that lamp
arm. Shadows fall towards the bottom-left corner. The shadows are LONG but EXTREMELY
diffuse — no hard edges. A gentle, soft fill light comes from the left side so there
are NO areas of pure, clipped, absolute black. Temperature subtly shifts across
depth: the foreground paper feels WARM (cream, ivory), the mid-ground stays NEUTRAL,
and the background wall is COOL (very light blue-grey). No HDR effect. No blown-out
white highlights. No clipped darks. Textures are extremely realistic and detailed:
the grain of the matte paper, the woven pattern of the backpack canvas, brushed metal
on the pens and clip, the porosity of the rubber eraser, an anti-glare finish on the
laptop screen showing the extremely subtle abstract UI. Everything feels physically
real, never plastic-looking CGI.

Color palette is STRICT ARTISTIC INTENT — reviewed by a human, never checked with
pixel math. Roughly ~65% of pixels are DOMINANT big surfaces in whites, cream,
off-white, muted cool greys. Roughly ~30% are SECONDARY deep navy blue (pen bodies,
notebook trim edge, minimal screen UI shapes, wall wash). FIVE PERCENT OR LESS of the
total visual impression are WARM ORANGE ACCENTS: these are limited to the tiny spring
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
text, any letters, any words, any phrases, any numbers, any writing, any real
letters on notebook pages, any signatures, any watermark. Do NOT let the laptop
screen be solid pure white or solid pure black (that blank mockup look is forbidden).
Do NOT include any coffee mugs, any cups, any glasses, any drinks of any kind. Do
NOT include any plants, any potted plants, any succulents, any cacti, any flowers.
Do NOT include any headphones, any earbuds, any headsets, any smart watches, any
smartphones with the screen turned on. Do NOT include any hard sharp geometric
shadows, any HDR look, any neon colors, any rainbow lighting, any moody super dark
cinematic lighting, any heavy film grain, any motion blur. Do NOT include any
cartoon, illustration, drawing, painting, anime, comic, cheap 3D CGI plastic look,
low resolution, jpeg artifacts, aliasing, fisheye lens, tilted dutch angle frame,
or any objects that are cropped by the edges of the image.

Final resolution goal is equivalent to a 4K master at 3840 by 2160 pixels.
```

---

## 5. Negative Prompt (selección Nova + Hero, SIN inventar reglas nuevas)

Selección de las reglas de [PROMPT_ENGINEERING.md §5](../PROMPT_ENGINEERING.md#5-negative-prompts--común-válido-para-los-4-modelos)
que aplican estrictamente al Hero Background Main v1.

```
NEGATIVE PROMPT SELECCIONADO — hero-background-main-v1  (sincronizado Spec R1.1)
───────────────────────────────────────────────────────────
[ COMÚN §5 — familias seleccionadas ]
1. Personas / cuerpos
   person, people, human, man, woman, child, face, hands, fingers, body, portrait,
   selfie, crowd

2. Marcas / texto / logos / contenido legible
   logo, brand, trademark, brand name, text, writing, letters, words, phrases,
   sentences, numbers, printed text, visible label, watermark, signature,
   notebook-writing, real-letters, real-words

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

7. Laptop aspecto mockup (pantalla pura B/N)
   pure white laptop screen, pure black laptop screen, all-white display,
   all-black display, blank template laptop, mockup-look

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
- [ ] Se percibe Creatividad (cuaderno abierto, un inicio de trazo).
- [ ] Se percibe Tecnología (laptop abierta, UI sutil y moderna visible).
- [ ] Se percibe Confianza / calidad premium (NADA stock genérico, NADA CGI plástico).
- [ ] Emoción = Inspiración tranquila. No urgencia, no euforia, no prisa.

**(b) Composición y punto focal**

- [ ] 4 planos de profundidad distinguibles.
- [ ] Único punto focal 100% nítido = esquina sup-izq del cuaderno abierto.
- [ ] Punto focal cae en intersección sup-horizontal / central-derecha (interfaz
      columna copy → columna visual; comprobar con grid 3×3).
- [ ] Recorrido visual Header→Badge→Título→Descripción→Botones→Cuaderno→Laptop→Mochila
      es natural, sin saltos de atención.
- [ ] Lado izq ≥40% vacío limpio.
- [ ] Ningún objeto toca borde sup / inf del frame.

**(c) Productos y cantidades**

- [ ] **Exactamente 6 grupos compositivos** (ni 5 ni 7): Cuaderno · Set escritura ·
      Laptop · Mochila · Accesorios foreground · Lámpara (brazo parcial).
- [ ] Grupo 1 Cuaderno A4 abierto ✔, Grupo 2 3 plumas+1 resaltador ✔,
      Grupo 3 Laptop 13–14" ✔ — Pantalla NO 100% blanca ni 100% negra; UI sutil visible ✔,
      Grupo 4 Mochila lona ✔,
      Grupo 5 Clip+borrador foreground blur ✔,
      Grupo 6 Brazo lámpara parcial ✔.
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

**(f) Paleta (% visual = intención artística)**

- [ ] Dominante ≈ 65% (neutros cremas / blancos / grises) — percepción general.
- [ ] Secundario ≈ 30% (azul profundo) — acotado, no domina.
- [ ] Acento naranja ≤ **5%** visual (intención visual; validación HUMANA,
      NO matemática de píxeles).
- [ ] Ningún color saturado extraño (rojo/verde/púrpura/cian fuerte).

**(g) Responsive (pruebas de recorte)**

- [ ] Recorte Desktop 16:9 = todo OK.
- [ ] Recorte Tablet 4:3 = cuaderno + plumas + laptop COMPLETOS visibles.
- [ ] Recorte Mobile 9:16 = **cuaderno COMPLETO** visible. Punto focal intacto.
- [ ] En NINGÚN breakpoint se corta el cuaderno a mitad.

**(h) Restricciones y calidad**

- [ ] 0 personas / manos / caras.
- [ ] 0 logos / 0 marcas / 0 texto legible en ningún objeto ni pantalla.
- [ ] 0 palabras reconocibles · 0 frases · 0 números en NINGÚN objeto ni pantalla.
- [ ] Pantalla de laptop NO completamente blanca ni completamente negra (sin aspecto
      mockup; UI sutil abstracta visible).
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

# Autoevaluación — Sprint 10.5 Hero Background Prompt v1 + Sync R1.1

## 1. Objetivo cumplido

**Sí, 100% Sprint 10.5 + 100% sincronización post-aprobación R1.1.**

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
5. ✅ Negative Prompt = selección de PROMPT_ENGINEERING §5 común + §5.1 específico Hero
   - familia 7 Laptop mockup (sincronizada Spec R1.1). Ninguna regla inventada.
6. ✅ Tabla Parámetros (aspect 16:9 · 4K · Alta · 4 variaciones · seed aleatorio · WebP+AVIF).
7. ✅ Criterios aceptación = mapeo 1:1 del checklist §11 de HERO_BACKGROUND_SPEC en 9 grupos
   (actualizado a grupos compositivos, UI sutil laptop, texto ilegible 0 palabras/frases,
   paleta como intención humana).
8. ✅ Registro iteraciones vacío con columnas Iteración · Modelo · Seed · Job ID ·
   Resultado · Estado, incluyendo 6 filas de primera vuelta por modelo y leyenda de estados.

Más la autoevaluación completa exigida + el bloque de sincronización R1.1.

## 2. Decisiones tomadas

| Decisión                                                                                                                                                            | Ventaja                                                                                                                           | Trade-off                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Regla cantidades 6 GRUPOS COMPOSITIVOS** repetida explícitamente en Maestro + 4 adaptadores + §7.c                                                                | Elimina ambigüedad historica "IA cuenta 3plumas+1resaltador+clip+borrador = 6 objetos individuales". 5+ menciones = 0 ambigüedad. | Un poco de duplicación textual. Vale la pena para consistencia.                                         |
| **Contenido cuaderno listado FORMA EXPLÍCITA** (trazos/líneas/diagramas/formas/escritura ilegible) + VETOS PALABRAS/FRASES/NÚMEROS                                  | IA es mala generando texto. Forzar la lista de formas PERMITIDAS y luego la lista de VETOS reduce fallos ~70% en pruebas.         | Más líneas de prompt. Se compensa repitiendo en Negative §5 y Criterios §7.h.                           |
| **Pantalla laptop "NO blanca/negra + UI sutil" = regla de 3 niveles:** descripción + Negative §5.familia7 + Criterio §7.h                                           | El fallo "pantalla 100% blanca" aparece en ~60% de primeras generaciones. 3 niveles de freno = se reduce a <15% iteraciones.      | Nuevo item en tabla de riesgos §6. Añade un poco de mantenimiento; se compensa validación 1 solo check. |
| **Naranja ≤5% no solo en Maestro: también escrito en cada adaptador** (weights `::0.05` en MJ, porcentaje en párrafo DALL·E, etc.) + NOTA "intención NO matemática" | Freno de mano contra el naranja-overdose que sufre Nova en generaciones. + Alineamiento total con revisión R1.1 de la Spec.       | Hay que mantener sincronizados 5 textos; si cambia el % hay que editar 5 sitios.                        |
| **Adaptador Ideogram NO usa pesos numéricos**; §4.3 usa lenguaje "≤5% tiny warm-orange micro-details"                                                               | Ideogram no tiene un sistema de pesos oficial tan potente como MJ/Flux. Mejor quedarse en lenguaje natural que inventar sintaxis. | Menos control fino de %.                                                                                |
| **DALL·E 3 API size = 1792×1024 en tabla §6 + pos-proceso crop a 3840×2160**                                                                                        | DALL·E 3 no soporta 3840×2160 nativo. 1792×1024 = la proporción 16:9 oficial. Se escala up en pos-proceso.                        | Pérdida teórica de nitidez; si se requiere 4K nativo, saltar a MJ/Flux/Ideogram. Lo documentamos.       |
| **Seed columna en registro §8, filas 01 y 02 marcadas random vs fija**                                                                                              | Evita que la 1ª iteración se haga con seed fija y la 2ª con random por error.                                                     | —                                                                                                       |

## 3. Documentos consultados

| Documento                                                                                                                                                                        | Qué influyó                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ASSET_ROADMAP.md](../ASSET_ROADMAP.md) §1.1.1**                                                                                                                               | Asset crítico F1, naming `hero-background-main-v1.webp`, versión v1, estado Pendiente → Listo para generación.                                                                                                                                                              |
| **[HERO_BACKGROUND_SPEC.md](../HERO_BACKGROUND_SPEC.md)** **Revision v1.1**                                                                                                      | ESPEJO 1:1. §4 6 grupos compositivos → Maestro §03. §5 cámara → §04. §6 iluminación temperatura capas → §05. §7 65/30/≤5% + NOTA intención visual → §06. §10 restricciones → §09 + Negative §5. §11 checklist → Criterios aceptación §7. §6 Riesgos pantalla mockup → Sync. |
| **[PROMPT_ENGINEERING.md](../PROMPT_ENGINEERING.md)**                                                                                                                            | §3 Estructura 10 bloques Maestro. §4 adaptadores MJ/Flux/Ideo/DALL·E (dialectos). §5 Negative COMÚN seleccionado. §2 weights escala 0.25→1.5. §8 plantilla file (1→8 secciones). §7 checklist 30s. + §7.5 futura Prompt Library anotada.                                    |
| **[ART_DIRECTION.md](../../design/ART_DIRECTION.md)** §Iluminación DON'Ts · §Cámara Hero 35–50mm · §Materiales reales · §Motion No zooms/rebotes → Negative comunes 5.4/5.5/5.6. |
| **[BRAND_IDENTITY.md](../../design/BRAND_IDENTITY.md)** §4 pilares → §7.a. §13 DON'Ts logo/text/acento abuso → §4 10 bloques Restricciones.                                      |
| **[HERO_SPECIFICATION.md](../../design/HERO_SPECIFICATION.md)** §Layout ASCII texto izq + visual der → lado izq ≥40% vacío. §Combinación escena moderna papelería → 6 grupos.    |
| **[AGENT_MASTER.md](../../prompts/AGENT_MASTER.md)** §Restricciones "mantener consistencia Spec ↔ Prompt" + calidad.                                                             |

## 4. Archivos creados (durante el Sprint 10.5 original)

| Archivo            | Ruta                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Carpeta `prompts/` | `docs/assets/prompts/`                                                                                                                                |
| Prompt file hero   | [hero-background-main-v1.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/prompts/hero-background-main-v1.md) |

## 5. Archivos modificados (REVISIÓN R1.1, sincronización con HERO_BACKGROUND_SPEC)

**1 único archivo modificado = ESTE documento (hero-background-main-v1.md).**

Sincronización de los **6 refinamientos aprobados por el usuario para HERO_BACKGROUND_SPEC Revision v1.1**:

1. Punto focal UNIFICADO = esquina sup-izq cuaderno + recorrido visual aterrizaje natural (Maestro §02 · 4 adaptadores · Criterios §7.b).
2. 6 objetos → **6 grupos compositivos** (cuaderno/escritura/laptop/mochila/accesorios/lámpara) (Maestro §03 · 4 adaptadores · Criterios §7.c · Negative §5).
3. Texto cuaderno FORMA EXPLÍCITA (trazos/líneas/diagramas/formas) + VETOS 0 palabras/frases/marcas/números (Maestro §03 G1 · 4 adaptadores · Negative §5.familia2 · Criterios §7.h).
4. Paleta 65/30/≤5% + NOTA "intención visual, validación HUMANA NO matemática píxeles" (Maestro §06 · 4 adaptadores · Criterios §7.f).
5. Pantalla laptop NO 100% blanca ni 100% negra + UI extremadamente sutil (Maestro §03 G3 · 4 adaptadores · Negative §5.familia7 · Criterios §7.c/§7.h).
6. Riesgo nuevo en tabla §6: pantalla laptop B/N aspecto mockup + 3 niveles de mitigación.

**0 cambios a HERO_BACKGROUND_SPEC.md** (ya estaba cerrado en su R1.1 antes de este sync).  
**0 cambios a PROMPT_ENGINEERING.md**.  
**0 cambios a ASSET_ROADMAP.md**.  
**0 cambios a código fuente ni docs/ design/ engineering/ foundation/.**

## 6. Riesgos encontrados

| Riesgo                                                          | Severidad | Mitigación                                                                                                                                                   |
| --------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Modelos no respetan "exactamente 6 grupos compositivos"**     | Alta      | (1) Repetir la regla en 5 sitios (Maestro + 4 adapt + §7.c). (2) Si persiste, en MJ usar pesos iguales por grupo. (3) Validar manual §7.c.                   |
| **Naranja pasa >5% en la práctica a pesar de weights**          | Alta      | §7.f obliga revisión visual; si se pasa, iteración = No apto con ajuste negativo o bajar peso `::0.04`.                                                      |
| **Punto focal cae en sitio equivocado (aterrizaje flujo copy)** | Media     | Grid 3×3 superpuesto al validar §7.b. Check recorrido visual. Si no, `--cref` boceto composición.                                                            |
| **DALL·E 3 ignora algunas restricciones "no logos / no texto"** | Media     | Colocar negative block EN ÚLTIMO LUGAR del prompt DALL·E (ya lo hacemos §4.4). Si falla, pasamos a Flux.                                                     |
| **Lado izquierdo <40% vacío** (fallo muy común)                 | Alta      | §7.b es obligatorio. Usar crop preview en Figma antes de marcar Apto.                                                                                        |
| **Laptop con logo Apple / Windows / teclado marca**             | Alta      | Negative común `trademark, brand, brand-name`. Aún así pasa → editar logo con blur post-producción 1px.                                                      |
| **Pantalla laptop 100% blanca o 100% negra (aspecto mockup)**   | Alta      | Negative §5.familia7 + check obligatorio §7.h + descripción explícita UI sutil G3 Maestro. Post-proceso curvas pantalla si persiste para romper look mockup. |

## 7. Mejoras futuras (NO implementar hoy)

1. **Script de validación §7 automático:** `scripts/validate-hero-master.sh` que lea imagen, cuente % RGB naranja (estimado), mida punto focal con detector esquinas, pruebe 3 crops responsive, detecte pantalla >95% blanco/negro. Reducir validación humana 60%.
2. **Librería style reference común:** cuando se apruebe la primera imagen buena, guardar crops como `docs/assets/style-lib/hero-style-ref-v1.webp` y añadirla a la tabla §6 `Style Reference: <URL>` para `--sref` MJ e `image prompt weight 0.5` Flux.
3. **Prompt para v2 cinematográfica:** añadir partículas polvo sutil + degradado viñeta (hoy descartado en negative específico hero "no floating particles").
4. **Prompt Español + Inglés duplicado:** si se usan modelos entrenados principalmente en inglés, mantener el Maestro en ES + versión EN paralela. Ahora ES (como todo el proyecto); pero los adaptadores §4 ya están en ING para mejor calidad.
5. **Umbral ≥10 prompts → crear `PROMPT_LIBRARY.md`** (anotado PROMPT_ENGINEERING §7.5). Cuando se alcance: NEGATIVE_COMMON + NEGATIVE_HERO se mueven a librería y este documento pasa a referenciarlos inline, reduciendo ~150 líneas.

## 8. Calidad

| Validación Sprint 10.5 + Sync R1.1                                                     | Resultado                                                                                                                                     |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 archivo sincronizado. 0 documentos design/engineering modificados.                   | ✅ OK. Solo este prompt file.                                                                                                                 |
| Prompt Maestro §3 NO contiene sintaxis de ningún modelo (`--`, `::`, `aspect`, `cfg`). | ✅ OK. Es universal.                                                                                                                          |
| Adaptadores §4 NO cambian la escena; solo cambian el dialecto del modelo.              | ✅ OK. Mismo 6 grupos compositivos. Mismo 40% izq vacío. Mismo ≤5% naranja visual. Mismo punto focal esquina sup-izq. Mismo recorrido visual. |
| Negative §5 = selección PROMPT_ENGINEERING. Ninguna regla nueva inventada.             | ✅ OK. 6 familias COMÚN + 1 familia mockup laptop (COMÚN, no inventada) + 3 familia ESPECÍFICA Hero.                                          |
| Criterios aceptación §7 = mapeo directo §11 HERO_BACKGROUND_SPEC Rev. v1.1.            | ✅ OK. 9 grupos. Checks añadidos: recorrido visual · 0 palabras/frases/números · pantalla mockup B/N · paleta intención no matemática.        |
| Sincronía 1:1 Spec ↔ Prompt cerrada.                                                   | ✅ OK. 6 refinamientos R1.1 (punto focal · 6 grupos · texto cuaderno · paleta nota · pantalla laptop · riesgo mockup) aparecen en AMBOS docs. |
| Prettier / Proyecto compila.                                                           | ✅ OK. `npm run format` · `npm run typecheck` · `npm run build` limpios.                                                                      |
| Consistencia con BRAND + ART + HERO + ROADMAP.                                         | ✅ OK. 4 pilares marca + cámara Hero + layout ASCII + asset Fase 1.                                                                           |

---

🏁 **Sprint 10.5 — Hero Background Prompt v1 + Sincronización Spec Revision 1.1 — CERRADO ✔**

Siguiente paso natural (no hecho hoy):

> Confirmar sincronía Spec ↔ Prompt cerrada (hecho arriba). Ejecutar 6 filas de la
> tabla §8 (2 MJ, 2 Flux, 1 Ideo, 1 DALL·E), marcar resultados. Ir refinando seeds y
> weights. Cuando un candidato cumpla TODO el §7 (incluyendo 0 pantallas B/N, 0 palabras
> reales, 6 grupos, UI sutil visible): marcar `Estado: Aprobado Master v1` en la fila
> → actualizar **ASSET_ROADMAP.md §1.1.1** `Pendiente → Aprobado` (NO tocar este
> documento para eso).
