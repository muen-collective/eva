---
"@muen/eva": minor
---

Add `Avatar` (+ `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`).

The board header needed people, and the kit had no way to show them. Radix's Avatar for the load/fallback
behaviour; shadcn's structure for everything else.

Two decisions that make it a NERV primitive rather than a stock port:

· **the fallback is the default face, not a loading placeholder.** Nobody has uploaded a picture, so initials
  carry identity — `bg-muted text-muted-foreground`, and callers pass their own mono size.
· **a badge means at-limit, never online-presence.** The component owns only the shape (a corner plate ringed
  against whatever sits behind it); the caller supplies the colour token, because what a badge *means* belongs
  to the screen. Presence is a chat fact; on a board the one thing worth painting on a face is that its queue
  is full.

`AvatarGroup` touches the faces (`-space-x-2`) — separated circles cannot say "these belong to one board" —
and `AvatarGroupCount` folds the remainder as a face-shaped "+3" so it sits in the same rhythm instead of
beside it.
