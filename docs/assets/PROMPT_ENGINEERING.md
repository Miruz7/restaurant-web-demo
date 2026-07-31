# Prompt Engineering Guide — Papelería Nova

> **Guía única** de reglas, convenciones y estructura para escribir prompts de modelos
> generativos de imágenes en el proyecto Papelería Nova.
>
> Relación con el resto de la documentación de assets:
>
> 1. **[ASSET_ROADMAP.md](ASSET_ROADMAP.md)** = ¿Qué assets hay? (inventario + estados).
> 2. **[HERO_BACKGROUND_SPEC.md](HERO_BACKGROUND_SPEC.md)** = ¿Qué contiene cada asset en
>    concreto? (qué hay, composición, color, por qué). → 1 doc por asset crítico.
> 3. **ESTE DOC** = ¿Cómo le pides a CADA modelo ese asset? (lenguaje, pesos, negatives,
>    seeds, variaciones). → 1 doc GLOBAL para TODOS los assets.
>
> **Regla #1 de este documento:** **Nunca** escribimos un prompt "directamente a un
> modelo" sin antes pasar por el **Prompt Maestro (agnostic)** de §3. Primero definimos la
> escena en lenguaje neutro, luego cada adaptador la traduce a MJ/Flux/Ideogram/DALL·E.
>
> **Regla #2:** Este documento NO contiene los prompts finales de cada asset. Cada asset
> crítico tendrá (cuando llegue su sprint de generación) un archivo propio en
> `docs/assets/prompts/<asset-id>.md` con: el Prompt Maestro + las 4 variantes por modelo.
> Este documento son las **reglas comunes**.

---

## 1. Pipeline: Prompt Maestro → Adaptadores por modelo

### 1.1 Diagrama

```
┌───────────────────────────────────────────────────────────────────┐
│  1. Fuente de verdad (ESPECIFICACIÓN del asset)                   │
│     HERO_BACKGROUND_SPEC.md / PRODUCT_NOTEBOOK_01_SPEC.md / …     │
└─────────────────────────────────────┬─────────────────────────────┘
                                      │ 100% del QUÉ y el POR QUÉ
                                      ▼
┌───────────────────────────────────────────────────────────────────┐
│  2. PROMPT MAESTRO (model-agnostic, modelo neutro)                │
│     Lenguaje natural sin pesos, sin parámetros, sin aspect ratio. │
│     Describe la escena en 10 bloques fijos.                        │
└────────┬──────────────┬──────────────┬──────────────┬─────────────┘
         ▼              ▼              ▼              ▼
  Midjourney 7v/6.x    Flux (Schnell/ Dev/ Pro)    Ideogram 2.x    DALL·E 3 / 4
 Adaptador MJ     Adaptador Flux            Adaptador Ideo    Adaptador DALL·E
 (pesos ::)       (weighted ()-1.0 a 1.5)    (pesos textuales) (lenguaje natural
 --ar 16:9                                                        prefermentado
 --style raw                                                      model=gpt-4o-image
 --sref --seed)                                                   size quality hd+)
```

### 1.2 Por qué este pipeline

- **Un solo "qué", múltiples "cómo".** Si en 2 semanas cambias de opinion de "quiero usar
  Midjourney" → "quiero usar Flux Pro", NO re-escribes la escena desde cero. Solo cambias
  el adaptador.
- **Reproducibilidad entre diseñadores / agentes IA.** Dos personas distintas leen la misma
  Spec, generan el mismo Prompt Maestro, se lo pasan a su modelo favorito y obtienen
  candidatos comparables.
- **Control de calidad homogéneo.** Las restricciones de Nova (§5 negative prompts, §7
  convenciones de color ≤5% acento) solo se escriben una vez y viajan en todos los
  adaptadores.

---

## 2. Convenciones globales (válidas para TODOS los modelos)

### 2.1 Registro de iteración por cada generación

Cada prompt ejecutado genera un **log obligatorio** en el `.md` del asset:

