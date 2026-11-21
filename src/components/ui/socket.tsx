import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * A socket is a solid dot on a card's edge. It is not a button and carries no
 * interaction: the wire is the action. Images are blue, text is green, and the
 * noodle leaving the socket must use the same colour.
 *
 * `data-kind` is also written as an attribute so a plain-CSS surface can colour
 * the dot without importing React.
 */
function Socket({
  kind = "media",
  className,
  ...props
}: React.ComponentProps<"span"> & { kind?: "media" | "text" }) {
  return (
    <span
      data-slot="socket"
      data-kind={kind}
      className={cn(
        "inline-block size-2 shrink-0 rounded-full ring-2 ring-[var(--card)]",
        kind === "media" ? "bg-[var(--socket-media)]" : "bg-[var(--socket-text)]",
        className
      )}
      {...props}
    />
  )
}

export { Socket }
