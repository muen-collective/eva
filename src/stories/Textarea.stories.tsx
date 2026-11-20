import type { Meta, StoryObj } from "@storybook/react"

import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"

/**
 * A textarea is for text that runs past one line — a note, a brief, a prompt someone is composing. It uses
 * `field-sizing: content`, so it starts at its minimum height and grows with what is typed instead of
 * showing an inner scrollbar.
 *
 * Use it when the answer is a sentence or more. When the answer is a value, it is an Input — a textarea
 * invites prose, and someone who has to write a title in one will write a paragraph.
 */
const meta = {
  title: "EVA/Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Describe the direction…", disabled: false },
  argTypes: { disabled: { control: "boolean" } },
  parameters: {
    docs: {
      description: {
        component:
          "A multi-line text field that grows with its content. Takes every native <textarea> attribute; " +
          "min-h-16 is the floor, override it with the className.",
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** The field on its own. */
export const Default: Story = {}

/** In a form, with the label and the helper text a real field owes the person filling it in. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-1.5">
      <Label htmlFor="brief">Direction brief</Label>
      <Textarea id="brief" placeholder="Warm minimalist outerwear, but not sterile." rows={3} />
      <p className="text-xs text-muted-foreground">
        One or two sentences. The more specific, the closer the first pass.
      </p>
    </div>
  ),
}

/** Pre-filled and long — the field grows to fit rather than scrolling. */
export const Filled: Story = {
  args: {
    defaultValue:
      "A wool overcoat over a knit, shot in flat studio light. The face is locked from the reference; only " +
      "the garment changes between looks. Avoid direct flash and avoid high-contrast shadows on the face.",
  },
}

/** Disabled: readable, not editable. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "The sheet is locked; unlock it to edit this brief." },
}

/** The invalid state, with the message beside it rather than instead of it. */
export const Invalid: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-1.5">
      <Label htmlFor="brief-invalid">Direction brief</Label>
      <Textarea id="brief-invalid" aria-invalid aria-describedby="brief-error" defaultValue="Too short" />
      <p id="brief-error" className="text-xs text-destructive">
        Write at least one full sentence.
      </p>
    </div>
  ),
}