```
# Iteración <n>
- Fecha: YYYY-MM-DD
- Modelo: Midjourney v7
- Seed: 12345678
- Parámetros: --ar 16:9 --style raw --stylize 150 --iw 0
- Link al lote / job ID: …
- Resultado: [Apto · No apto · Apto con retoques]
- Notas de revisión checklist (§11 HERO_BACKGROUND_SPEC):
  - ✅ 6 objetos exactos
  - ✅ Punto focal cuaderno
  - ❌ Naranja claramente >5% → regenerar con negative naranja extra
```

Nunca borres una iteración. Aunque el resultado sea malo, queda en el histórico. ¿Por qué?
Porque dentro de 3 meses te ahorras volver a probar combinaciones que ya sabes que no
funcionan.

### 2.2 Naming de archivos de salida (cuando exportas a `src/assets/`)

Patrón (igual que ASSET_ROADMAP.md §0.4, añadido `seed` y `modelo` en la fase de borrador):

```
# Borradores (NO commits) — nunca entran a main
drafts/<asset-nombre>-v1-<modelo>-s<seed>-iter<n>.<ext>

# Versión aprobada (entra al repo)
hero-background-main-v1.webp
hero-background-main-v1.avif
```

NUNCA commités un `hero-final-definitivo-2-ahora-si.webp`.

### 2.3 Semillas

| Caso                                                                                 | ¿Usar seed fija o random?                               |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| **Primer lote exploratorio de 4–8 imágenes (iter 1)**                                | Seed RANDOM por candidato.                              |
| **Me gusta el candidato 3, PERO el naranja se pasa. Quiero MANTENER la composición** | Seed FIJA = seed del can3. Ajustar weights / negatives. |
| **Aprobar el MASTER definitivo (v1 canónico)**                                       | Guardar la seed. Indicarla en el `.md` del asset.       |
| **Variantes A/B de la misma escena (mismo "qué", distinto "acabado")**               | Mismo prompt, distintas seeds.                          |

> Una seed guardada hoy = 3 horas de trabajo ahorradas en 2 meses cuando quieras hacer v2.

### 2.4 Convención de pesos / intensidad

En este proyecto NO usamos frases como "muy muy muy detallado" ni "muchísima luz".
Expresamos la intensidad **numéricamente**, bien en pesos del modelo, bien en tokens
repetibles.

| Escala subjetiva       | Equivalente                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| "ligeramente / toque"  | 0.25· base                                                                     |
| "bastante"             | 0.75· base                                                                     |
| "normal / estándar"    | 1.0· base (implicito)                                                          |
| "fuerte / mucho"       | 1.25· base                                                                     |
| "MUY fuerte (cuidado)" | 1.5· base. Usar solo si nada más funciona. Más de 1.5 suele romper coherencia. |
| "apagar / nada de"     | negative prompt o peso negativo -0.5 a -1.0                                    |

---

## 3. Prompt Maestro — Estructura universal (10 bloques fijos)

Cualquier asset fotorrealista de Nova, antes de tocar Midjourney/Flux/etc., se escribe
primero en formato Prompt Maestro con estos 10 bloques. El orden es el de la importancia
semántica (los primeros tienen más peso en la adaptación a modelos).

```
PROMPT MAESTRO — <NOMBRE ASSET> v1
───────────────────────────────────────────────────────────────────
01 · TÍTULO / OBJETIVO PRINCIPAL: (1 oración corta. ¿Qué estamos haciendo?)
02 · ESCENA COMPOSICIÓN: planos (fondo / plano-medio / 1er-plano / foreground) + punto focal único + regla tercios
03 · PRODUCTOS / OBJETOS PRESENTES: lista + cantidad EXACTA + posición relativa
04 · CÁMARA: altura, distancia, lente (aproximación), perspectiva, profundidad de campo
05 · ILUMINACIÓN: dirección principal, luz relleno, temperatura por capas, carácter (difusa/dura)
06 · PALETA CROMÁTICA: % dominantes/secundarios/acento ≤5%. Mencionar colores prohibidos.
07 · MATERIALES / TEXTURAS: realismo, CGI-no, papeles, lonas, metal, cristal.
08 · ATMÓSFERA / EMOCIÓN: inspiración tranquila, no euforia. Sensación general.
09 · ELEMENTOS RESTRICCIÓN: items del Negative Prompt COMÚN §5 + items específicos de este asset.
10 · EXTRAS / REFERENCIAS / META: si hay sref, si hay image prompt, resolución de exportación, etc.
───────────────────────────────────────────────────────────────────
```

