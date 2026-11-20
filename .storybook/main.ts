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
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss() as any]
    return config
  },
}

export default config
