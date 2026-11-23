# @muen/eva

## 0.7.0

### Minor Changes

- 1cffc25: Add `Avatar` (+ `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`).

  The board header needed people, and the kit had no way to show them. Radix's Avatar for the load/fallback
  behaviour; shadcn's structure for everything else.

  Two decisions that make it a NERV primitive rather than a stock port:

  · **the fallback is the default face, not a loading placeholder.** Nobody has uploaded a picture, so initials
  carry identity — `bg-muted text-muted-foreground`, and callers pass their own mono size.
  · **a badge means at-limit, never online-presence.** The component owns only the shape (a corner plate ringed
  against whatever sits behind it); the caller supplies the colour token, because what a badge _means_ belongs
  to the screen. Presence is a chat fact; on a board the one thing worth painting on a face is that its queue
  is full.

  `AvatarGroup` touches the faces (`-space-x-2`) — separated circles cannot say "these belong to one board" —
  and `AvatarGroupCount` folds the remainder as a face-shaped "+3" so it sits in the same rhythm instead of
  beside it.

- 4708a74: Card states for the Muen theme: `data-state="selected"`, `data-state="disabled"`, and `--card-shadow-hover`.

  Hover and focus are transient and stay with the browser; selection and disability are persistent facts about the
  card, so the surface sets them with a `data-state`. The theme owns the material: selected takes the plate and an
  inset hairline instead of a border, so the box never moves between states; disabled is the same card at half
  weight with no pointer. `--card-shadow-hover` names the pool the `:hover` rule already drew, so the state map can
  point at one value instead of copying it.

  The story is `EVA/Foundations/Card states`: all four side by side, the second one live on hover. The same
  contract is what `NervCard` sets from a `state` prop in the consuming app.

- 7bd9c5c: Add `LockButton` (+ the bare `LockGlyph`): a lock that opens when pressed.

  lucide's Lock split into its two parts, so the shackle can move: the body stays still and the shackle swings about
  its **right foot** to 35°, lifting the free end off the body on the left. One transition on two elements rather than
  a second icon swapped in — a swap cannot show which way the lock went, and at 16px the motion is the whole message.

  `aria-pressed` carries the state (locked = pressed), the accessible name is the **action** — "Unlock" when shut,
  "Lock" when open — and the component is controlled: it reports `onLockedChange` and never flips itself.

- 9df77c0: themes/muen: `--markup` / `--markup-foreground` — the annotation ink.

  Comments and markup are the one layer that sits on a picture and must not hide in it: ink on a photograph is
  invisible, and a hairline cannot be a mark. This is the theme's single chromatic accent, semantic rather than a
  colour name, and it exists for exactly one job — the stroke a markup brush draws and the bubble where a comment
  sits. Chosen with the founder on 2026-11-11 while reviewing the shared board; NERV has carried it app-side since,
  and this release ends that.

- 9cd1443: Add the conversation composites: `Message` (the shadcn message grammar without an avatar — header
  names the speaker), and `Trace` (one line per agent event, with a real disclosure via Collapsible and
  a `status` that is written as well as coloured). The agent loop window is built from these.
- cb1900f: Rename the shared 3D-card shadow token to `--muen-card-shadow`, and drop `--brandos-card-shadow`.

  The card material is a Muen-wide style, not a Brand OS property: Brand OS is one consumer. The card ground stays
  `--card` (the same value as `--background`), so the 3D effect comes from the shadow stack and the white top lip,
  not from a lighter plate. Consumers must switch to the new name; there is no alias.

- 59600c1: Add the canvas resize grip: a concentric quarter arc outside the node's bottom-right corner, 4px clear.
- ffd38e2: Add the review composites: `ReviewCard` (a look's cover, number, name, approved count and model),
  `ViewStrip` (a tablist of views with labels and approval checks), and `CompareStage` (a before/after
  wipe or side-by-side stage with fit/fill, controllable or not). Same anatomy the styling review uses.
- f07668d: Add `Slider` — shadcn’s Radix slider in the kit’s tokens: a muted track, an ink range and thumb, a ring focus, one thumb for a value and two for a range. `aria-label` / `aria-labelledby` are forwarded to the thumb, which is the element with `role="slider"`. Tests cover bounds, arrow-key stepping, ranges and disabled; the story covers the hard states (range, vertical, disabled, narrow). Also adds a jsdom `ResizeObserver` no-op to the vitest setup, because Radix’s size hook asks for one.
- fc92c4d: Add the canvas socket primitive: an 8px solid dot, images blue, text green and video magenta, with a card-ground ring and a same-colour noodle class.
- 27e2c82: Toast: a result said at the edge of the screen.

  `<Toast>` is self-contained — provider, root and viewport — so a screen writes one line. Radix supplies
  focus, swipe-to-dismiss and the labelled region; the look is tokens only, with feedback colour in the
  border and neutral text, per the design contract. The parts (`ToastProvider`, `ToastViewport`,
  `ToastRoot`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`) are exported for a consumer
  that wants its own placement.

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
