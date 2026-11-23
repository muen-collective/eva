---
"@muen/eva": minor
---

Card states for the Muen theme: `data-state="selected"`, `data-state="disabled"`, and `--card-shadow-hover`.

Hover and focus are transient and stay with the browser; selection and disability are persistent facts about the
card, so the surface sets them with a `data-state`. The theme owns the material: selected takes the plate and an
inset hairline instead of a border, so the box never moves between states; disabled is the same card at half
weight with no pointer. `--card-shadow-hover` names the pool the `:hover` rule already drew, so the state map can
point at one value instead of copying it.

The story is `EVA/Foundations/Card states`: all four side by side, the second one live on hover. The same
contract is what `NervCard` sets from a `state` prop in the consuming app.
