import type { Meta, StoryObj } from "@storybook/react"

import { ResizeGrip } from "../components/ui/resize-grip"

/**
 * The resize affordance on a canvas node: a quarter arc outside the bottom-right
 * corner, concentric with the card radius and 4px clear of it. It appears on hover
 * or focus and is presentational; the canvas owns the drag and the width bounds.
 */
const meta = {
  title: "EVA/Primitives/ResizeGrip",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A 24px quarter arc for resizing a node. The gap is 4px and the radius is the card radius plus 4, so the curve is concentric with the plate corner.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const OnACard: Story = {
  render: () => (
    <div className="group relative h-40 w-72 rounded-[20px] bg-card shadow-[var(--muen-card-shadow)]">
      <div className="p-4 text-sm">Hover the card</div>
      <ResizeGrip />
    </div>
  ),
}
