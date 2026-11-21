import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * The node's resize affordance: a quarter arc outside the bottom-right corner,
 * concentric with the card radius and 4px clear of it. It is presentational — the
 * canvas owns the pointer handling and the min/max width.
 */
function ResizeGrip({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="resize-grip"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -right-1 -bottom-1 size-6 text-foreground/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
        className
      )}
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-full overflow-visible">
        <path
          d="M24 0A24 24 0 0 1 0 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export { ResizeGrip }
