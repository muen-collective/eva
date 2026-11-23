---
"@muen/eva": minor
---

Toast: a result said at the edge of the screen.

`<Toast>` is self-contained — provider, root and viewport — so a screen writes one line. Radix supplies
focus, swipe-to-dismiss and the labelled region; the look is tokens only, with feedback colour in the
border and neutral text, per the design contract. The parts (`ToastProvider`, `ToastViewport`,
`ToastRoot`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`) are exported for a consumer
that wants its own placement.