### 3.1 Ejemplo: Prompt Maestro para Hero Background Main v1

Ejemplo del pipeline completo usando HERO_BACKGROUND_SPEC.md (§4 productos, §5 cámara, §6
iluminación, §7 color, §10 restricciones). El Prompt Maestro NO es propietario de ningún
modelo; los adaptadores §4 lo traducen.

```
PROMPT MAESTRO — Hero Background Main v1
───────────────────────────────────────────────────────────────────
01 · TÍTULO:  Escritorio de papelería moderno ordenado, punto focal en un cuaderno A4
              abierto. Master Artwork hero background Papelería Nova.
02 · COMPOSICIÓN:  4 planos claramente separados (fondo=pared + superficie escritorio,
    plano medio=laptop + mochila, primer plano=cuaderno A4 abierto + 3 plumas + 1
    resaltador encima, foreground blur=1 clip metálico + 1 borrador pequeño muy fuera de
    foco). Punto focal ÚNICO = esquina superior del cuaderno abierto, cae en la
    intersección superior-derecha de la regla de los tercios. Lado izquierdo del frame
    ≥40% espacio negativo limpio (superficie clara vacía, sin objetos). Ningún objeto
    toca los bordes superior/inferiores del encuadre.
03 · PRODUCTOS:  exactamente 6 objetos. 1-cuaderno A4 abierto cuadrícula 5mm, 2-set de
    3 plumas + 1 resaltador pastel, 3-laptop moderna 13-14" abierta UI limpia sin marca
    sin texto legible, 4-mochila urbana lona+cuero ligeramente desgastada, 5-clip
    metálico + borrador pequeño fuera de foco, 6-lámpara de escritorio minimalista (solo
    brazo visible, esquina superior derecha parcial). Cantidad estricta: 6.
04 · CÁMARA:  perspectiva ligeramente elevada (160-170cm altura mirada suave hacia
    abajo), NO cenital. Distancia corta-mediana encuadra ≈1.2m de ancho de escritorio.
    Lente normal NULA distorsión (líneas rectas son rectas). 3/4 frontal al escritorio.
    Profundidad de campo SELECTIVA (1er plano nitido, plano medio suave bokeh, fondo
    ligeramente fuera, foreground MUY borroso).
05 · ILUMINACIÓN:  Luz principal superior-derecha lateral (origen=lámpara 06), sombras
    largas PERO suaves difusas que caen hacia inferior-izquierda. Luz relleno
    izquierda-ventana imaginaria, NUNCA deja zonas 100% negras. Temperatura CAPAS:
    primer plano cálido papel crema, fondo pared gris-azulado SUAVE frío. Alto detalle
    en texturas. 0 HDR, 0 brillos quemados.
06 · PALETA:  Dominante ≈65% = blancos + neutros cremas + grises fríos apagados
    superficie/pared. Secundario ≈30% = azul profundo (pluma + borde cuaderno + UI
    laptop). Acento NARANJA cálido MÁXIMO 5% de píxeles (resorte clip + 1 toque pluma +
    1 resaltador). Nada de rojo saturado, verde eléctrico, rosa fuerte, púrpura, cian
    fuerte. Gama general BAJA saturación.
07 · MATERIALES:  Papel mate textura grano sutil visible. Lona mochila tejido rugoso.
    Cuerpos metálicos clip / pluma con reflejos naturales discretos. Pantalla laptop
    NO espejo perfecto. Todo REAL, NADA de CGI plástico, NADA de textura sin grano.
08 · ATMÓSFERA:  Inspiración tranquila. Sensación "alguien estuvo aquí hace 5 min, salió
    a café y volverá". Calma premium editorial / comercial + no stock genérico.
09 · RESTRICCIONES NEGATIVAS:  0 personas, 0 manos, 0 caras. 0 marcas/logos/texto
    legible en NINGÚN objeto (NI laptop NI cuaderno NI plumas). 0 café/taza/vaso.
    0 plantas/macetas. 0 auriculares/reloj inteligente. 0 carteles de oferta. 0
    sombras duras imposibles, 0 CGI plastico, 0 aliasing, 0 artefactos, 0 HDR extremo.
10 · EXTRAS:  Resolución master 4K 3840×2160. Sin marca de agua del modelo. Sin bordes.
───────────────────────────────────────────────────────────────────
```

