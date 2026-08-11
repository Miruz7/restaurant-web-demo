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
import type { FeaturedCategoriesSectionProps } from "./FeaturedCategories.types";

type Phase = "idle" | "fadeOut" | "fadeIn";

const TRANSITION_HALF_MS = 230;
const CATEGORY_COUNT = FEATURED_CATEGORIES.length;

export default function FeaturedCategoriesSection({
  id = DEFAULT_FEATURED_CATEGORIES_ID,
  headingId,
  className,
}: FeaturedCategoriesSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [prevIdx, setPrevIdx] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>("idle");

  const transitionTimerRef = useRef<number | null>(null);
  const hId = headingId ?? `${id}-heading`;
  const activeCategory = FEATURED_CATEGORIES[activeIdx];
  const prevCategory = FEATURED_CATEGORIES[prevIdx];

  const goCategory = useCallback(
    (nextIdx: number) => {
      if (nextIdx === activeIdx) return;
      if (phase !== "idle") return;
      if (nextIdx < 0 || nextIdx >= CATEGORY_COUNT) return;

      setPrevIdx(activeIdx);
      setPhase("fadeOut");

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setActiveIdx(nextIdx);
        setPhase("fadeIn");
        transitionTimerRef.current = window.setTimeout(() => {
          setPhase("idle");
          transitionTimerRef.current = null;
        }, TRANSITION_HALF_MS);
      }, TRANSITION_HALF_MS);
    },
    [activeIdx, phase],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
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

  const bgFromStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties =
      phase === "fadeOut"
        ? { opacity: 1, filter: "blur(0px)", zIndex: 0 }
        : { opacity: 0, filter: "blur(10px)", zIndex: 0 };
    if (prevCategory.image.objectPosition) {
      style.objectPosition = prevCategory.image.objectPosition;
    }
    return style;
  }, [phase, prevCategory.image.objectPosition]);

  const bgToStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties =
      phase === "fadeOut"
        ? { opacity: 0, filter: "blur(10px)", zIndex: 1 }
        : { opacity: 1, filter: "blur(0px)", zIndex: 1 };
    if (activeCategory.image.objectPosition) {
      style.objectPosition = activeCategory.image.objectPosition;
    }
    return style;
  }, [phase, activeCategory.image.objectPosition]);

  const indicatorStyle = useMemo<CSSProperties>(() => {
    return { transform: `translateY(${activeIdx * 100}%)` };
  }, [activeIdx]);

  const infoStyle = useMemo<CSSProperties>(() => {
    if (phase === "fadeOut") return { opacity: 0, transform: "translateY(-4px)" };
    return { opacity: 1, transform: "translateY(0px)" };
  }, [phase]);

  return (
    <section
      id={id}
      className={cn(getFeaturedCategoriesSectionClasses(), className)}
      aria-labelledby={hId}
      tabIndex={-1}
    >
      <img
        key={`bg-from-${prevCategory.id}`}
        src={prevCategory.image.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        width={prevCategory.image.width}
        height={prevCategory.image.height}
        loading={prevIdx === activeIdx ? "eager" : "lazy"}
        decoding="async"
        className={cn(SHOWCASE_BG_LAYER_COMMON, SHOWCASE_BG_TRANSITION_CLASS)}
        style={bgFromStyle}
      />
      <img
        key={`bg-to-${activeCategory.id}`}
        src={activeCategory.image.src}
        alt={`Categoría ${activeCategory.title}`}
        aria-hidden="false"
        draggable={false}
        width={activeCategory.image.width}
        height={activeCategory.image.height}
        loading="eager"
        decoding="async"
        className={cn(SHOWCASE_BG_LAYER_COMMON, SHOWCASE_BG_TRANSITION_CLASS)}
        style={bgToStyle}
      />
      <div aria-hidden="true" className={SHOWCASE_OVERLAY_CLASS} />

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

              <div
                key={`info-${activeCategory.id}`}
                style={infoStyle}
                className={cn(SHOWCASE_INFO_WRAP_CLASS)}
              >
                <h3 className={SHOWCASE_INFO_TITLE_CLASS}>{activeCategory.title}</h3>
                <p className={SHOWCASE_INFO_DESC_CLASS}>{activeCategory.description}</p>
                <a
                  href={activeCategory.href}
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </EditorialContainer>
    </section>
  );
}
