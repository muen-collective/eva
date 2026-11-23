---
"@muen/eva": minor
---

Add `Slider` — shadcn’s Radix slider in the kit’s tokens: a muted track, an ink range and thumb, a ring focus, one thumb for a value and two for a range. `aria-label` / `aria-labelledby` are forwarded to the thumb, which is the element with `role="slider"`. Tests cover bounds, arrow-key stepping, ranges and disabled; the story covers the hard states (range, vertical, disabled, narrow). Also adds a jsdom `ResizeObserver` no-op to the vitest setup, because Radix’s size hook asks for one.
