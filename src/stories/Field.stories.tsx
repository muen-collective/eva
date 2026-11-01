import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../components/ui/field"
import { Input } from "../components/ui/input"

const meta = {
  title: "EVA/Composites/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/** The ordinary case: a label, a control, and one sentence of help. */
export const Default: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>New board</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="board-title">Title</FieldLabel>
          <Input id="board-title" placeholder="Quiet Utility" />
          <FieldDescription>The name the studio will say out loud.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="board-brief">Description</FieldLabel>
          <Input id="board-brief" placeholder="Workwear softened by time." />
        </Field>
      </FieldGroup>
      <Button>Create board</Button>
    </FieldSet>
  ),
}

/** An invalid field says what is wrong, in the field's own space. */
export const Invalid: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldGroup>
        <Field data-invalid="">
          <FieldLabel htmlFor="board-title">Title</FieldLabel>
          <Input id="board-title" aria-invalid defaultValue="" placeholder="" />
          <FieldError errors={[{ message: "A board needs a title." }]} />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
