---
"@muen/eva": minor
---

Add `LockButton` (+ the bare `LockGlyph`): a lock that opens when pressed.

lucide's Lock split into its two parts, so the shackle can move: the body stays still and the shackle swings about
its **right foot** to 35°, lifting the free end off the body on the left. One transition on two elements rather than
a second icon swapped in — a swap cannot show which way the lock went, and at 16px the motion is the whole message.

`aria-pressed` carries the state (locked = pressed), the accessible name is the **action** — "Unlock" when shut,
"Lock" when open — and the component is controlled: it reports `onLockedChange` and never flips itself.
