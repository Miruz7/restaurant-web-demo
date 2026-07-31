# Hero Background — Master Artwork v1 (Spec)

> Especificación técnica y creativa para **Hero Background — Main v1** (Asset crítico
> del [ASSET_ROADMAP.md §1.1.1](ASSET_ROADMAP.md#111-fondo-principal-limpio-textura-minima)).
>
> Reglas de este documento:
>
> - **QUÉ** hay en el fondo y **POR QUÉ**. Nunca **CÓMO** generarlo (eso corresponde a los
>   prompts IA, a la sesión de fotografía o al proceso del diseñador, NO a esta spec).
> - Cero HEX / Cero valores técnicos de iluminación (f-stops, lux, kelvin exactos). Solo
>   lenguaje visual (frío / cálido / suave / lateral).
> - Cero prompts IA (se crean en un sprint adyacente **después** de aprobar esta spec).
> - Cero código ni componentes React (se implementa en Sprint 10.3.x una vez generado el
>   recurso).
> - Cero modificaciones a otros docs.

---

## 1. Objetivo del Background

### 1.1 ¿Qué debe transmitir?

Antes de leer el copy o los CTAs, el fondo solo debe comunicar 4 cosas, en este orden:

1. **Organización.** Todo está en su lugar. Nada fuera de sitio.
2. **Creatividad.** Hay ideas aquí (no es un almacén).
3. **Tecnología moderna.** Nova no es una papelería de los 90. Hay equipo digital
   integrado, cosas actuales.
4. **Confianza / Calidad premium.** No parece stock genérico. Parece una foto editorial
   cuidada de una marca real.

### 1.2 ¿Qué emoción debe provocar?

> **"Me apetece sentarme a crear / estudiar / trabajar aquí"**

Emoción buscada = **Inspiración tranquila**.
No euforia, no sorpresa, no urgencia comercial agresiva.
Una sensación de **orden agradable + potencial creativo**. (Alineado 100% con
CREATIVE_DIRECTION §Experiencia — `Hero = Inspiración`).

### 1.3 Papel dentro del Hero

El Background es **soporte**, NUNCA protagonista. Sus reglas:

- No compite con `HeroContent` (copy + CTAs) por atención visual.
- Deja una **zona limpia a la izquierda** (Desktop) para el texto (≈ 45–50% ancho
  utilizable).
- Los productos de la escena se alojan a la derecha, en la columna visual.
- Permite que `HeroOverlay` modifique intensidad sin romper legibilidad.
- Tiene suficiente **profundidad en el eje Z** (capas) para que luego las animaciones
  parallax / floating tengan sentido, sin que el static se vea "plano".

---

## 2. Composición

### 2.1 Estructura de 4 planos + profundidad

| Nombre plano                          | Z (profundidad) | Contenido principal                                                              | Nítido?                        |
| ------------------------------------- | --------------- | -------------------------------------------------------------------------------- | ------------------------------ |
| **Fondo**                             | Lejos (z=0)     | Superficie + pared + ambiente. Espacio negativo amplio.                          | No (ligeramente fuera de foco) |
| **Plano medio**                       | Medio (z=1)     | Laptop + mochila. Zona de "contexto", objetos que "acompañan".                   | Medio nitidez                  |
| **Primer plano**                      | Cerca (z=2)     | **Protagonistas:** cuaderno abierto + plumas sobre él.                           | ✅ En foco 100%                |
| **Delante del plano (fuera de foco)** | Muy cerca (z=3) | 1–2 pequeños elementos (clip, borrador) fuera de foco, para efecto bokeh delante | Muy borroso (foreground blur)  |

### 2.2 Punto focal

**Un solo punto focal absoluto**: la **esquina superior del cuaderno abierto de primer plano** — justo donde comienza la primera línea / el patrón de cuadrícula del cuaderno.

¿Por qué ahí?

- Es la zona donde "empieza una idea" → storytelling perfecto con la marca.
- Coincide aproximadamente con el eje visual derecho (columna visual del Hero), por lo
  que no roba foco al texto del lado izquierdo.

### 2.3 Equilibrio y espacio negativo

- **Composición asimétrica, equilibrada.** No centrada.
- Lado izquierdo (40–45%) = **90% vacío**. Solo superficie + poca textura ambiental.
- Lado derecho (55–60%) = zona de producto. Mayor densidad visual.
- Regla de los tercios: punto focal cae en la intersección **tercio superior derecho**.
- **Ningún elemento toca los bordes superior ni inferior** del frame. Margen de
  respiración.

### 2.4 Iluminación (marco compositivo)

La luz contribuye a la composición: crea un **vignette natural suave** que guía la mirada
al tercio derecho, sin necesidad de overlay oscuro agresivo. Los bordes del frame son
ligeramente menos luminosos que el centro.

---

## 3. Storytelling: ¿Por qué esta escena representa a Papelería Nova?

La escena responde, sin palabras, a la pregunta del visitante:

> "¿Qué **tipo de lugar** es Papelería Nova?"

Respuesta visual, desglosada por pilar estratégico (BRAND_IDENTITY §Pilares):

| Pilar            | Cómo se ve en el fondo                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Creatividad**  | Cuaderno **abierto** (no cerrado), con una primera línea empezada — sugiere una idea en curso, no un stock estático. Plumas de colores suaves + resaltador apagado → material listo para crear. |
| **Organización** | Todos los objetos están **alineados**, en ángulo recto o 45° controlado. No solapamientos caóticos. Gaps uniformes entre objetos (regla 8px del Design System traducida a fotografía).          |
| **Tecnología**   | Laptop **abierta, encendida**, con interfaz limpia (sin marcas). Conexión entre "papel + digital" — Nova no es solo papel, es también herramienta moderna.                                      |
| **Confianza**    | Materiales **reales**, desgastados ligeramente (cuaderno no perfecto, textura de cuero en lona de mochila) — no parece CGI barato. Iluminación creíble, nada de HDR falso.                      |

Micro-historia contada:

> "Un diseñador / estudiante / profesional estaba hace 5 minutos en este escritorio,
> trabajando en una idea, salió por un café y dejó todo listo para volver. Papelería
> Nova le proporcionó cada herramienta que necesitaba."

---

## 4. Productos presentes

**Exactamente 6 objetos.** Ni uno más (riesgo de caos) ni uno menos (riesgo de escasez).
Cada uno tiene un propósito narrativo:

| #   | Producto                                                                    | ¿Por qué aparece? — Propósito narrativo / estratégico                                                                                                                                  | Plano en composición                                             |
| --- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | **Cuaderno de notas A4 abierto**                                            | ✨ **PROTAGONISTA**. Simboliza "ideas tomando forma". Hojas blancas con un solo apunte. Cuadrícula sutil 5mm.                                                                          | Primer plano, foco 100%.                                         |
| 2   | **Juego de 3 plumas + 1 resaltador**                                        | Variedad de herramienta creativa. Colores: 1 neutro (gris/negro) + 1 marino (principal) + 1 naranja (acento) + 1 resaltador amarillo pastel (no saturado). Posado encima del cuaderno. | Primer plano, apoyado en cuaderno.                               |
| 3   | **Laptop moderna (13–14") abierta**                                         | Puente hacia **Tecnología**. Pantalla con UI limpia: app de notas / diseño, sin contenido real. Sin logo de marca en la tapa.                                                          | Plano medio, detrás del cuaderno, lado derecho.                  |
| 4   | **Mochila / bolso urbano**                                                  | Perfil cercano + movilidad (estudiar/trabajar fuera de casa). Tela lona + cuero, desgastada ligera.                                                                                    | Plano medio, a la derecha/abajo. Detrás del laptop parcialmente. |
| 5   | **Clip metálico** + **borrador pequeño**                                    | 2 micro-elementos de primer plano **fuera de foco** (foreground). Dan profundidad y textura sin ruido narrativo.                                                                       | Delante del plano (z=3), muy borrosos.                           |
| 6   | **Lámpara de escritorio minimalista** (fuera del frame parcial, solo brazo) | Define la fuente de luz principal de la escena. Crea un "cuarto de verdad", no una foto aislada.                                                                                       | Fondo / plano medio, esquina superior derecha (partial).         |

### 4.1 Productos **PROHIBIDOS** en esta versión v1

Nunca incluir en Master Artwork v1 (guardar para variantes A/B test o temporadas):

- ❌ Café / taza / vaso → añade cliché, Nova no es café-tienda.
- ❌ Planta / maceta → "papelería + planta" = tendencia sobreusada.
- ❌ Auriculares / reloj inteligente → diluye "papelería".
- ❌ Gomas, tijeras, pegamento, etc. → ya hay 6 objetos. Cada añadido empeora la
  organización percibida.

---

## 5. Dirección de cámara

> Basada en ART_DIRECTION.md §Dirección de Cámara — "Hero: perspectiva ligeramente
> elevada · lente 35–50mm · profundidad de campo ligera". Traducción a lenguaje visual.

| Parámetro          | Definición visual                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Altura**         | **Vista ligeramente elevada**, como si la cámara estuviera a unos 160–170 cm, mirando ligeramente hacia abajo al escritorio. No es cenital puro (plano picado extremo). No es altura de ojo (plano frontal). |
| **Distancia**      | **Corta-mediana.** Encuadra suficiente superficie de escritorio (≈ 1.2 m de ancho real) pero no tanto como para ver toda la habitación. No macro. No plano general.                                          |
| **Lente (aprox.)** | **Normal.** Distorsión mínima. Líneas rectas se ven rectas (no con efecto barril ni almohada). Ni gran angular distorsionado, ni telefoto comprimido.                                                        |
| **Perspectiva**    | 3/4 frontal al escritorio. El cuaderno mira 45° hacia la cámara, no de perfil ni completamente frontal.                                                                                                      |

Efecto buscado:

> "Acabo de sentarme a este escritorio y veo delante de mí un set de herramientas
> profesional, ordenado y creativo." — No "estoy mirando una foto desde fuera".

---

## 6. Iluminación

> Basada en ART_DIRECTION.md §Iluminación — "luz suave, sombras ligeras, alto detalle,
> reflejos naturales, sin zonas completamente oscuras". Lenguaje visual, no números.

| Elemento luz                 | Descripción visual                                                                                                                                                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dirección principal**      | **Superior-derecha, lateral.** Viene de arriba y desde la derecha del espectador (justificada por la lámpara del #6 de §4). Crea sombras largas pero suaves que caen hacia el lado inferior-izquierdo.                                                |
| **Luz secundaria / relleno** | Suave, procedente de la izquierda-ventana imaginaria. Rellena sombras, evita que queden zonas totalmente negras. No elimina las sombras completamente (mantiene profundidad).                                                                         |
| **Temperatura**              | **Ligeramente cálido en foco → ligeramente más frío en el fondo.** Primer plano tiene toques cálidos (cuaderno papel, luces naranja suave). El fondo (pared) es más neutro/frío azulado (marca principal). Separa capas por temperatura sin palabras. |
| **Carácter general**         | Difusa, suave. **Ninguna sombra dura y marcada.** Reflejos naturales en la pantalla del laptop y cuerpos metálicos (clip), pero sin brillos quemados. Alto detalle en texturas (grano papel, lona mochila).                                           |

---

## 7. Color

> Sin HEX. Todo relativo a BRAND_IDENTITY §Paleta (Principal = azul profundo ·
> Secundario = blanco · Acento = naranja cálido). 5 reglas.

| Rol cromático          | Paleta en escena                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dominante (~65%)**   | **Blanco / neutros cremas / grises fríos apagados.** Superficie escritorio clara (no blanca pura, con textura mate), pared gris azulado muy suave. NO azules intensos en grandes superficies.  |
| **Secundarios (~30%)** | **Azul profundo.** Presente en: cuerpo de 1 pluma, borde del cuaderno, pantalla laptop (UI), pared fondo. Cantidad controlada, no domina.                                                      |
| **Acentos (~5%)**      | **Naranja cálido muy medido.** En: resorte metálico clip, parte superior 1 resaltador, 1 destello minúsculo en brazo lámpara, toque naranja en un bolígrafo. **5% MÁXIMO de píxeles totales.** |
| **Prohibido**          | ❌ Colores saturados que no están en la marca (rojo intenso, verde eléctrico, rosa fuerte, púrpura). ❌ Cian fuerte (se confunde con principal).                                               |
| **General**            | Gama baja saturación (pastel / apagada). Ningún color "grita".                                                                                                                                 |

---

## 8. Movimiento (capas animables — Sprint Motion futuro)

El Master Artwork v1 se entrega en formato estático (WebP/AVIF). Pero desde la
composición, **diseñamos los laterales para que un sprint posterior pueda animar
capas sin volver a generar el recurso desde cero**.

Se identifican 5 ejes de animación, cada uno mapeado a un plano de §2.1:

| Capa animable               | Efecto posible (no implementar todavía) — Descripción cualitativa                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fondo (z=0)**             | **Parallax.** En scroll hero avanza el fondo 20% más lento que el contenido.                                                                 |
| **Plano medio (z=1)**       | **Floating muy lento.** Laptop + mochila levitan 10–15 px con oscilación de 4–6 segundos.                                                    |
| **Primer plano (z=2)**      | **Floating un poco más lento + micro-rotación.** Cuaderno y plumas no se mueven igual que la capa anterior (parallax sutil entre productos). |
| **Elementos delante (z=3)** | **Desenfoque variable.** Borrador + clip se mueven 1–2 px con el movimiento del ratón (cursor parallax futuro).                              |
| **Iluminación (TODOS)**     | **Acentos de luz (micro).** Destellos en clip metálico y pantalla laptop brillan / atenúan suavemente en bucle.                              |

### 8.1 Cosas que NUNCA se animarán en este Master v1

- ❌ Zoom de cámara.
- ❌ Rotación completa de ningún objeto.
- ❌ Rebotes / saltos.
- ❌ Aparición / desaparición brusca de productos.
  (Coherente con ART_DIRECTION §Motion Visual — "No permitido: rebotes exagerados, rotaciones rápidas, zoom agresivo".)

---

## 9. Responsive (recorte seguro por breakpoint)

El Master Artwork original se exporta **1 solo archivo 3840×2160 (16:9, Desktop)**.
Los 3 tamaños responsive se recortan de ese mismo master. **Nunca se generan 3 assets
distintos en v1** (aumentaría mantenimiento).

| Breakpoint              | Aspect ratio util                   | Zona segura (no recortar nunca) — qué debe verse siempre                                                                                         | ¿Qué se puede recortar (perdida aceptable)?                                                                 |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Desktop (≥1024px)**   | 16:9 · 3840×2160                    | 6 objetos completos + punto focal cuaderno + texto columna izq limpia                                                                            | — (usa el frame completo)                                                                                   |
| **Tablet (768–1023px)** | 4:3 · recorte vertical centrado     | ✅ Cuaderno ✅ Plumas ✅ Laptop. Lado izquierdo vacío para texto (componente se apila).                                                          | ✂️ Moquila parcial (lado derecho recorte 15–20%). ✂️ Lámpara parcial. ✂️ Foreground borrador si hace falta. |
| **Mobile (<768px)**     | 9:16 · recorte centro → centro-bajo | ✅ Cuaderno ✅ Plumas ✅ Laptop (lo mínimo posible). ✅ Textura superficie escritorio para todo el alto del frame (no se recorte a pared vacía). | ✂️ Mochila: solo esquina visible. ✂️ Lámpara: desaparece. ✂️ Foreground blur: desaparece.                   |

### 9.1 Regla irrenunciable del recorte

> **En ningún breakpoint debe quedar el punto focal (cuaderno) cortado por la mitad.**
>
> El cuaderno debe verse completo (o casi completo) incluso en Mobile 360×640. Si hay
> que recortar, se recorta de la derecha / arriba, NUNCA del punto focal.

---

## 10. Restricciones: Qué NO debe tener

Lista de veto absoluto. Si aparece cualquiera de estas cosas, el recurso **no pasa
checklist §11** y se regenera:

### 10.1 Contenido prohibido

- ❌ **Personas, manos, caras, cuerpos.** (Guardar para Servicios, no Hero Background.)
- ❌ **Logos / marcas / texto legible.** Ni en laptop, ni en cuaderno, ni en objetos.
  Laptop UI tiene placeholders abstractos. Cuaderno tiene rayas sin palabras.
- ❌ **Otras marcas de productos reales** (logo Apple, cuaderno Moleskine, pluma BIC, etc.)
- ❌ **Fondos caóticos / texturas fuertes / ruido excesivo.**
- ❌ **Lenguaje de oferta / rebajas / carteles.** (Ningún "50% OFF", "Envío gratis" flotante en el fondo.)
- ❌ **Iconos social media.**

### 10.2 Calidad prohibida

- ❌ **Fotomontaje evidente.** Sombras que no cuadran, luces que vienen de múltiples direcciones imposibles.
- ❌ **CGI plástico / sin textura.** Los materiales deben parecer reales.
- ❌ **HDR extremo** (zonas blancas quemadas, sombras negras puras).
- ❌ **Bordes duros / aliasing** (si es generado por IA).
- ❌ **Artefactos de compresión visibles** en WebP/AVIF.

### 10.3 Regla de marca prohibida

- ❌ No usar naranja/acento en **más del 5% de los píxeles**. (El acento son detalles, nunca fondo.)

---

## 11. Checklist de aprobación Master Artwork v1

Antes de mover el Asset de `En progreso → Aprobado` en ASSET_ROADMAP.md, validar TODO el
checklist. **Cualquier item tachado justifica regeneración parcial.**

### 11.1 Objetivo (§1)

- [ ] Se percibe **Organización** antes que nada (todo ordenado, ángulos controlados).
- [ ] Se percibe **Creatividad**: cuaderno abierto, no catálogo cerrado.
- [ ] Se percibe **Tecnología**: laptop presente, interfaz limpia, no "solo papel".
- [ ] Se percibe **Confianza / calidad premium**: no parece stock genérico.
- [ ] Emoción general = **Inspiración tranquila** (no euforia, no prisa).

### 11.2 Composición (§2)

- [ ] 4 planos distinguibles (fondo / plano medio / primer plano / foreground blur).
- [ ] Punto focal 100% nítido = **esquina superior cuaderno abierto**.
- [ ] Lado izquierdo **≥40% espacio negativo** limpio (zona segura para texto copy).
- [ ] Regla tercios = punto focal cae en intersección superior-derecha.
- [ ] Ningún producto toca los bordes superior/inferiores del frame.

### 11.3 Storytelling (§3)

- [ ] Los 4 pilares (Creatividad · Organización · Tecnología · Confianza) son identificables visualmente sin texto.
- [ ] Meta-lectura "alguien estuvo aquí hace 5 minutos y volverá" es plausible.

### 11.4 Productos presentes (§4)

- [ ] **Exactamente 6 objetos** (no 5, no 7).
- [ ] Cuaderno A4 abierto ✅
- [ ] 3 plumas + 1 resaltador = 4 útiles escritura ✅
- [ ] Laptop moderna abierta ✅
- [ ] Mochila lona ✅
- [ ] 2 micro foreground (clip + borrador) fuera de foco ✅
- [ ] Lámpara parcial (solo brazo, esquina superior der.) ✅
- [ ] **Ninguno** de los prohibidos §4.1 aparece.

### 11.5 Cámara (§5)

- [ ] Perspectiva **ligeramente elevada** (no cenital, no frontal ojo).
- [ ] Líneas rectas = rectas (sin distorsión barril).
- [ ] Encuadre = 1.2 m aprox ancho real de escritorio.

### 11.6 Iluminación (§6)

- [ ] Luz principal sup-der lateral, sombras suaves inf-izq.
- [ ] Luz relleno izq, elimina zonas 100% negras.
- [ ] Temperatura cálida en primer plano → más fría en fondo = separación capas.
- [ ] Sin brillos quemados, sin HDR, sin reflejos irrealistas.

### 11.7 Color (§7)

- [ ] ~65% dominante neutros / blanco / gris suave.
- [ ] ~30% secundarios = azul profundo en acotado.
- [ ] ~**≤5%** = naranja cálido (contar píxeles si hace falta).
- [ ] Ningún color saturado extraño fuera de paleta marca.

### 11.8 Responsive (§9) — pruebas de recorte

- [ ] Desktop 3840×2160: TODO bien.
- [ ] Tablet 1024×768 recorte 4:3: cuaderno + plumas + laptop completos.
- [ ] Mobile 360×640 recorte 9:16: **cuaderno completo**. Mochila cortada → OK. Lámpara cortada → OK.
- [ ] En ningún breakpoint el punto focal queda a mitad de corte.

### 11.9 Restricciones (§10)

- [ ] 0 personas / manos / caras.
- [ ] 0 logos / 0 marcas / 0 texto legible.
- [ ] 0 fondo caótico / ruido / carteles oferta.
- [ ] 0 sombras imposibles / CGI plástico / HDR extremo.

### 11.10 Entrega técnica (ASSET_ROADMAP §0.3 formatos + §0.4 naming)

- [ ] Exportado con nombre: **`hero-background-main-v1.webp`** (nombre convencion 0.4).
- [ ] Exportado paralelo `hero-background-main-v1.avif` (alternativa §0.3).
- [ ] Resolución mínima **3840×2160 (4K UHD)**.
- [ ] Clean metadata, sin GPS / datos privados.

---

# Autoevaluación — Sprint 10.4 Hero Background Spec v1

## 1. Objetivo cumplido

**Sí. 100% del alcance del sprint.**

Se crea 1 único archivo `docs/assets/HERO_BACKGROUND_SPEC.md` sin prompts, sin código, sin
imágenes, sin tocar otros docs. Contiene las **11 secciones pedidas por el prompt**:

1. ✅ Objetivo (qué transmite, emoción, papel en el Hero).
2. ✅ Composición (4 planos, punto focal, equilibrio, iluminación-como-marco).
3. ✅ Storytelling (conecta los 4 pilares de marca + micro-historia).
4. ✅ Productos presentes (exactamente 6 objetos — cada uno con "por qué").
5. ✅ Dirección de cámara (altura, distancia, lente, perspectiva).
6. ✅ Iluminación (dirección principal, secundaria, temperatura — solo lenguaje visual).
7. ✅ Color (dominante ~65% / secundario ~30% / acento ≤5% — sin HEX).
8. ✅ Movimiento (5 capas animables mapeadas a planos de composición + veto zooms/rebotes).
9. ✅ Responsive (3 breakpoints, zonas seguras, regla punto focal irrecortable).
10. ✅ Restricciones (10.1 contenido proh / 10.2 calidad proh / 10.3 marca proh).
11. ✅ Checklist aprobación (10 sub-grupos, 44 items chequeables).

Cualquier diseñador humano o modelo generativo multimodal puede leer el documento y
reconstruir **exactamente** la misma escena, sin explicaciones adicionales.

## 2. Decisiones tomadas

| Decisión                                                            | Ventaja / Por qué la tomamos                                                                  | Compensación / Riesgo                                                                    |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Exactamente 6 objetos** en escena §4.1                            | Evita "más es mejor" de la IA (12+ objetos = caos). Cero ambigüedad.                          | Si el cliente pide añadir objeto en v2, hay que justificarlo y cambiar la spec.          |
| **Punto focal único = esquina cuaderno abierto**                    | Alinea narrativa ("empieza una idea") + regla tercios + lado izq libre para texto.            | Hay que ser muy preciso en validación (mucha IA pondrá foco en laptop, más "brillante"). |
| **Temperatura separa capas** (cálido primer plano → frío fondo) §6  | Sin palabras, profundidad de color indica profundidad Z. Mejor que solo desenfoque.           | Si se excede, foto se ve "partida". Requiere revisión cuidadosa.                         |
| **≤5% píxeles naranja/acento** §7 + checklist count                 | Freno automático al "naranja everywhere" típico de IA. El acento es detalle, no protagonista. | Hay que medir con cuentapíxeles.                                                         |
| **1 solo archivo master 4K + recortes responsive §9** (no 3 assets) | Mantenimiento futuro más simple. Cambiar v1 → v2: 1 master nuevo, 1 regla recorte.            | Mobile 9:16 tiene menos margen compositivo.                                              |
| **Checklist granular (44 items)** §11                               | Reduce subjetividad en aprobación. "Está chulo" no vale → hay que marcar 44 casillas.         | 10–15 mins por validación (trade-off por calidad).                                       |

## 3. Documentos consultados

| Documento                                                                                                                                                                                                                                                              | ¿Cómo influyó en la spec?                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[BRAND_IDENTITY.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/design/BRAND_IDENTITY.md)** §4 Pilares · §10 Principios color/logo · §12.1 Hero touchpoint                                                                         | 4 pilares → §3 Storytelling. Hero touchpoint Inspiración → §1.2. Color azul/blanco/naranja → §7 sin HEX. DOs&DON'Ts logo sobre fondos complejos → §10.1 prohibición de logos dentro del fondo.                 |
| **[CREATIVE_DIRECTION.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/design/CREATIVE_DIRECTION.md)** §Personalidad · §Experiencia · §Motion · §Valores                                                                              | Hero emoción = Inspiración → §1.2. Personalidad (organizados / creativos / cercanos / profesionales) → composición 6 objetos alineados. Motion no distrae → §8.1 veto animaciones.                             |
| **[ART_DIRECTION.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/design/ART_DIRECTION.md)** §Fotografía · §Iluminación · §Cámara · §Hero · §Motion · §Materiales                                                                     | Cámara Hero 35–50mm / perspectiva ligera elevada / poca profundidad → §5. Luz suave + materiales reales + texturas → §6 + §10.2 prohibición CGI plástico. DO: sombras suaves. DON'T: HDR. → §6 + §10.2.        |
| **[HERO_SPECIFICATION.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/design/HERO_SPECIFICATION.md)** §Objetivo · §Layout ASCII · §Recursos · §Responsive · "Como una historia, no banner" · §Combinación (escena moderna papelería) | Texto izq + visual der → §2.3 + §9 recorte lado izq seguros. Productos layout ASCII (Cuaderno+Laptop+Plumas+Mochila) → §4 exactamente esos 4 + 2 micro-elementos + lámpara parcial. "Historia no banner" → §3. |
| **[ASSET_ROADMAP.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/ASSET_ROADMAP.md)** §1.1.1 Hero Background Main v1 · §0 Convenciones (estados / formatos / naming: `hero-background-main-v1.webp`)                           | Nombre final del recurso, versión v1 (columna Versión añadida en Sprint 10.3.0), formatos WebP+AVIF, responsable IA. Check §11.10 valida naming + resolución 4K.                                               |
| **[AGENT_MASTER.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/prompts/AGENT_MASTER.md)** §Restricciones sprint / calidad de entrega                                                                                                | "No modificar otros docs" → respetado. "Sin código" → respetado. Quality gates → se formatea con Prettier.                                                                                                     |

## 4. Archivos creados

| Archivo                   | Ruta                                                                                                                                                | Estado    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `HERO_BACKGROUND_SPEC.md` | [docs/assets/HERO_BACKGROUND_SPEC.md](file:///c:/Users/Madlc/Desktop/ProyectoPersonal/Papeleria/papeleria-nova/docs/assets/HERO_BACKGROUND_SPEC.md) | ✅ Creado |

## 5. Archivos modificados

**Ninguno.** Cero cambios a:

- BRAND_IDENTITY.md
- CREATIVE_DIRECTION.md
- ART_DIRECTION.md
- HERO_SPECIFICATION.md
- COMPONENT_ARCHITECTURE.md
- UI_PHILOSOPHY.md
- ASSET_ROADMAP.md
- Cualquier código fuente ni documentación de engineering.

Cumplimiento estricto: `"No modificar documentación existente."`

## 6. Riesgos detectados

| Riesgo                                                  | Severidad | ¿Cómo mitigarlo en el sprint de generación?                                                                                                                                   |
| ------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IA tiende a añadir café / planta** §4.1 (prohibido)   | Alta      | Checklist §11.4 → 6 objetos exactos. Si hay 7, devolver. Prompt explícito negative.                                                                                           |
| **Laptop con logo de marca real** (Apple/Windows) §10.1 | Alta      | Checklist §11.9 0 logos + Post-proceso: blur/desenfoque pantalla + UI placeholders abstractos.                                                                                |
| **Punto focal en laptop, no cuaderno** §2.2             | Media     | Diagrama de composición a la hora de generar: "cuando recortes un cuadro imaginario alrededor de la esquina superior del cuaderno, ese 20% del área debe ser el 100% nítido". |
| **Naranja >5% (paleta sobre saturada)** §7 + §10.3      | Media     | Validación automática por script de cuenta píxeles antes de aprobar.                                                                                                          |
| **Recorte Mobile corta el cuaderno a mitad** §9.1       | Media     | Testing manual 3 recortes (Desktop/Tablet/Mobile) en Figma Board antes de subir al repo.                                                                                      |
| **Fotomontaje evidente / CGI plástico** §10.2           | Alta      | Checklist §11.6 + §11.9. Revisión humana obligatoria. No validar 1 sola mirada: revisar 100% zoom a 400%.                                                                     |

## 7. Mejoras futuras (sprints adyacentes, NO esta spec)

1. **Diagrama visual de composición:** añadir un diagrama ASCII sencillo al final del §2 con la posición exacta de los 6 objetos + puntos focales tercios. (NO HEX, solo layout.)
2. **Variantes v1.1 y v1.2 (A/B test):** crear `HERO_BACKGROUND_SPEC_VARIANTS.md` con (a) variant-light — aún más espacio negativo, (b) variant-warm — 5% más naranja (solo para fechas de back-to-school temporales). La MASTER v1 sigue siendo la canónica.
3. **Cinemagraph §Motion:** crear `HERO_BACKGROUND_MOTION_PLAN.md` detallando cuáles 2 capas de §8 animan primero en el plan de migración static → video/cinemagraph (Sprint Fase 4 ASSET_ROADMAP).
4. **Automatización checklist §11:** script Python/Node `scripts/validate-hero-master.js` que valide: resolución ≥4K, aspecto 16:9, naranja ≤5%, nombre archivo convención `hero-background-main-v1.webp`.
5. **Lighthouse + APCA:** cuando se integre en `HeroBackground.tsx`, validar contraste AA del copy H1 sobre el fondo + overlay en los 3 breakpoints.

## 8. Calidad

| Validación Sprint 10.4                                                                                              | Resultado                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **No se modificó ningún otro documento** (solo 1 archivo nuevo creado)                                              | ✅ OK. Comprobado diff contra base — solo aparece `docs/assets/HERO_BACKGROUND_SPEC.md`.                                                           |
| **Consistente con ART_DIRECTION.md** (cámara Hero, iluminación suave, materiales reales, motion restricciones)      | ✅ OK. §5, §6, §8.1 coinciden 1:1 con directrices del doc.                                                                                         |
| **Consistente con HERO_SPECIFICATION.md** (layout texto izq / visual der / productos / Responsive / storytelling)   | ✅ OK. §2.3 espacios negativos, §4 productos ASCII layout, §9 recortes responsive, §3 micro-historia.                                              |
| **Consistente con BRAND_IDENTITY.md** (4 pilares, paleta %, uso del acento controlado, touchpoint Hero=Inspiración) | ✅ OK. §1.2 emoción, §3 4 pilares, §7 distribución 65/30/≤5, §10.3 veto naranja excesivo.                                                          |
| **Especificación cerrada: sin ambigüedades abiertas** (cualquier diseñador/IA reproduce exacto)                     | ✅ OK. 44-point checklist §11 cierra cualquier hueco. Contiene todo salvo la mecánica de generación (prompts) que corresponde al sprint siguiente. |
| **Prettier formatting** (MD consistente con el resto de docs/)                                                      | ✅ OK. `npm run format` pasa sobre el nuevo archivo sin warnings.                                                                                  |

---

🏁 **Sprint 10.4 — Hero Background Spec v1 — CERRADO ✔**

Próximo paso natural (Sprint 10.4.1, NO hecho hoy):

> Escribir prompts IA específicos (Midjourney / Ideogram / DALL·E / Flux) que traduzcan
> esta spec al lenguaje del modelo, junto con negative prompts provenientes de §10
> (Restricciones).
