# @muen/eva — EVA design system

Shadcn-style React 18/19 primitives on [Radix](https://www.radix-ui.com/) + Dark EVA theme
tokens. **EVA is the design system; Mitsu is the product — the names are deliberately separate.**

## Why "EVA"

The palette is derived from **Neon Genesis Evangelion**:
- **Dark EVA = Shinji** (the default theme — deep, cool darkness)
- **Light EVA = Rei** (the alternate theme — clean, pale light)

Dark EVA Unit 01 is the default (first login); Light EVA (Unit 00) is the light mode. Not an
acronym — an homage.

## Where it lives

**`github.com/muen-collective/eva`** — its own public repo, consumed by Brand OS apps and by
Mitsumeru. History: sourced from `mitsu-ui`, renamed `@muen/eva`, made **React 18-compatible**
(peer range `^18.2.0 || ^19.0.0`) because the DSH client is React 18.3.1. See `VENDOR.md` for
provenance.

```sh
npm i github:muen-collective/eva          # latest main
npm i github:muen-collective/eva#v0.1.0   # a tag, once cut
```

`dist/` is gitignored, so the package carries a `prepare` script and npm builds it on install from
git. A dependency install therefore needs the dev dependencies available — npm provides them for git
dependencies, a plain `npm i --omit=dev` does not.

## Requirements

- React 18.2+ or 19
- Tailwind CSS v4 (CSS-first configuration)
- [`radix-ui`](https://www.npmjs.com/package/radix-ui) (single package, ^1.6.7) and
  `lucide-react` as peer dependencies

## Usage

```bash
npm install @muen/eva        # or consume via workspace path
```

Import the theme tokens in your Tailwind entry CSS **before** your own tokens:

```css
@import "tailwindcss";
@import "@muen/eva/theme.css"; /* Dark EVA tokens */
```

```tsx
import { Button, Dialog, Switch } from "@muen/eva"

<Button variant="secondary">Save</Button>
<Switch aria-label="enable" />
```

Fonts (`Satoshi` / `JetBrains Mono`) are the app's responsibility — token stacks fall back to
system fonts when not loaded. Optional: `tw-animate-css` for `animate-in/out` classes.

## Themes

The token *names* are stable; the values are per theme. A theme is a block of values — never a fork
of the components.

| Theme | Apply | Character |
|---|---|---|
| **Dark EVA (Unit 01)** | default (`:root`) | The kit's first theme — dark, cool |
| **Light EVA (Unit 00)** | `.light` on a wrapper | The pale counterpart |
| **Muen** | `data-eva-theme="muen"` | Kept in step with muencollective.com: the wall (#f6f6f6) as the page **and** the card, the OrbAI card material (seven stacked shadows + a 3px white inset + an inner top stroke), a debossed media well, ink actions, purple accent, the embossed button. Import `@muen/eva/themes/muen.css` after `theme.css`. |

```css
@import "@muen/eva/theme.css";
@import "@muen/eva/themes/muen.css";   /* only if you use the Muen theme */
```

The Muen material is classes on plain elements, so it applies to any markup rather than only to our
primitives:

```html
<div class="eva-card">
  <div class="eva-card-media" data-shaped="portrait">…</div>
  …
</div>
<button class="eva-embossed" data-fill="ink">Run</button>
```

`.eva-plate` still exists for flat utility surfaces; new cards use `.eva-card`.

**The Muen rule that outranks taste:** red is status — blocked, failed, pending — and never an
action. The primary action is ink.

## Components (19 primitives)

| Category | Components |
| --- | --- |
| Overlay | Dialog, AlertDialog, Sheet, DropdownMenu |
| Selection | Tabs, Select, Switch |
| Forms | Input, Textarea, Label |
| Layout | Card, Separator, ScrollArea, Table, Collapsible |
| Feedback | Alert, Badge, Skeleton |

Plus `Button` and `cn()` / `buttonVariants` / `badgeVariants` / `tabsListVariants`.

## Design tokens

Dark EVA is the default theme (canonical in `theme.css`, sourced from `DESIGN.md`, frozen
2026-08-11):

- **Neutrals**: oklch surfaces (`--background` `oklch(0.13 0 0)`, `--card` `oklch(0.08 0 0)`, …)
- **EVA brand triad**: `--primary #765898`, `--secondary #52d053`, `--tertiary #c62a3e`
- **Feedback**: `--destructive`, `--success`, `--warning`, `--info`
- **Dataviz**: `--chart-1..10` (first three = brand triad)
- **Elevation**: no shadows in dark scope — border + glow only (`--glow-ring-shadow`)

Rule: never add hex literals in components; always reference tokens.

## Development

```bash
npm install
npm run dev        # tsup watch
npm run typecheck
npm test           # vitest (jsdom)
npm run build      # ESM + CJS + d.ts -> dist/
```

## License

MIT © Thuy Pham
