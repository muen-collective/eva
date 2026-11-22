import type { Meta, StoryObj } from "@storybook/react"

import { CompareStage } from "../components/ui/compare-stage"

const frame = (label: string, bg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="640"><rect width="480" height="640" fill="${bg}"/><text x="240" y="330" text-anchor="middle" font-family="sans-serif" font-size="48" fill="#151c17">${label}</text></svg>`
  )}`

const before = frame("before", "#d9e6d7")
const after = frame("after", "#e9e2d0")

const meta = {
  title: "EVA/Composites/CompareStage",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The review's stage: the before under the after, a wipe handle (a slider to the keyboard), or side by side; fit or fill. The caller may control the mode and fit.",
      },
    },
  },
  tags: ["autodocs"],
  args: { before, after },
  render: (args) => (
    <div className="h-[540px] w-[360px]">
      <CompareStage {...args} className="h-full" />
    </div>
  ),
} satisfies Meta<typeof CompareStage>

export default meta
type Story = StoryObj<typeof meta>

export const Wipe: Story = {}

export const SideBySide: Story = { args: { defaultMode: "split" } }

export const Fill: Story = { args: { defaultFit: "fill" } }

export const Narrow: Story = {
  render: (args) => (
    <div className="h-[420px] w-[240px]">
      <CompareStage {...args} className="h-full" />
    </div>
  ),
}
