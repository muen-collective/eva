# Contributing to EVA

EVA is the shared kit for every Muen surface — Mitsumeru's panes, and every Brand OS app. The point of
it is that a Brand OS app never hand-rolls a button: it composes primitives and changes token values.

## The one rule

**New components are built from shadcn primitives.** Not from scratch, not from a screenshot. The
primitives (Radix behaviour + shadcn's `cva` structure) are the floor; EVA adds the token layer and the
theme material on top. A component that reimplements focus management, keyboard navigation or ARIA to
get a look is rejected — fix the look with tokens instead.

If a new look needs a block that doesn't exist, **build the block** — never shave an existing component
down to fit (the Lego rule in the design-system contract).

## Adding a component

1. **Start from the primitive.** Copy the shadcn component you're extending, or compose the EVA
   primitives already here (`button`, `card`, `badge`, `input`, `separator`, …).
2. **No hex literals.** Every colour, radius and space is a token (`bg-primary`, `text-muted-foreground`,
   `rounded-lg`). If the value you need has no token, add the token — a raw value in a component is the
   defect the whole kit exists to prevent.
3. **Variants, not forks.** Use `cva` with named variants (`variant`, `size`, `tone`). A one-off style
   passed by a caller belongs in a `className`, not in the component's source.
4. **A story, with the hard states.** `src/stories/<Name>.stories.tsx` — default, disabled, loading,
   error, long text, narrow container. Storybook is the living canvas: if it isn't there, it isn't part
   of the system.
5. **A test.** `src/__tests__/` — behaviour (keyboard, focus, ARIA), not snapshots of class strings.
6. **A changeset.** `npm run changeset` — `patch` for a fix, `minor` for a new component or variant,
   `major` for a token rename. Names outlive brands; a rename is always major, with a migration note.
7. **Codify it.** Add the component's API table to the README (or the consuming project's `DESIGN.md`)
   in the same PR. Documentation that lands later never lands.

## Theming

A brand theme is a block of **values** for the existing token names — see `themes/muen.css`. Never
override a token name to mean something new, and never ship a theme that changes a component's markup.

The one semantic every theme keeps: **red is destructive** (`--destructive` — blocked, failed, pending).
An action is `--primary`, which most brands set to ink.

## Checks before a PR

```sh
npm i
npm run build          # tsup: ESM + CJS + d.ts
npm run typecheck      # tsc --noEmit
npm test               # vitest
npm run storybook      # look at it — including dark, light and the brand theme
```

A component story that fails Storybook's a11y gate does not ship.

## Release

Main is the published state for git consumers (`github:muen-collective/eva`). Tags (`v0.1.0`) are cut
from a green main. npm publication is not set up yet; when it is, it will publish the same tree to
`@muen/eva` with no source change.
