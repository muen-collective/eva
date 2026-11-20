# EVA Storybook

The published Storybook is the visual contract for EVA: every component, every state, and the prose that says
when to use one.

- **Served at:** <https://muen-collective.github.io/eva/>
- **Locally:** `npm run storybook` → <http://localhost:6006>
- **Built by:** `.github/workflows/storybook-pages.yml` on every push to `main`. The build emits relative
  asset URLs, so the `/eva/` subpath needs no base-path configuration.

## What lives where

| Path | What |
| --- | --- |
| `src/stories/<Component>.stories.tsx` | One file per primitive, `tags: ["autodocs"]`, with a page per component |
| `src/stories/docs/*.mdx` | The prose guides under `EVA/Docs` — Using EVA, Styling Components, Foundations |
| `src/stories/Kit.stories.tsx` | The whole kit on one page |
| `src/components/ui/` | The components themselves |
| `theme.css`, `themes/*.css` | The token contract and the themes |

**Every component in `src/components/ui` has a story file.** A new primitive is not finished until it has one,
because the docs page is generated from the story file's meta.

## Writing a story page

The story file is the documentation, so the prose is not decoration:

- Put a JSDoc comment above the meta. It becomes the page's description and the MCP tool's answer.
- Say **when to reach for the component and when it is the wrong tool.** "A menu is not a select" is the kind
  of sentence these pages are for.
- One story per state, not per prop. `States`, `Sizes`, `Invalid` — a reader should be able to see every state
  without touching a control.
- End with an `InContext` story wherever the component is usually composed with others.
- `argTypes` descriptions only where the name does not explain itself.

## Agents: the MCP server

`.storybook/main.ts` registers `@storybook/addon-mcp`, which serves an MCP server from the **dev server** at
`http://localhost:6006/mcp`. It is dev-only — the GitHub Pages build is static and has no MCP endpoint.

While `npm run storybook` is running, an agent can call:

| Tool | What it gives you |
| --- | --- |
| `docs-list` | Every component and guide, with its id |
| `docs-show` | One component's description, props (from the TypeScript checker), stories and code |
| `docs-show-story` | One story variant in detail |
| `stories-preview` | Preview URLs for the work in progress |
| `stories-find-by-component` | Which stories render a given source file |
| `stories-changed` | Stories marked new or modified |
| `get-storybook-story-instructions` | The house rules for writing stories |

The point is that an agent asks what a component's props actually are instead of guessing from its name. Props
come from `react-docgen-typescript` (the babel-based default cannot resolve these shadcn-style
`React.ComponentProps<...> & VariantProps<...>` signatures, and silently produces a placeholder table).

### Connect a client

Point the client at the running server, named per project:

```jsonc
// .mcp.json / claude_desktop_config.json style
{
  "mcpServers": {
    "eva-storybook": { "type": "http", "url": "http://localhost:6006/mcp" }
  }
}
```

```toml
# Codex / TOML config
[mcp_servers.eva-storybook]
transport = "http"
url = "http://localhost:6006/mcp"
```

The tool `npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project` writes the right shape for
most clients.

For DeepSeek Harness, add it as an MCP client row in the profile rather than editing a client config file — see
the harness's `add-mcp-server` notes. The server only exists while the dev server is up, so a harness profile
that points at it should be enabled when you are working on EVA and off otherwise; a row pointing at a stopped
server just fails its connection.

## Other notes

- The package is tested under React 18, because the DSH host provides React 18. Keep that true.
- Do not bundle React, React DOM, Radix or Lucide into plugin output; they are peer dependencies.
- The tokens are the contract: no hex literals in components, ever. `EVA/Docs/Foundations: Tokens` is the list.
