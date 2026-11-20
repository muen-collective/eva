import tailwindcss from "@tailwindcss/vite"
import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
  // Storybook 9 folded the "essentials" addon into core; only docs and a11y
  // still ship as separate addons. Autodocs is opt-in per component via
  // `tags: ["autodocs"]` in its meta — the old `docs: { autodocs }` option is gone.
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
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
