/**
 * HeroParallax.tsx
 *
 * Componente invisible opcional · return null.
 *
 * Se provee por completitud arquitectónica (coincidir con la estructura
 * pedida en el Sprint 10.8). El uso recomendado para HomePage es
 * importar directamente el hook useHeroParallax y aplicar los estilos
 * a los 3 divs depth, ya que HomePage es quien monta esos slots.
 *
 * Este componente NO toca el DOM de profundidad. 0 side effects
 * adicionales a los del hook (que son exclusivamente pointermove + rAF
 * solo cuando el ref de section y isHeroVisible lo permiten).
 */

import { useHeroParallax, type HeroParallaxStyles } from "./HeroParallax.hook";

export interface HeroParallaxBindProps {
  readonly sectionRef: React.RefObject<HTMLElement | null>;
  readonly isHeroVisible: boolean;
  readonly children: (styles: HeroParallaxStyles) => React.ReactNode;
}

/**
 * HOC opcional con render-prop — pensado si algún día queremos
 * componer parallax dentro de otro sub-componente sin tocar HomePage.
 * En este Sprint 10.8.0 NO es usado; HomePage usa useHeroParallax directamente.
 */
export function HeroParallaxBind({
  sectionRef,
  isHeroVisible,
  children,
}: HeroParallaxBindProps): React.ReactNode {
  const styles = useHeroParallax(sectionRef, isHeroVisible);
  return children(styles);
}

/**
 * Componente trivial invisible · cumple con:
 *   "Nueva carpeta features/hero/motion/parallax/HeroParallax.tsx"
 * sin imponer un uso particular. Retorna null.
 */
export function HeroParallax(): null {
  return null;
}

export default HeroParallax;
