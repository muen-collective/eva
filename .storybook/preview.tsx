import type { Preview } from "@storybook/react"
import "../src/styles/storybook.css"

/**
 * Every story renders inside the Muen theme by default.
 *
 * The theme is applied as `data-eva-theme="muen"` on the stage, because that is exactly how a consuming app
 * applies it (`app/src/app/layout.tsx`), and the theme's rules are written as `[data-eva-theme=muen] …`.
 * A story that looks right here looks right in the product for the same reason.
 *
 * The toolbar keeps the kit's own default reachable: "EVA Unit 01" is the dark theme in `theme.css`, and
 * seeing both is how you tell a component defect from a theme decision.
 */
const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: "Which theme the stage wears",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "muen", title: "Muen" },
          { value: "default", title: "EVA Unit 01 (kit default)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "muen" },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? "muen"
      return (
        <div
          className="eva-storybook-stage"
          data-eva-theme={theme === "muen" ? "muen" : undefined}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
