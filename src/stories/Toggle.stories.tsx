import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic, Underline } from "lucide-react"

import { Toggle } from "../components/ui/toggle"

/**
 * A toggle is a button that stays down. It is for a setting that is on for as long as the surface is —
 * bold on a selection, a filter that is applied — and the pressed state is **ink**, not the accent surface.
 *
 * That distinction is the point: in this kit `--accent` is the pale surface a hovered row wears, and a filter
 * that is *on* has to read as a decision, not as a mouse passing over it. Radix keeps `aria-pressed` in sync,
 * so the state is announced and is never colour alone.
 *
 * A row of toggles that take turns being on is a ToggleGroup, which also owns the keyboard and the
 * single-vs-multiple rule. A toggle that runs a command is just a Button.
 */
const meta = {
  title: "EVA/Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { children: "Toggle", variant: "default", size: "default", disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A pressable button with a persistent on state. aria-pressed comes from Radix. Two variants " +
          "(default, outline) and three sizes.",
      },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** Pressed and unpressed, side by side — the state has to be readable without pressing anything. */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Unpressed">Bold</Toggle>
      <Toggle defaultPressed aria-label="Pressed">
        Bold
      </Toggle>
    </div>
  ),
}

/** Both variants. `outline` gives the toggle a border, for when it sits among other bordered controls. */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="default" defaultPressed>
        Default, on
      </Toggle>
      <Toggle variant="outline" defaultPressed>
        Outline, on
      </Toggle>
    </div>
  ),
}

/** Three sizes, all icon-shaped. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle size="default" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle size="lg" aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  ),
}

/**
 * The case that names the component: a formatting row. Each toggle is a separate decision, so this is three
 * Toggles rather than a ToggleGroup — the group is for when exactly one may be on.
 */
export const FormattingRow: Story = {
  render: () => (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Toggle size="sm" aria-label="Bold" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle size="sm" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle size="sm" aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  ),
}
