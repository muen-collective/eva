import tailwindcss from "@tailwindcss/vite"
import type { StorybookConfig } from "@storybook/react-vite"
import remarkGfm from "remark-gfm"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    {
      // MDX 3 has no GFM by default, so a markdown table in a guide would render as literal pipes.
      // The docs are mostly tables (tokens, props, pairings), so the plugin is not optional.
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    // Storybook 9 folded the "essentials" addon into core; docs and a11y still ship separately.
    // Autodocs is opt-in per component via `tags: ["autodocs"]` — the old `docs: { autodocs }` is gone.
    "@storybook/addon-a11y",
    // Serves an MCP server from the dev server at /mcp, so an agent can read the component
    // manifest and the docs instead of guessing at the API. Dev-server only: the GitHub Pages
    // build is static and has no MCP endpoint.
    "@storybook/addon-mcp",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // Every component is written shadcn-style: a plain function whose props are
  // `React.ComponentProps<"div"> & VariantProps<typeof variants>`. The default
  // babel-based react-docgen cannot resolve those imported type aliases, so its
  // props tables come out as the `propertyName*` placeholder. The TypeScript
  // checker resolves them, which is what makes the props tables real.
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Drop the DOM attribute surface (every div prop, ~250 of them) but keep the props a
      // Radix primitive declares — for a wrapper like Tabs or Select those ARE the API.
      propFilter: (prop) =>
        prop.parent ? !/[\\/](@types[\\/]react|react)[\\/]/.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss() as any]
    return config
  },
}

export default config
