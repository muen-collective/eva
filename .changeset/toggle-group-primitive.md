---
"@muen/eva": minor
---

Add `Toggle` and `ToggleGroup`: a button with a pressed state, and a set of them as one control.

Built from shadcn's structure on Radix's behaviour, so the ARIA is the primitive's and not the app's: single mode
is a radio group (one filter chosen), multiple mode is a pressed-button group. The pressed state is **ink**, not
`--accent` — in this kit `--accent` is a pale selection surface for hovered rows, and a filter that is on must read
as a decision rather than a hover.

`ToggleGroup` passes its `variant` and `size` down to its items through context, so a group's items cannot disagree
about their weight; `variant="outline"` seams the items into a single bordered control.
