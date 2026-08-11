/**
 * Barrel público de la feature StorytellingNavigation (Sprint 12.0.1).
 * Viewport Engine + Scene Lock Real.
 */

export { default, default as StorytellingRoot } from "./StorytellingRoot";
export { default as StorytellingSceneShell } from "./StorytellingSceneShell";
export { StorytellingNavigatorProvider, useStorytellingNavigator } from "./StorytellingNavigator";
export type {
  StorytellingNavigatorAPI,
  StorytellingRootProps,
  StorytellingSceneShellProps,
} from "./StorytellingNavigation.types";
export {
  STORYTELLING_BEZIER,
  STORYTELLING_BEZIER_CSS,
  STORYTELLING_LOCK_DEBOUNCE_MS,
  STORYTELLING_TRANSITION_MS,
  STORYTELLING_TRANSITION_S,
  STORYTELLING_VIEWPORT_CLASS,
  STORYTELLING_STACK_CLASS,
  STORYTELLING_SCENE_CLASS,
  STORYTELLING_HARD_LOCK_SCROLL_CSS,
  STORYTELLING_TOUCH_SWIPE_THRESHOLD,
  STORYTELLING_WHEEL_THRESHOLD,
  cubicBezierEase,
} from "./StorytellingNavigation.config";
