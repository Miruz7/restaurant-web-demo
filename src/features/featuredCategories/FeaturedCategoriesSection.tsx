import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { EditorialContainer, EDITORIAL_SCENE_INNER_CLASS } from "@/shared/editorial";
import {
  DEFAULT_FEATURED_CATEGORIES_ID,
  FEATURED_CATEGORIES,
  FEATURED_CATEGORIES_HEADING,
  FEATURED_CATEGORIES_SUBHEADING,
} from "./FeaturedCategories.constants";
import {
  FEATURED_CATEGORIES_HEAD_CLASS,
  FEATURED_CATEGORIES_HEADING_CLASS,
  FEATURED_CATEGORIES_SUBHEADING_CLASS,
  SHOWCASE_BG_LAYER_COMMON,
  SHOWCASE_BG_TRANSITION_CLASS,
  SHOWCASE_BAR_INDICATOR_CLASS,
  SHOWCASE_BAR_TRACK_CLASS,
  SHOWCASE_CATEGORY_ITEM_BASE,
  SHOWCASE_CATEGORY_ITEM_TEXT_BASE,
  SHOWCASE_CATEGORY_LIST_CLASS,
  SHOWCASE_COMPOSITION_ROW_CLASS,
  SHOWCASE_INFO_CTA_ARROW,
  SHOWCASE_INFO_CTA_CLASS,
  SHOWCASE_INFO_DESC_CLASS,
  SHOWCASE_INFO_TITLE_CLASS,
  SHOWCASE_INFO_WRAP_CLASS,
  SHOWCASE_LEFT_COL_CLASS,
  SHOWCASE_NAV_WRAP_CLASS,
  SHOWCASE_OVERLAY_CLASS,
  SHOWCASE_RIGHT_COL_CLASS,
  getFeaturedCategoriesSectionClasses,
} from "./FeaturedCategories.config";
import { CategoryMenuModal } from "./components/CategoryMenuModal";
import type {
  FeaturedCategoriesSectionProps,
  FeaturedCategoryItem,
} from "./FeaturedCategories.types";

type MenuModalState =
  { readonly isOpen: false } | { readonly isOpen: true; readonly category: FeaturedCategoryItem };

const CATEGORY_COUNT = FEATURED_CATEGORIES.length;

const WHITE_CURTAIN_COVER_MS = 320;
const WHITE_CURTAIN_REVEAL_MS = 450;
const WHITE_CURTAIN_ALPHA = 0.9;
const WHITE_CURTAIN_BLUR_PX = 6;
const WHITE_CURTAIN_EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const REDUCED_MOTION_CURTAIN_MS = 80;
const REDUCED_MOTION_ALPHA = 0.8;
const TEXT_FADE_IN_MS = 300;
const TEXT_REVEAL_DELAY_MS = 70;
const TEXT_REDUCE_MOTION_TEXT_MS = 60;

function getReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function waitImageReady(img: HTMLImageElement): Promise<void> {
  return new Promise<void>((resolve) => {
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      resolve();
      return;
    }
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };
    img.addEventListener("load", finish, { once: true, passive: true });
    img.addEventListener("error", finish, { once: true, passive: true });
    try {
      const decoded = img.decode?.();
      if (decoded && typeof decoded.then === "function") {
        decoded.then(finish).catch(finish);
      }
    } catch {
      /* sinop */
    }
    let polls = 0;
    const intervalId = window.setInterval(() => {
      polls++;
      if (img.complete && img.naturalWidth > 0) {
        window.clearInterval(intervalId);
        finish();
      } else if (polls > 100) {
        window.clearInterval(intervalId);
        finish();
      }
    }, 16);
  });
}

