---
"@muen/eva": minor
---

Themes move into the kit: `muen` reconciled, `hand-me-up` and `brandos` added.

`themes/muen.css` was one of two divergent copies — the kit's original block and the fuller set measured for
the BrandOS × EVA demo. The fuller set wins, and the block now defines every token the contract declares,
including a dark mode. An incomplete theme is the same class of bug as the purple was: a token the theme
omits falls back to the kit's dark default, so a sidebar, a chart or a tertiary sits in the wrong palette
while nothing errors.

`themes/hand-me-up.css` and `themes/brandos.css` were living in the design lab because the lab vendored the
kit. They are values-only themes and belong here, once.

`exports` now maps `./themes/*.css` instead of naming only `themes/muen.css` — the map is a whitelist, so a
consumer importing an unnamed theme file would not resolve at all.
