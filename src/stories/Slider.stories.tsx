import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "../components/ui/slider"

const meta = {
  title: "EVA/Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    step: 1,
    "aria-label": "Value",
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: [33] },
}

export const Range: Story = {
  args: { defaultValue: [25, 75], "aria-label": "Span" },
}

export const Stepped: Story = {
  args: { defaultValue: [128], min: 64, max: 192, step: 8, "aria-label": "Size" },
}

export const Vertical: Story = {
  render: (args) => (
    <div className="h-48">
      <Slider {...args} orientation="vertical" />
    </div>
  ),
  args: { defaultValue: [40], "aria-label": "Level" },
}

export const Disabled: Story = {
  args: { defaultValue: [40], disabled: true, "aria-label": "Locked" },
}

export const Narrow: Story = {
  render: (args) => (
    <div className="w-40">
      <Slider {...args} />
    </div>
  ),
  args: { defaultValue: [60] },
}