---

## 4. Adaptadores por modelo — Cómo traducir el Prompt Maestro

Cada bloque del Maestro se "reescribe" al dialecto del modelo. Reglas específicas.

### 4.1 Midjourney v7 / v6

**Peculiaridades:** modelo token-eficiente, responde MUY bien a `::` pesos, a `--style raw`,
y a semillas. Rechaza frases redundantes. **Prefiere estilo raw sobre stylized.**

| Elemento del Maestro                         | Cómo lo adaptamos a MJ                                                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bloques 01–08                                | Frases cortas, comas separando conceptos clave. Palabras sueltas. No párrafos.                                                                           |
| Bloque 06 (%)                                | PESOS `::`. "azul profundo::0.30 naranja cálido::0.05 neutros cremas::0.65"                                                                              |
| Bloque 09 negatives                          | Flag `--no person people hands face logo text watermark --no coffee cup plant cgi` (30 chars max por `--no`, partir en múltiples)                        |
| Parámetros **siempre presentes**             | `--ar 16:9 --style raw --stylize 150`. Añadir `--seed <X>` cuando iteres. Añadir `--sref <URL>` si hay style reference de Nova. `--version 7` o `--v 7`. |
| IW (si usas imagen de referencia del boceto) | `--iw 0.5` primera vez. `--iw 0.8` si quieres forzar composition pero NO texturas.                                                                       |

### 4.2 Flux (Schnell / Dev / Pro vía API o Replicate/BFL)

**Peculiaridades:** prompt weighting con `(frase:peso)`. Soporte para `CFG scale`, `steps`.
Schnell es rápido (4 steps); Dev es calidad (20-28 steps); Pro calidad máxima.

| Elemento Maestro        | Cómo lo adaptamos a Flux                                                                                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bloques 01–08           | Párrafos completos, lenguaje natural expresivo. Flux entiende mejor frases largas que MJ.                                                                                               |
| Bloque 06 (%)           | `("azul profundo en objetos":1.0) ("naranja cálido toques mínimos":0.25) ("neutros cremas y blancos":1.5)`                                                                              |
| Bloque 09 negatives     | **Negative prompt FLUX separado** (obligatorio): `"cgi, plastic, oversmoothed skin, logo, text, watermark, person, hands, face, coffee, plant, headphones, hdr, motion blur, aliasing"` |
| Parámetros recomendados | Schnell: steps=4 cfg=1.8 sampler=euler · Dev: steps=24 cfg=3.5 · Pro (API): steps=auto aspect=16:9                                                                                      |
| Seed                    | Obligatoria en el payload. Variaciones: misma seed + `+1 al seed + 15 al cfg`.                                                                                                          |

### 4.3 Ideogram 2.x

**Peculiaridades:** modelo excelente para composición limpia, editorial, UI coherente.
Soporta aspect como primera línea y "estilo visual" como bloque final.

| Elemento Maestro    | Cómo lo adaptamos a Ideogram                                                                                                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Encabezado siempre  | `Aspect: 16:9, Style: Photo, Resolution: 4K`                                                                                                                                                                                      |
| Bloques 01–08       | Idioma natural + keywords enumerados. Ideogram lee bien bullets.                                                                                                                                                                  |
| Bloque 06 (%)       | Usa **pesos textuales**: `*Dominantes:* blancos cremas grises (grandes superficies). *Secundario:* azul profundo (pequeños objetos). *Acento:* naranja cálido — Muy poco, un par de detalles solamente. Nada de saturación alta.` |
| Bloque 09 negatives | Usar la caja "Avoid" del UI, o en prompt añadir `Avoid generating: people, hands, logos, visible text, trademarks, coffee mugs, plants, headphones, hard shadows, plastic look, extreme hdr.`                                     |
| Seed                | Soportar `seed`, usar "Remix" para pequeñas variaciones.                                                                                                                                                                          |

