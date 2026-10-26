import type { Preview } from "@storybook/react"
import "../src/styles/storybook.css"

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div className="eva-storybook-stage">
        <Story />
      </div>
    ),
  ],
}

export default preview
