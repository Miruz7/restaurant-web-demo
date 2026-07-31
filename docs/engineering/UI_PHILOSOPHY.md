# UI Philosophy

## Principios

### 1. Una responsabilidad por componente

Cada componente debe resolver un único problema.

No mezclar responsabilidades visuales, estructurales y de negocio.

---

### 2. Composición sobre herencia

Preferir:

<Section>
  <Container>
    <Heading />
  </Container>
</Section>

Antes que componentes gigantes con demasiadas responsabilidades.

---

### 3. Componentes estructurales desacoplados

Section controla:

- Espaciado
- Fondo
- Semántica

Container controla:

- Anchura
- Padding horizontal
- Centrado

Ambos componentes deben poder reutilizarse de forma independiente.

---

### 4. La configuración pertenece al componente

Las variantes, tamaños y configuraciones vivirán en `Component.config.ts`.

Los componentes solo renderizan.

### 5. Los componentes pertenecen a un sistema

Los componentes relacionados deben compartir configuración y tipos siempre que sea posible.

Ejemplo:

- Heading
- Text
- Caption

No deben evolucionar como componentes aislados, sino como partes de un único sistema tipográfico.

### 6. La accesibilidad es el comportamiento por defecto

Los componentes interactivos deben preservar el comportamiento nativo de HTML siempre que sea posible.

Preferir elementos semánticos (`button`, `a`, `input`, etc.) antes que recrear su comportamiento con `div`.

La accesibilidad no es una característica opcional; forma parte del diseño del componente desde su creación.
