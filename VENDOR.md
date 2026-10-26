# VENDOR — mitsu-ui → @muen/eva (EVA design system)

**Vendored from:** `~/.kun/mitsu-ui` (local package, upstream `github.com/muen-collective/mitsu-ui`)
**Original:** `mitsu-ui@0.0.0` — shadcn-style React 19 primitives on Radix 1.6.7 + Dark EVA tokens
**This copy:** `@muen/eva@0.1.0` — vendored into the mitsu repo, **React 18-compatible**

## Why vendored here (decision 2026-08-26)

Design-system-first saves time. Before any plugin re-skin (dsh-file-explorer Level 2), the
primitives must be consumable by the DSH client — which runs **React 18.3.1**. The original
`mitsu-ui` was React 19-only and unpublished (0.0.0, no remote), so it could not be consumed by
a plugin bundle.

## What changed from upstream

1. **Name:** `mitsu-ui` → `@muen/eva`
2. **React peer range:** `^19.0.0` → `^18.2.0 || ^19.0.0` (and the matching devDeps
   `@types/react@^18.3.0`)
3. **Verified under React 18.3.1:** `tsup` build (ESM + CJS + dts) ✓, `tsc --noEmit` ✓,
   10/10 vitest ✓. No React 19-only APIs in src (scanned: useActionState/useOptimistic/
   useFormStatus/createRoot — none used).
4. `dist/` and `node_modules/` are gitignored (build artifact; rebuild with `npm i && npm run build`).

## Update discipline

- Vendored as **source, not dependency** (same rule as claire-ai → Mitsu and the
  dsh-file-explorer fork): upstream changes are pulled by re-applying the diff, never a live
  dependency.
- Keep the React 18/19 dual peer range — the DSH client is 18; a future Electron/web client
  may move to 19. Do not narrow it back without a harness-wide React upgrade.
- `theme.css` ships at `@muen/eva/theme.css` — the EVA tokens plugins import.

## Consumed by

- `plugins/dsh-file-explorer/` (Level 2 re-skin — next: swap `fe-*` controls for these
  primitives)
- Future: `plugins/mitsu-*` (if retained), R4 starter-pack settings, R2 asset panel

## Pinning (epic 67 T2, 2026-09-28)

**Pin status: DEFERRED — there is nothing to pin to yet.** The source checkout (`~/.kun/mitsu-ui`)
has no remote (`git ls-remote https://github.com/muen-collective/mitsu-ui.git` → *Repository not
found*, measured 2026-09-28), no tags, and version `0.0.0`; its package already declares changesets +
a `release: changeset publish` flow and CI workflows, but none of it can run without the GitHub repo
under `muen-collective`. The founder's ratification call (initiative §8 Q1: public vs private) is the
gate.

Until the repo exists and `v0.1.0` is cut there, the **de-facto kit source is this vendored copy**
(`packages/eva/`, 0.1.0) and every task must say so — no document may cite a `mitsu-ui` tag.

**When the repo lands, this file gains:**
1. the remote URL + the tag this copy was re-vendored from;
2. the version relationship (source `0.0.0`+ → copy `0.1.0` converge at that tag);
3. the story home fix (stories live in the kit source; `02-design-system/storybook/` retires to a
   pointer).

**The 18.3.1 compatibility gate (epic 67 T3) applies to the source at the same time** — the
`react-18` job in `~/.kun/mitsu-ui/.github/workflows/ci.yml` (added 2026-09-28, unpushed).
