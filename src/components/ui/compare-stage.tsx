import * as React from "react"

import { cn } from "../../lib/utils"
import { Button } from "./button"

export type CompareMode = "wipe" | "split"
export type CompareFit = "fit" | "fill"

/**
 * Before/after compare stage — the review's one photograph, two ways.
 *
 * Wipe draws the "before" under the "after" and clips the after at a handle; split shows the two
 * frames side by side. Both share one fit: `fit` contains, `fill` covers. The stage is the slider in
 * wipe mode: role="slider", arrows move the handle, Home/End go to the edges.
 *
 * The component owns its controls (a mode button and two fit buttons) but a caller may control
 * `mode` / `fit`; when it does, `onModeChange` / `onFitChange` are the writes.
 */
function CompareStage({
  before,
  after,
  beforeLabel = "before",
  afterLabel = "after",
  alt = "",
  mode: modeProp,
  defaultMode = "wipe",
  onModeChange,
  fit: fitProp,
  defaultFit = "fit",
  onFitChange,
  className,
  stageClassName,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  alt?: string
  mode?: CompareMode
  defaultMode?: CompareMode
  onModeChange?: (mode: CompareMode) => void
  fit?: CompareFit
  defaultFit?: CompareFit
  onFitChange?: (fit: CompareFit) => void
  stageClassName?: string
}) {
  const [modeState, setModeState] = React.useState<CompareMode>(defaultMode)
  const [fitState, setFitState] = React.useState<CompareFit>(defaultFit)
  const [wipe, setWipe] = React.useState(0.5)
  const stage = React.useRef<HTMLDivElement | null>(null)

  const mode = modeProp ?? modeState
  const fit = fitProp ?? fitState

  const setMode = (next: CompareMode) => {
    if (modeProp === undefined) setModeState(next)
    onModeChange?.(next)
  }
  const setFit = (next: CompareFit) => {
    if (fitProp === undefined) setFitState(next)
    onFitChange?.(next)
  }

  const moveWipe = (clientX: number) => {
    const box = stage.current?.getBoundingClientRect()
    if (!box?.width) return
    setWipe(Math.min(1, Math.max(0, (clientX - box.left) / box.width)))
  }

  const imageFit = fit === "fit" ? "object-contain" : "object-cover"

  return (
    <div data-slot="compare-stage" className={cn("flex min-h-0 flex-col gap-2", className)} {...props}>
      <div
        ref={stage}
        role={mode === "wipe" ? "slider" : undefined}
        aria-label={mode === "wipe" ? "Before and after wipe" : undefined}
        aria-valuemin={mode === "wipe" ? 0 : undefined}
        aria-valuemax={mode === "wipe" ? 100 : undefined}
        aria-valuenow={mode === "wipe" ? Math.round(wipe * 100) : undefined}
        tabIndex={mode === "wipe" ? 0 : undefined}
        className={cn(
          "relative min-h-0 flex-1 overflow-hidden rounded-lg bg-muted outline-none",
          "focus-visible:ring-3 focus-visible:ring-ring",
          mode === "wipe" && "cursor-ew-resize touch-none",
          stageClassName
        )}
        onPointerDown={(event) => {
          if (mode !== "wipe") return
          moveWipe(event.clientX)
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (mode !== "wipe" || !(event.buttons & 1)) return
          moveWipe(event.clientX)
        }}
        onKeyDown={(event) => {
          if (mode !== "wipe") return
          const step = event.shiftKey ? 0.1 : 0.04
          if (event.key === "ArrowLeft") setWipe((value) => Math.max(0, value - step))
          else if (event.key === "ArrowRight") setWipe((value) => Math.min(1, value + step))
          else if (event.key === "Home") setWipe(0)
          else if (event.key === "End") setWipe(1)
          else return
          event.preventDefault()
        }}
      >
        {mode === "wipe" ? (
          <>
            <img src={before} alt={alt} className={cn("absolute inset-0 size-full", imageFit)} draggable={false} />
            <img
              src={after}
              alt={alt}
              className={cn("absolute inset-0 size-full", imageFit)}
              style={{ clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)` }}
              draggable={false}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-px bg-background/90"
              style={{ left: `${wipe * 100}%` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-sm"
              style={{ left: `${wipe * 100}%` }}
            >
              <span className="text-[11px]">↔</span>
            </span>
          </>
        ) : (
          <div className="absolute inset-0 grid grid-cols-2 gap-px bg-border">
            {[
              { src: before, label: beforeLabel },
              { src: after, label: afterLabel },
            ].map((frame) => (
              <figure key={frame.label} className="relative m-0 overflow-hidden bg-muted">
                <img src={frame.src} alt={alt} className={cn("size-full", imageFit)} draggable={false} />
                <figcaption className="absolute bottom-2 left-2 rounded bg-foreground/50 px-1.5 py-0.5 text-[10px] text-background">
                  {frame.label}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-none items-center gap-1.5">
        <Button type="button" size="xs" variant="outline" onClick={() => setMode(mode === "wipe" ? "split" : "wipe")}>
          {mode === "wipe" ? "side by side" : "wipe"}
        </Button>
        <Button type="button" size="xs" variant={fit === "fit" ? "default" : "outline"} onClick={() => setFit("fit")}>
          fit
        </Button>
        <Button type="button" size="xs" variant={fit === "fill" ? "default" : "outline"} onClick={() => setFit("fill")}>
          fill
        </Button>
      </div>
    </div>
  )
}

export { CompareStage }
