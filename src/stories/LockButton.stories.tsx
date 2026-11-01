import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { LockButton } from "../components/ui/lock-button"

const meta = {
  title: "EVA/Primitives/LockButton",
  component: LockButton,
  tags: ["autodocs"],
} satisfies Meta<typeof LockButton>

export default meta
type Story = StoryObj<typeof meta>

/** Press it: the shackle swings about its right foot and the free end lifts off the body. */
export const Default: Story = {
  args: { locked: true },
  render: () => {
    const [locked, setLocked] = React.useState(true)
    return (
      <div className="flex items-center gap-4">
        <LockButton locked={locked} onLockedChange={setLocked} />
        <span className="text-sm text-muted-foreground">{locked ? "locked" : "unlocked"}</span>
      </div>
    )
  },
}

/** Both ends of the animation, side by side — the state has to be readable without the motion. */
export const States: Story = {
  args: { locked: true },
  render: () => (
    <div className="flex items-center gap-6">
      <LockButton locked />
      <LockButton locked={false} />
    </div>
  ),
}

/** With a word, for the place where the state is the sentence. */
export const WithLabel: Story = {
  args: { locked: true },
  render: () => {
    const [locked, setLocked] = React.useState(false)
    return (
      <LockButton locked={locked} onLockedChange={setLocked} variant="outline" size="sm">
        {locked ? "Direction locked" : "Direction open"}
      </LockButton>
    )
  },
}

export const Sizes: Story = {
  args: { locked: true },
  render: () => (
    <div className="flex items-center gap-4">
      <LockButton locked size="sm" />
      <LockButton locked size="default" />
      <LockButton locked size="lg" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { locked: true },
  render: () => <LockButton locked disabled />,
}
