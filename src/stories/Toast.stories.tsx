import type { Meta, StoryObj } from "@storybook/react"

import { Toast } from "../components/ui/toast"

/**
 * A toast is a result at the edge of the screen. It must not move anything, so every story here is
 * judged by whether the page behind it stayed still.
 */
const meta = {
  title: "EVA/UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "“#d126a1” added as a draft colour",
    tone: "default",
    duration: 4000,
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: { tone: "success", children: "Board published as v2" },
}

export const Notice: Story = {
  name: "Info (navy)",
  args: { tone: "info", children: "“#d126a1” added as a draft colour" },
}

export const Refusal: Story = {
  args: { tone: "destructive", children: "A board needs a name" },
}

export const LongText: Story = {
  args: {
    children:
      "That board is locked — its palette is settled. Unlock it from the wall before adding a colour, or start a new board for this season.",
  },
}

export const StaysUntilDismissed: Story = {
  name: "Long duration",
  args: { duration: 60000, children: "Saved. This one waits for you." },
}
