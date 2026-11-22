import type { Meta, StoryObj } from "@storybook/react"

import { ReviewCard } from "../components/ui/review-card"

const cover = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="480"><rect width="360" height="480" fill="#e9e2d0"/><text x="180" y="250" text-anchor="middle" font-family="sans-serif" font-size="32" fill="#151c17">look 001</text></svg>`
)}`

const meta = {
  title: "EVA/Composites/ReviewCard",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One look in the review grid: a 3:4 cover with the number, the name, `approved n/m` with a check at full, and the model line. The card is the target; approval lives on the stage.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    src: cover,
    number: "001",
    title: "Patchwork Beadwork",
    approved: 0,
    total: 4,
    meta: "model n/a",
  },
  render: (args) => (
    <div className="w-[180px]">
      <ReviewCard {...args} />
    </div>
  ),
} satisfies Meta<typeof ReviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Approved: Story = { args: { approved: 4 } }

export const Partial: Story = { args: { approved: 3 } }

export const LongTitle: Story = {
  args: { title: "Upcycled Plastic Waterfall — a very long look name that must truncate" },
}

export const Disabled: Story = { args: { disabled: true } }
