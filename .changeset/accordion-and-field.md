---
"@muen/eva": minor
---

Add `Accordion` (Radix) and `Field` (label, description, error, group, legend, separator).

Both were the gap that kept muen-site off the kit: it carries local `accordion.tsx` and `field.tsx`, so
adopting EVA would have meant losing them. They are shadcn's compositions on EVA tokens — no forks — and
`Field` is what makes an invalid input state legible in the field's own space instead of a toast.