function waitDoubleRaf(): Promise<void> {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

export default function FeaturedCategoriesSection({
  id = DEFAULT_FEATURED_CATEGORIES_ID,
  headingId,
  className,
}: FeaturedCategoriesSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [topLayer, setTopLayer] = useState<0 | 1>(0);
  const [menuModalState, setMenuModalState] = useState<MenuModalState>({ isOpen: false });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => getReducedMotionPreferred());
  const [curtainShown, setCurtainShown] = useState<boolean>(false);
  const [curtainDurationMs, setCurtainDurationMs] = useState<number>(WHITE_CURTAIN_COVER_MS);
  const [infoVisible, setInfoVisible] = useState<boolean>(true);
  const textRevealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      if (mq.addEventListener) {
        mq.addEventListener("change", listener);
        return () => mq.removeEventListener("change", listener);
      }
      mq.addListener?.(listener);
      return () => mq.removeListener?.(listener);
    } catch {
      return;
    }
  }, []);

  const openMenuModal = useCallback((category: FeaturedCategoryItem): void => {
    setMenuModalState({ isOpen: true, category });
  }, []);

  const closeMenuModal = useCallback((): void => {
    setMenuModalState({ isOpen: false });
  }, []);

  const imgLayerRefs = useRef<[HTMLImageElement | null, HTMLImageElement | null]>([null, null]);
  const layerCatIdRef = useRef<[string, string]>([FEATURED_CATEGORIES[0].id, ""]);
  const activeLayerRef = useRef<0 | 1>(0);
  const transitionTimerRef = useRef<number | null>(null);

  const hId = headingId ?? `${id}-heading`;
  const activeCategory = FEATURED_CATEGORIES[activeIdx];

  const goCategory = useCallback(
    async (nextIdx: number) => {
      if (nextIdx === activeIdx) return;
      if (isTransitioning) return;
      if (nextIdx < 0 || nextIdx >= CATEGORY_COUNT) return;

      setIsTransitioning(true);

      const coverMs = reducedMotion ? REDUCED_MOTION_CURTAIN_MS : WHITE_CURTAIN_COVER_MS;
      const revealMs = reducedMotion ? REDUCED_MOTION_CURTAIN_MS : WHITE_CURTAIN_REVEAL_MS;
      const textRevealDelay = reducedMotion ? 0 : TEXT_REVEAL_DELAY_MS;
      const textRevealDur = reducedMotion ? TEXT_REDUCE_MOTION_TEXT_MS : TEXT_FADE_IN_MS;
      const nextCategory = FEATURED_CATEGORIES[nextIdx];
      const activeSlot = activeLayerRef.current;
      const idleSlot: 0 | 1 = (activeSlot === 0 ? 1 : 0) as 0 | 1;
      const idleEl = imgLayerRefs.current[idleSlot];
      if (!idleEl) {
        setIsTransitioning(false);
        return;
      }

      if (layerCatIdRef.current[idleSlot] !== nextCategory.id) {
        idleEl.src = nextCategory.image.src;
        layerCatIdRef.current[idleSlot] = nextCategory.id;
      }
      if (nextCategory.image.objectPosition) {
        idleEl.style.objectPosition = nextCategory.image.objectPosition;
      } else {
        idleEl.style.objectPosition = "";
      }

      setCurtainDurationMs(coverMs);
      setCurtainShown(true);

      await Promise.all([
        waitImageReady(idleEl),
        new Promise<void>((resolve) => window.setTimeout(resolve, coverMs)),
      ]);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      if (textRevealTimerRef.current !== null) {
        window.clearTimeout(textRevealTimerRef.current);
        textRevealTimerRef.current = null;
      }

      await waitDoubleRaf();

      activeLayerRef.current = idleSlot;
      setTopLayer(idleSlot);
      setActiveIdx(nextIdx);
      setInfoVisible(false);

      setCurtainDurationMs(revealMs);
      setCurtainShown(false);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, revealMs + 8);

      const totalRevealToText = revealMs + textRevealDelay;
      textRevealTimerRef.current = window.setTimeout(() => {
        setInfoVisible(true);
        textRevealTimerRef.current = null;
      }, totalRevealToText);

      transitionTimerRef.current = window.setTimeout(
        () => {
          transitionTimerRef.current = null;
        },
        coverMs + revealMs + textRevealDelay + textRevealDur + 60,
      );
    },
    [activeIdx, isTransitioning, reducedMotion],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
      if (textRevealTimerRef.current !== null) {
        window.clearTimeout(textRevealTimerRef.current);
        textRevealTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    FEATURED_CATEGORIES.forEach((cat) => {
      try {
        const img = new Image();
        img.decoding = "async";
        img.src = cat.image.src;
      } catch {
        /* sinop */
      }
    });
  }, []);

  const layer0Visible = topLayer === 0;

  const layer0Style = useMemo<CSSProperties>(() => {
    const style: CSSProperties = layer0Visible
      ? { opacity: 1, zIndex: 0 }
      : { opacity: 0, zIndex: 0 };
    return style;
  }, [layer0Visible]);

  const layer1Style = useMemo<CSSProperties>(() => {
    const style: CSSProperties = !layer0Visible
      ? { opacity: 1, zIndex: 1 }
      : { opacity: 0, zIndex: 1 };
    return style;
  }, [layer0Visible]);

  const indicatorStyle = useMemo<CSSProperties>(() => {
    return { transform: `translateY(${activeIdx * 100}%)` };
  }, [activeIdx]);

  const infoStyle = useMemo<CSSProperties>(() => {
    const textDur = reducedMotion ? TEXT_REDUCE_MOTION_TEXT_MS : TEXT_FADE_IN_MS;
    const easing = reducedMotion ? "linear" : WHITE_CURTAIN_EASING;
    const ty = reducedMotion ? "0px" : "6px";
    const opacity = infoVisible ? 1 : 0;
    const translateY = infoVisible ? "0px" : ty;
    return {
      opacity,
      transform: `translateY(${translateY})`,
      transition: `opacity ${textDur}ms ${easing}, transform ${textDur}ms ${easing}`,
      willChange: "opacity, transform",
    };
  }, [infoVisible, reducedMotion]);

  const curtainAlpha = reducedMotion ? REDUCED_MOTION_ALPHA : WHITE_CURTAIN_ALPHA;
  const curtainBlurPx = reducedMotion ? 0 : WHITE_CURTAIN_BLUR_PX;
  const curtainOpacity = curtainShown ? 1 : 0;

  const curtainStyle = useMemo<CSSProperties>(() => {
    const bgA = curtainShown ? curtainAlpha : 0;
    const blurVal = curtainShown ? curtainBlurPx : 0;
    const transProps = reducedMotion
      ? `opacity ${curtainDurationMs}ms linear, background-color ${curtainDurationMs}ms linear`
      : `opacity ${curtainDurationMs}ms ${WHITE_CURTAIN_EASING}, background-color ${curtainDurationMs}ms ${WHITE_CURTAIN_EASING}, backdrop-filter ${curtainDurationMs}ms ${WHITE_CURTAIN_EASING}, -webkit-backdrop-filter ${curtainDurationMs}ms ${WHITE_CURTAIN_EASING}`;
    return {
      opacity: curtainOpacity,
      backgroundColor: `rgba(255,255,255,${bgA})`,
      backdropFilter: `blur(${blurVal}px) saturate(1.02)`,
      WebkitBackdropFilter: `blur(${blurVal}px) saturate(1.02)`,
      transition: transProps,
      zIndex: 25,
      willChange: "opacity, background-color, backdrop-filter",
    };
  }, [curtainShown, curtainDurationMs, curtainAlpha, curtainBlurPx, curtainOpacity, reducedMotion]);

  const initialCat0 = FEATURED_CATEGORIES[0];

  return (
    <section
      id={id}
      className={cn(getFeaturedCategoriesSectionClasses(), className)}
      aria-labelledby={hId}
      tabIndex={-1}
    >
      <img
        key="bg-layer-a"
        ref={(el) => {
          imgLayerRefs.current[0] = el;
        }}
        src={initialCat0.image.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        width={initialCat0.image.width}
        height={initialCat0.image.height}
        loading="eager"
        decoding="async"
        style={{ objectPosition: initialCat0.image.objectPosition, ...layer0Style }}
        className={cn(SHOWCASE_BG_LAYER_COMMON, SHOWCASE_BG_TRANSITION_CLASS)}
      />
      <img
        key="bg-layer-b"
        ref={(el) => {
          imgLayerRefs.current[1] = el;
        }}
        src={initialCat0.image.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        width={initialCat0.image.width}
        height={initialCat0.image.height}
        loading="eager"
        decoding="async"
        style={{ objectPosition: initialCat0.image.objectPosition, ...layer1Style }}
        className={cn(SHOWCASE_BG_LAYER_COMMON, SHOWCASE_BG_TRANSITION_CLASS)}
      />
      <div aria-hidden="true" className={SHOWCASE_OVERLAY_CLASS} />
      <div
        aria-hidden="true"
        style={curtainStyle}
        className="absolute inset-0 pointer-events-none select-none"
      />

      <EditorialContainer className="h-full w-full">
        <div className={EDITORIAL_SCENE_INNER_CLASS}>
          <div className={SHOWCASE_COMPOSITION_ROW_CLASS}>
            <div className={SHOWCASE_LEFT_COL_CLASS}>
              <div className={SHOWCASE_NAV_WRAP_CLASS}>
                <div aria-hidden="true" className={SHOWCASE_BAR_TRACK_CLASS}>
                  <span className={SHOWCASE_BAR_INDICATOR_CLASS} style={indicatorStyle} />
                </div>

                <ul
                  role="listbox"
                  aria-label="Categorías"
                  aria-activedescendant={`cat-${activeCategory.id}`}
                  className={SHOWCASE_CATEGORY_LIST_CLASS}
                >
                  {FEATURED_CATEGORIES.map((cat, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <li key={cat.id} className="flex items-center justify-center">
                        <button
                          id={`cat-${cat.id}`}
                          role="option"
                          aria-selected={isActive}
                          type="button"
                          onClick={() => goCategory(idx)}
                          className={cn(
                            SHOWCASE_CATEGORY_ITEM_BASE,
                            "min-h-[44px] px-[10px] md:px-[14px] w-full md:w-auto justify-start",
                          )}
                        >
                          <span
                            className={cn(
                              SHOWCASE_CATEGORY_ITEM_TEXT_BASE,
                              isActive
                                ? "font-extrabold opacity-100 tracking-[0.02em]"
                                : "font-medium opacity-[0.60] hover:opacity-[0.80]",
                            )}
                          >
                            {cat.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className={SHOWCASE_RIGHT_COL_CLASS}>
              <header className={FEATURED_CATEGORIES_HEAD_CLASS}>
                <h2 id={hId} className={FEATURED_CATEGORIES_HEADING_CLASS}>
                  {FEATURED_CATEGORIES_HEADING}
                </h2>
                <p className={FEATURED_CATEGORIES_SUBHEADING_CLASS}>
                  {FEATURED_CATEGORIES_SUBHEADING}
                </p>
              </header>

              <div key="info-panel" style={infoStyle} className={cn(SHOWCASE_INFO_WRAP_CLASS)}>
                <h3 className={SHOWCASE_INFO_TITLE_CLASS}>{activeCategory.title}</h3>
                <p className={SHOWCASE_INFO_DESC_CLASS}>{activeCategory.description}</p>
                <button
                  type="button"
                  onClick={() => openMenuModal(activeCategory)}
                  className={cn("group", SHOWCASE_INFO_CTA_CLASS, "min-h-[44px]")}
                  aria-label={`${activeCategory.ctaText} · categoría ${activeCategory.title}`}
                >
                  <span>{activeCategory.ctaText}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={SHOWCASE_INFO_CTA_ARROW}
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </EditorialContainer>

      {menuModalState.isOpen && (
        <CategoryMenuModal
          category={menuModalState.category}
          open={menuModalState.isOpen}
          onClose={closeMenuModal}
        />
      )}
    </section>
  );
}
