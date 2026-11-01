# @muen/eva

## 0.6.0

### Minor Changes

- 921d900: Add `Accordion` (Radix) and `Field` (label, description, error, group, legend, separator).

  Both were the gap that kept muen-site off the kit: it carries local `accordion.tsx` and `field.tsx`, so
  adopting EVA would have meant losing them. They are shadcn's compositions on EVA tokens — no forks — and
  `Field` is what makes an invalid input state legible in the field's own space instead of a toast.

- 59d3dac: Add `Breadcrumb` (shadcn's composition, on EVA tokens).

  The separator is a `children` slot, so a surface can use the house schema — a slash, not the default
  chevron: `Home / Ralph Lauren / Moodboards / Quiet Utility`. The last crumb is `BreadcrumbPage`, which is
  `aria-current="page"` and unlinked, so assistive tech announces the location instead of offering to
  navigate to it again.

- 2014eff: Add `DatePicker` and its two primitives: `Popover` (Radix) and `Calendar` (react-day-picker v9).

  `DatePicker` is the shadcn composition — Popover + Calendar + Button — translated to this kit's
  idioms: Radix `asChild` instead of Base UI's `render`, ISO `yyyy-mm-dd` strings instead of `Date`
  (every date in a Brand OS is a Postgres `date`), a hidden input when `name` is given so a server action
  form posts it with no client state, and `disabled` days for lead-time constraints.

  **Token change in the Muen theme (same release):** the theme had `--accent`, `--ring` and `--info` set
  to the purple `#765898`. The founder's correction: Muen has no brand accent hue — _"there is no purple
  color, the primary color is ink."_ So `--ring` and `--info` are now ink (`#0a0a0a`), and `--accent`
  returns to its meaning in the primitives — a subtle **selection surface** (`#f4f4f5`), because
  dropdown-menu and select paint `focus:bg-accent`. Emphasis is `--primary` / `--foreground`, both ink.

  Consumers using `text-accent` or `border-accent` as a brand colour must move to
  `text-foreground` / `border-foreground`.

- 4814581: Themes move into the kit: `muen` reconciled, `hand-me-up` and `brandos` added.

  `themes/muen.css` was one of two divergent copies — the kit's original block and the fuller set measured for
  the BrandOS × EVA demo. The fuller set wins, and the block now defines every token the contract declares,
  including a dark mode. An incomplete theme is the same class of bug as the purple was: a token the theme
  omits falls back to the kit's dark default, so a sidebar, a chart or a tertiary sits in the wrong palette
  while nothing errors.

  `themes/hand-me-up.css` and `themes/brandos.css` were living in the design lab because the lab vendored the
  kit. They are values-only themes and belong here, once.

  `exports` now maps `./themes/*.css` instead of naming only `themes/muen.css` — the map is a whitelist, so a
  consumer importing an unnamed theme file would not resolve at all.
