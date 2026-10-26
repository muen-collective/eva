import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../components/ui/button"

const meta = {
  title: "EVA/Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Continue" },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: "default" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Disabled: Story = { args: { disabled: true } }