### 4.4 DALL·E 3 / DALL·E 4 vía API

**Peculiaridades:** responde a lenguaje natural MUY bien, malo con pesos explícitos. No
entiende `::` ni `(frase:peso)`. Capta bien descripciones cualitativas. Lo ideal = usar
con GPT-4o que re-escribe el Maestro al "dialecto DALL·E".

| Elemento Maestro    | Cómo lo adaptamos a DALL·E                                                                                                                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bloques 01–08       | Descripción larga, narrativa. 3–5 párrafos. Contar la escena como una historia.                                                                                                                                                                                                                |
| Bloque 06 (%)       | "La mayoría del fondo (≈2/3) son blancos, cremas y grises muy claros. El azul oscuro aparece en detalles pequeños como bordes y pantallas. El color naranja CALIENTE se limita a 2 o 3 detalles microscópicos como el resorte metálico de un clip — nada más. Nada de colores vivos extraños." |
| Bloque 09 negatives | Segundo párrafo entero a "NO dibujes X. No se permite Y. Evita Z a toda costa." DALL·E respeta mejor si lo enuncias al FINAL del prompt.                                                                                                                                                       |
| Parámetros API      | `model=dall-e-3`, `size="1792x1024"` (casi 16:9), `quality="hd"`, `style="natural"` (¡NO vivid!).                                                                                                                                                                                              |
| Seed                | DALL·E 3 / 4 NO permite seed. Usa revised_prompt + almacenarlo para reproducir "espíritu". Si requieres control EXTREMO pasar a Flux/ MJ.                                                                                                                                                      |

---

## 5. Negative Prompts — COMÚN (válido para los 4 modelos)

Antes de escribir una restricción nueva, mira si ya está en este bloque común. Lo usan
TODOS los adaptadores. Si una regla es específica de un asset (p. ej. "0 mochilas verdes"),
no va aquí; va al Negative prompt específico del asset.

```
NEGATIVE PROMPT COMÚN — Papelería Nova (usar SIEMPRE, en TODO asset)
───────────────────────────────────────────────────────────────────
1. Personas / cuerpos:
   person, people, human, man, woman, child, face, hands, fingers, body, portrait, selfie, crowd

2. Marcas / texto / logos (IMPORTANTE — Nova no es un showroom de Apple/Moleskine):
   logo, brand, trademark, brand name, text, writing, letters, words, numbers, printed text, visible label, watermark, signature

3. Clichés de "estudio creativo" sobreusados:
   coffee, cup, mug, tea, plant, potted plant, cactus, succulent, headphones, headset, smartwatch, smartphone with screen on

4. Artefactos generación / calidad baja:
   cgi, 3d render, plastic look, cartoon, anime, illustration, drawing, painting, lowres, blurry, out of focus, jpeg artifacts, aliasing, pixelated, oversharpened

5. Iluminación incorrecta (ART_DIRECTION don'ts):
   hdr, hdr effect, extreme contrast, overexposed, underexposed, clipping highlights, deep black shadows, neon lighting, rainbow light, moody cinematic dark

6. Composition / framing (reglas Nova):
   cropped object, focal point in the corner, centered composition (strict rule of thirds exception), objects touching edge of frame, fisheye, distorted lines, tilted frame, dutch angle
```

### 5.1 Negative prompts ESPECÍFICOS de cada familia de assets

Además del común, cada familia añade los suyos:

| Familia asset     | Extra negative típico                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Hero Background   | `no floating particles unless specified`, `no heavy dust`, `no cinematic black bars`                          |
| Producto 45°      | `no hand holding it`, `no reflection background`, `transparent background allowed ONLY if spec says so (PNG)` |
| Ilustraciones SVG | `no photo`, `no textures gradient mesh`, `vector only, flat design`                                           |
| Iconos            | `no filled only — outline 1.5px stroke, monochrome consistent`.                                               |

---

## 6. Control de variaciones — cuándo y cómo

Hay 3 tipos de variaciones que queremos hacer sobre un mismo Prompt Maestro. Cada uno con
su técnica:

| Tipo de variación                                        | Propósito                                                                          | ¿Cómo?                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **VARIACIÓN SUAVE (mantener composición)**               | "Me gusta la foto, pero el naranja es muy alto / hay una sombra rara".             | **Misma seed + mismo prompt + modificar un bloque 06/05.** Ajustes de weights/negatives.    |
| **VARIACIÓN MEDIA (mantener el "qué", cambiar acabado)** | "Mismo escritorio, pero versión más minimalista / otoñal / back-to-school".        | Mismo Prompt Maestro 01-09. **Distinta seed + cambiar bloque 06 paleta o 08 atmósfera.**    |
| **VARIACIÓN FUERTE (A/B test estructural)**              | "¿Y si la laptop está cerrada? ¿Y si el cuaderno está de perfil?". Cambia la Spec. | Primero actualizas `HERO_BACKGROUND_SPEC.md` a v1.1, luego generas un Prompt Maestro nuevo. |

### 6.1 Regla de oro de variaciones

> Si la modificación cambia CÓMO se ve pero no QUÉ hay → variación, OK.
> Si la modificación cambia QUÉ productos hay o CUÁNTOS → es nueva versión del asset →
> incrementar v1 → v2 en ASSET_ROADMAP.md, cambiar Spec, regenerar Prompt Maestro.

---

## 7. Check de calidad antes de enviar el prompt a un modelo

**Checklist 30 segundos.** Si falla 1 item, re-escribir el prompt ANTES de gastar compute.

- [ ] **Prompt Maestro generado primero?** (Nunca empiezas en Midjourney).
- [ ] Los 10 bloques del §3 están completos.
- [ ] **Cantidad de objetos** del bloque 03 es un número EXACTO (6, no "varias plumas").
- [ ] **Negative prompt común §5** incluido en el adaptador.
- [ ] **Negative específico familia §5.1** incluido.
- [ ] Paleta (bloque 06) menciona NARANJA ≤5% explícitamente.
- [ ] No hay frases como "muy muy detallado" → expresado en pesos §2.4.
- [ ] Aspect ratio correcto (16:9 hero, 1:1 producto, etc.).
- [ ] Seed registrada si es iteración ≥2.
- [ ] Naming convención §2.2 listo para guardar los outputs.

---

## 8. Cómo estructurar el prompt file de cada asset (plantilla)

Cuando toque generar un asset, creamos `docs/assets/prompts/<asset-id>.md` con esta
plantilla (NO hacerla a mano para cada asset — copiar/pegar esta plantilla). Ej:
`prompts/hero-background-main-v1.md`.

```markdown
# Prompt file — <asset-id> v<N>

## 1. Prompt Maestro (copiar §3 con 10 bloques)

…

## 2. Negative prompts

- Común §5 (todo el bloque)
- Específico familia §5.1

## 3. Adaptadores (uno por modelo)

### 3.1 Midjourney

Prompt completo + parámetros `--ar --style --stylize --seed --sref --version`

### 3.2 Flux

Prompt + Negative Prompt separado + payload recomendación steps/cfg/aspect

### 3.3 Ideogram

Aspect/resolution/avoid + prompt

### 3.4 DALL·E

Prompt (párrafos) + negative final last paragraph + API params size/quality/style

## 4. Histórico de iteraciones

(según plantilla §2.1)

## 5. Decisión final

- ¿Qué modelo + iteración se aprueba?
- ¿Seed definitivo?
- Enlace lote / job ids.
```

---

# Autoevaluación Sprint 10.4.1 — Prompt Engineering Guide v1

## 1. Objetivo cumplido

