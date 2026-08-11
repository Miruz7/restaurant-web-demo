/**
 * StorytellingSceneShell.tsx
 *
 * Sprint 12.0.1 — 100vh EXACTO.
 *   - NUNCA min-height. NUNCA auto. NUNCA fit-content.
 *   - Solo h-[100vh] overflow: hidden (SceneShell clips interior sobrante para
 *     garantizar 1 solo viewport visible sin scroll real).
 *   - NO inner scroll. El contenido debe caber.
 *
 * Sprint 12.7.B — Cinematic Scene Transition.
 *   - INTERIOR WRAPPER `div.cinematic-scene-inner` recibe estados cinematográficos.
 *   - NO se toca la <section> exterior: id, className, data-storytelling-scene
 *     siguen siendo propiedad de StorytellingStack.
 *   - El blur cinematográfico y el opacity se aplican exclusivamente al hijo.
 */

import { type ReactElement } from "react";
import { cn } from "@/lib/cn";
import { STORYTELLING_SCENE_CLASS } from "./StorytellingNavigation.config";
import type { StorytellingSceneShellProps } from "./StorytellingNavigation.types";
import { useCinematicScene } from "./CinematicScene.context";
import { CINEMATIC_STATE } from "./CinematicScene.config";

function StorytellingSceneShell({
  id,
  className,
  children,
  index,
}: StorytellingSceneShellProps): ReactElement {
  const { getSceneState } = useCinematicScene();
  const state = typeof index === "number" ? getSceneState(index) : CINEMATIC_STATE.IDLE;

  return (
    <section
      id={id}
      data-storytelling-scene="true"
      className={cn(STORYTELLING_SCENE_CLASS, className)}
    >
      <div
        className="cinematic-scene-inner"
        data-cinematic-state={state}
        data-cinematic-scene-index={typeof index === "number" ? index : undefined}
      >
        {children}
      </div>
    </section>
  );
}

export default StorytellingSceneShell;
