# @muen/eva

## 0.7.0

### Minor Changes

- 7bd9c5c: Add `LockButton` (+ the bare `LockGlyph`): a lock that opens when pressed.

  lucide's Lock split into its two parts, so the shackle can move: the body stays still and the shackle swings about
  its **right foot** to 35°, lifting the free end off the body on the left. One transition on two elements rather than
  a second icon swapped in — a swap cannot show which way the lock went, and at 16px the motion is the whole message.

  `aria-pressed` carries the state (locked = pressed), the accessible name is the **action** — "Unlock" when shut,
  "Lock" when open — and the component is controlled: it reports `onLockedChange` and never flips itself.

- 7d0b3bb: Add `Toggle` and `ToggleGroup`: a button with a pressed state, and a set of them as one control.

  Built from shadcn's structure on Radix's behaviour, so the ARIA is the primitive's and not the app's: single mode
  is a radio group (one filter chosen), multiple mode is a pressed-button group. The pressed state is **ink**, not
  `--accent` — in this kit `--accent` is a pale selection surface for hovered rows, and a filter that is on must read
  as a decision rather than a hover.

  `ToggleGroup` passes its `variant`, `size`, `spacing` and `orientation` down to its items through context, so a
  group's items cannot disagree about their weight. Items are **separate buttons by default** (`spacing={2}`, matching
  shadcn's current default); `spacing={0}` seams them into a single segmented control for a mode switch.

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