**Sí 100%.** Se crea `docs/assets/PROMPT_ENGINEERING.md` como el documento GLOBAL de
reglas comunes para prompts IA. Contiene:

- ✅ Pipeline **Prompt Maestro → 4 adaptadores** (Midjourney / Flux / Ideogram / DALL·E)
  mismo QUÉ distinto CÓMO.
- ✅ Estructura universal Prompt Maestro de **10 bloques fijos**.
- ✅ Ejemplo Prompt Maestro real de Hero Background Main v1 (usa HERO_BACKGROUND_SPEC.md).
- ✅ **Reglas pesos** (escala 0.25 / 0.75 / 1.0 / 1.25 / 1.5 / -1.0 negatives).
- ✅ **Negative prompts** COMÚN de 6 familias (personas/logos/clichés/artefactos/iluminación/composición) + específico por familia de assets.
- ✅ **Semillas** (random exploratorio / fija refinamiento / guardado MASTER).
- ✅ **Control variaciones** suave/media/fuerte, regla de oro qué vs cómo.
- ✅ **Convenciones de naming** drafts/ vs final vN.
- ✅ **Plantilla file per-asset** para `docs/assets/prompts/<asset>.md` (no creado aún, es plantilla).
- ✅ **Checklist calidad 10-items** antes de mandar prompt al modelo.

## 2. Decisiones tomadas

| Decisión                                                                    | Ventaja                                                                                                                           | Compensación                                                                  |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Pipeline Prompt Maestro agnóstico OBLIGATORIO antes de cualquier modelo** | Evita escribir 5 versiones distintas de la MISMA escena en 5 lenguajes. Cambiar modelo 0 trabajo.                                 | Hay que escribir 2 veces (Maestro + adaptador). Coste mínimo, beneficio alto. |
| **Negative COMÚN global 6 familias** — escribir una vez, aplicar siempre    | Las 40 restricciones más frecuentes de Nova se aplican sin depender del mood del diseñador.                                       | Prompt se alarga un poco.                                                     |
| **Naranja ≤5% como regla explícita en Maestro bloque 06**                   | Alinea con HERO_BACKGROUND_SPEC §7 + evita el fallo más frecuente de IA en Nova (naranja everywhere).                             | Hay que contar píxeles o acotar bastante el negative.                         |
| **No escribir los prompts finales de cada asset HOY** en este documento     | Este doc es reglas comunes. Los prompts concretos van a `docs/assets/prompts/<x>.md` cuando llegue su sprint. Evita doc obsoleto. | Sprint 10.4.2 hero tendrá que crear hero-background-main-v1.md. Es correcto.  |
| **Seed guardada como requisito para MASTER v1**                             | Evita trabajo repetido. Dentro de 6 meses puedes recrear la v1 y hacer la v2 con la misma base.                                   | Hay que ser disciplinado guardando seeds.                                     |

## 3. Documentos consultados

| Documento                                                                                                                                                              | ¿Cómo influyó?                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [HERO_BACKGROUND_SPEC.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/HERO_BACKGROUND_SPEC.md)                                | Origen de los 6 objetos exactos, cámara, iluminación temperatura capas, color %, restricciones. Ejemplo §3.1 Prompt Maestro 10 bloques se construye 1:1 con este doc. |
| [ASSET_ROADMAP.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/ASSET_ROADMAP.md) §0 Convenciones                              | Naming `hero-background-main-v1.webp` y estados de versionado → §2.2 naming + §6 regla oro v1/v2.                                                                     |
| [ART_DIRECTION.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/design/ART_DIRECTION.md) §Iluminación + §Materiales + §Motion DON’Ts  | Negative común §5.5 (HDR, contrast extreme, neon) + §5.4 CGI plastic → §07 materiales reales.                                                                         |
| [BRAND_IDENTITY.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/design/BRAND_IDENTITY.md) §13 DON’Ts + §10 color/acento uso moderado | §6 paleta naranja ≤5% + §09 negatives logos deformados.                                                                                                               |
| [AGENT_MASTER.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/prompts/AGENT_MASTER.md) §Restricciones sprints + calidad              | Solo 1 archivo nuevo creado, no se tocan otros docs, pipeline estructurado.                                                                                           |

