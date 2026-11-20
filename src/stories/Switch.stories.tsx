import type { Meta, StoryObj } from "@storybook/react"

import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"

/**
 * A switch takes effect **immediately**. There is no save: flipping it writes the setting, and the knob's
 * new position is the confirmation. That is the whole difference from a checkbox, which collects an answer
 * for a form to submit later.
 *
 * The default is monochrome, not brand purple — a settings list full of coloured switches reads as a list of
 * warnings. `color="brand"` is the explicit opt-in for the one switch that is genuinely a brand decision.
 */
const meta = {
  title: "EVA/Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { defaultChecked: true, disabled: false },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
    color: { control: "inline-radio", options: ["default", "brand"] },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A binary control that applies its change immediately. Radix provides role=\"switch\" and the " +
          "keyboard behaviour; the thumb position carries the state, so it is never colour alone.",
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Both positions, side by side — the shape of the state, without the motion. */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch defaultChecked aria-label="On" />
      <Switch aria-label="Off" />
    </div>
  ),
}

/** Both sizes. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" defaultChecked aria-label="Small" />
      <Switch size="default" defaultChecked aria-label="Default" />
    </div>
  ),
}

/** The brand variant, for the switch whose position is a product decision rather than a preference. */
export const Brand: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch color="brand" defaultChecked aria-label="Brand" />
      <span className="text-sm text-muted-foreground">Publish to the studio feed</span>
    </div>
  ),
}

/** Disabled, in both positions — an unavailable setting still has to show which way it is set. */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch disabled defaultChecked aria-label="Disabled and on" />
      <Switch disabled aria-label="Disabled and off" />
    </div>
  ),
}

/**
 * The real context: a settings list. The label is associated with the switch, and the description says what
 * flipping it will do — because a switch that takes effect immediately owes the person that sentence.
 */
export const SettingsList: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col divide-y rounded-lg border">
      {[
        { id: "autosave", label: "Save as I go", detail: "Writes each change to the board.", on: true },
        { id: "motion", label: "Reduced motion", detail: "Skips the entrance animations.", on: false },
        { id: "share", label: "Share to feed", detail: "New looks appear in the studio feed.", on: false },
      ].map((row) => (
        <div key={row.id} className="flex items-center justify-between gap-4 px-3 py-2.5">
          <div className="space-y-0.5">
            <Label htmlFor={`switch-${row.id}`}>{row.label}</Label>
            <p className="text-xs text-muted-foreground">{row.detail}</p>
          </div>
          <Switch id={`switch-${row.id}`} defaultChecked={row.on} />
        </div>
      ))}
    </div>
  ),
}
