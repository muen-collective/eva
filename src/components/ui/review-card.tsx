import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"

/**
 * A look, as the review's card: a 3:4 cover with the look number on it, the name under it, then the
 * approval line (`approved 2/4`, a check at full) and the model. The card is one target — the button
 * — and it carries no switch; approval belongs to the stage.
 */
function ReviewCard({
  src,
  alt = "",
  number,
  title,
  approved,
  total,
  meta,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  src: string
  alt?: string
  /** The look's number, shown on the cover as `look 001`. */
  number: string | number
  title: string
  approved: number
  total: number
  /** The model line, e.g. `model Ayame`. */
  meta?: React.ReactNode
}) {
  const full = total > 0 && approved === total
  return (
    <Button
      data-slot="review-card"
      type="button"
      variant="outline"
      className={cn(
        "h-auto w-full flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left",
        className
      )}
      {...props}
    >
      <span className="relative block aspect-[3/4] overflow-hidden bg-muted">
        <img src={src} alt={alt} className="size-full object-cover" loading="lazy" draggable={false} />
        <span className="absolute bottom-1.5 left-1.5 rounded bg-background/80 px-1.5 py-0.5 text-[11px] text-muted-foreground backdrop-blur">
          look {number}
        </span>
      </span>
      <span className="flex min-w-0 flex-col gap-0.5 px-2 py-2">
        <span className="truncate text-sm font-medium text-foreground">{title}</span>
        <span
          className={cn(
            "flex items-center gap-1 text-xs",
            full ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
          approved {approved}/{total}
          {full ? <Check className="size-3" strokeWidth={2.4} aria-hidden /> : null}
        </span>
        {meta ? <span className="truncate text-xs text-muted-foreground">{meta}</span> : null}
      </span>
    </Button>
  )
}

export { ReviewCard }