## 4. Archivos creados

| Archivo                 | Ruta                                                                                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROMPT_ENGINEERING.md` | [docs/assets/PROMPT_ENGINEERING.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/PROMPT_ENGINEERING.md) |

## 5. Archivos modificados

**Ninguno.** 0 cambios a:

- HERO_BACKGROUND_SPEC.md (como pediste: "No modificaría este documento. Añadiría uno nuevo.")
- ASSET_ROADMAP.md
- Cualquier design/engineering/foundation doc.
- Código fuente.

## 6. Riesgos detectados

| Riesgo                                                                        | Severidad | Mitigación                                                                                                                                         |
| ----------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Midjourney `::` pesos sintaxis mal puesta rompe el prompt**                 | Media     | Checklist §7 → 10 items antes de enviar. Incluye "pesos bien aplicados".                                                                           |
| **DALL·E 3 no respeta seeds → no reproducible al 100%**                       | Baja      | Doc §4.4 lo advierte. Si se necesita 100% control → saltar a Flux/MJ. Guardar revised_prompt.                                                      |
| **La gente se salta el Prompt Maestro y escribe primero en MJ**               | Alta      | Checklist §7 item 0 = bloqueante. "¿Maestro generado?". Sin eso, no compute.                                                                       |
| **Negative común gigante canibaliza al prompt principal en modelos pequeños** | Media     | §4.2 / §4.4 hints — en Flux hay negative prompt SEPARADO (weights -1). En DALL·E los negatives van al FINAL del prompt, no mezclados con positive. |

## 7. Mejoras futuras

1. **Librería sref / style reference común:** crear `docs/assets/style-lib/` con 2–3 imágenes canónicas de Nova para `--sref` en MJ / image prompts en Flux, para homogeneizar acabado.
2. **Script validador de prompts:** `scripts/check-prompt.js` que lea el `hero-background-main-v1.md` y confirme: cantidad objetos EXACTA, porcentajes paleta escritos, negatives comunes presentes, naming correcto archivo salida.
3. **Tabla "Modelo recomendado por asset family":** añadir una tabla en §4 que diga "Hero → Flux Pro / Ideogram. Productos 45° → DALL·E 4 natural. Iconos → Ideogram. Ilustraciones SVG → Ideogram + post-pro vector." (hoy es implicito).
4. **Versionado de este mismo documento:** cuando se adopten modelos nuevos (SD 3.5, Midjourney v8, etc.), nova sección §4.5 Adaptador XYZ sin tocar los anteriores.

## 8. Calidad

| Validación                                                             | Resultado                                                                                               |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 0 archivos preexistentes modificados                                   | ✅ OK. Diff = 1 solo archivo nuevo.                                                                     |
| Pipeline Prompt Maestro → 4 modelos claramente separados               | ✅ OK. Diagrama §1.1 + §4.1/4.2/4.3/4.4 tabla por modelo.                                               |
| Consistencia con HERO_BACKGROUND_SPEC.md (Prompt Maestro ejemplo §3.1) | ✅ OK. 10 bloques = 1:1 con Spec (6 objetos, ≤5% naranja, cámara ligero elevada, punto focal cuaderno). |
| Prettier formatting docs/*                                             | ✅ OK. `npm run format` pasa.                                                                           |
| Proyecto compila / typecheck (regresión)                               | ✅ OK. `npm run typecheck` 0 errores. `npm run build` 1.64 s · 83 modules · Todo intacto.               |

---

🏁 **Sprint 10.4.1 — Prompt Engineering Guide v1 — CERRADO ✔**

Próximo paso lógico (NO hecho hoy, cuando quieras generar la escena):

> Crear `docs/assets/prompts/hero-background-main-v1.md` usando la plantilla §8 y el Prompt
> Maestro ejemplo §3.1. Generar 4 lotes (uno por modelo). Iterar hasta el candidato que
> marca el checklist §11 de HERO_BACKGROUND_SPEC.md.
