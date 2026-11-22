import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"

export type StripView = {
  /** A stable id; falls back to the label. */
  id?: string
  /** The camera view: front, side, back, detail. */
  label: string
  src: string
  approved?: boolean
}

/**
 * The view strip — the look's views as thumbnails, one selected.
 *
 * It is a tablist: arrows move through the views (Left/Right, Home/End), and the selected view is
 * the one the stage draws. An approved view marks itself with a check; the strip never approves by
 * itself — approval is a separate switch.
 */
function ViewStrip({
  views,
  value,
  onValueChange,
  ariaLabel = "Views",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  views: StripView[]
  value: number
  onValueChange?: (index: number) => void
  ariaLabel?: string
}) {
  const buttons = React.useRef<Array<HTMLButtonElement | null>>([])

  const select = (index: number) => {
    if (index < 0 || index >= views.length) return
    onValueChange?.(index)
    buttons.current[index]?.focus()
  }

  return (
    <div
      data-slot="view-strip"
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex gap-1", className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") select(value - 1)
        else if (event.key === "ArrowRight") select(value + 1)
        else if (event.key === "Home") select(0)
        else if (event.key === "End") select(views.length - 1)
        else return
        event.preventDefault()
      }}
      {...props}
    >
      {views.map((view, index) => {
        const selected = index === value
        return (
          <Button
            key={view.id ?? `${view.label}-${index}`}
            ref={(node) => {
              buttons.current[index] = node
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            variant="ghost"
            onClick={() => onValueChange?.(index)}
            className={cn(
              "relative h-16 flex-1 overflow-hidden rounded-md border p-0 hover:bg-transparent",
              selected ? "border-foreground" : "border-border"
            )}
            aria-label={`${view.label}${view.approved ? ", approved" : ""}`}
          >
            <img src={view.src} alt="" className="size-full object-cover" draggable={false} />
            <span className="absolute inset-x-0 bottom-0 truncate bg-background/75 px-1 py-0.5 text-center text-[10px] text-muted-foreground">
              {view.label}
            </span>
            {view.approved ? (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-foreground text-background">
                <Check className="size-3" strokeWidth={3} />
              </span>
            ) : null}
          </Button>
        )
      })}
    </div>
  )
}

export { ViewStrip }
