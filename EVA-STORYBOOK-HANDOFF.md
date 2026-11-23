# EVA Storybook — session handoff (roadmap in progress)

Open the next agent session with working directory /Volumes/External SSD/eva so writes are in-workspace and need no escalation. Keep this file at the repo root.

## Goal (from founder)
1. Serve EVA's React Storybook from a URL, to work against while building NERV.
2. MDS-level documentation detail (props tables + prose guides).
3. MCP for agents to use the components.
Plus: "EVA native for mobile" goes on the roadmap (later, separate track).

## Decisions already made
- Serving: GitHub Pages via CI.
- MCP path: upgrade Storybook 8.6 -> 10 and use official @storybook/addon-mcp (it only exists on SB 10.6+; there is no 8.x version).

## Repo facts (verified by booting it)
- @muen/eva 0.6.0, Storybook 8.6.18, react-vite, Tailwind v4, npm (package-lock.json).
- 29 components in src/components/ui, only 10 have stories (~19 undocumented), 0 MDX guides.
- npm run build-storybook works; storybook-static/ serves index.html + index.json fine.
- Verified: relative asset URLs mean the GitHub Pages subpath /eva/ works WITHOUT any base-path config.
- Existing workflows: ci.yml (npm ci/typecheck/test/build on main+PR), release.yml (changesets).

## Current git state (unfinished Phase 1) — on branch feat/storybook-github-pages, uncommitted
- MODIFIED .storybook/main.ts: added STORYBOOK_BASE_PATH/base wiring. NOT NEEDED. Revert with: git checkout -- .storybook/main.ts
- NEW .github/workflows/storybook-pages.yml: remove the unnecessary 'env:' + 'STORYBOOK_BASE_PATH: /eva/' lines and the stale comment line. Otherwise correct.

## Phase 1 remaining steps (do these first)
1. git checkout -- .storybook/main.ts
2. Edit workflow: delete the env block (STORYBOOK_BASE_PATH) + its comment. Keep everything else: on push main + workflow_dispatch; permissions contents:read/pages:write/id-token:write; concurrency group pages; build job (npm ci -> npm run build-storybook -> actions/configure-pages@v5 -> actions/upload-pages-artifact@v3 path storybook-static); deploy job (actions/deploy-pages@v4, environment github-pages).
3. git add -A && git commit -m "ci: publish EVA Storybook to GitHub Pages"
4. Push branch, open PR to main, merge (CI must stay green).
5. Enable Pages once: repo Settings -> Pages -> Source = GitHub Actions. The "Storybook Pages" action then publishes to https://muen-collective.github.io/eva/. Verify index.json loads there.

## Phase 2 (next): upgrade Storybook 8.6 -> 10
- Fresh branch: npx storybook@latest upgrade (or pin 10.6.x). Watch viteFinal/tailwind plugin API and addon-essentials deprecations.
- Verify all 10 existing stories render before merging. ci.yml typecheck+test gates must pass.

## Phase 3: docs parity with Carrier MDS
- Add autodocs stories (tags:["autodocs"]) for the ~19 primitives without stories yet. One ComponentName.stories.tsx per ui/*.tsx. Title convention already used: EVA/Primitives/<Name>, EVA/Composites/<Name>, EVA/Foundations/<Name>.
- Add MDX prose guides under a Docs section: Foundations (Theme/Tokens/Typography), Styling Components, Using EVA. This is what makes it read like MDS instead of just a component dump.

## Phase 4: MCP
- After SB 10: add @storybook/addon-mcp to addons in .storybook/main.ts. Point agent clients (this harness, Claude, Cursor) at the running Storybook so they query components directly.

## Reference material already built (in the mitsu workspace, not this repo)
/Volumes/External SSD/mitsu/references/mds-2.0/ — full mirror of Carrier MDS (53 primitives, props tables, screenshots, token-roles.json). Use as the target shape for EVA docs.
