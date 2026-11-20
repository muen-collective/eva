import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

/**
 * An input is one line of text the person writes. It is a plain `<input>`, so every native attribute works
 * — `type`, `pattern`, `required`, `autoComplete` — and the kit's only contribution is the skin and the
 * invalid state.
 *
 * The skin is **border-led**: the field is transparent until focus, and focus is a ring on `--ring`, not a
 * colour change. An invalid field is said out loud with `aria-invalid`, which is also what draws the red
 * border — the border never carries the message alone.
 */
const meta = {
  title: "EVA/Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Email", disabled: false },
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": {
      control: "boolean",
      description: "Set when validation failed. Also draws the destructive border.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A single-line text field. Pair with Label (htmlFor + id) so the field has an accessible name; " +
          "set aria-invalid and aria-describedby for validation messages.",
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** The field on its own. */
export const Default: Story = {}

/** With a label, the way a form actually uses it. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-1.5">
      <Label htmlFor="board-name">Board name</Label>
      <Input id="board-name" placeholder="Spring campaign" />
    </div>
  ),
}

/** Disabled: still readable, clearly not editable. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Spring campaign" },
}

/** The invalid state, with the message it must not replace. */
export const Invalid: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-1.5">
      <Label htmlFor="handle-invalid">Studio handle</Label>
      <Input id="handle-invalid" aria-invalid defaultValue="not a handle" aria-describedby="handle-error" />
      <p id="handle-error" className="text-xs text-destructive">
        Lowercase letters and dashes only.
      </p>
    </div>
  ),
}

/** File, date and search are the native types worth reaching for before building anything custom. */
export const Types: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Input type="email" placeholder="you@studio.com" />
      <Input type="search" placeholder="Search references" />
      <Input type="date" />
      <Input type="file" />
    </div>
  ),
}
