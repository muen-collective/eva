import type { Meta, StoryObj } from "@storybook/react"

import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Switch } from "../components/ui/switch"

/**
 * A label names the control it points at. It is a real `<label>`: `htmlFor` matching the control's `id` is
 * what makes clicking the text focus the control, and what gives a screen reader something to read.
 *
 * A placeholder is not a label. It disappears the moment someone types, and it is not reliably announced —
 * the visual affordance is not the accessible name.
 */
const meta = {
  title: "EVA/Primitives/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Board name" },
  parameters: {
    docs: {
      description: {
        component:
          "A <label> styled to the kit's type scale. Always give it htmlFor pointing at the control's id.",
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/** The label alone. */
export const Default: Story = {}

/** Bound to an input by `htmlFor` — click the text and the field takes focus. */
export const WithInput: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-1.5">
      <Label htmlFor="label-demo-name">Board name</Label>
      <Input id="label-demo-name" placeholder="Spring campaign" />
    </div>
  ),
}

/** A label beside its control rather than above it, as settings rows do. */
export const InlineWithSwitch: Story = {
  render: () => (
    <div className="flex max-w-sm items-center justify-between gap-4">
      <div className="space-y-0.5">
        <Label htmlFor="label-demo-autosave">Save as I go</Label>
        <p className="text-xs text-muted-foreground">Writes each change to the board immediately.</p>
      </div>
      <Switch id="label-demo-autosave" defaultChecked />
    </div>
  ),
}
