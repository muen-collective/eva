import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "../../lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * A small state plate on the face's corner. The caller supplies the colour token — `bg-destructive` for
 * at-limit, never a raw hue — because what a badge *means* belongs to the screen; this owns only its
 * shape and that it reads against the surface behind it (`ring-background`).
 */
function AvatarBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn(
        "absolute right-0 bottom-0 z-10 size-2 rounded-full ring-2 ring-background",
        className
      )}
      {...props}
    />
  )
}

/**
 * Faces touching, not spaced: `-space-x-2` is the whole point of a group — it says "these belong to one
 * board" in the way a row of separated circles cannot.
 */
function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="avatar-group"
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    />
  )
}

/** The folded remainder: "+3", styled as a face so it sits in the same rhythm rather than beside it. */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted font-mono text-[9px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
