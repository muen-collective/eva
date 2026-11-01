import type { Meta, StoryObj } from "@storybook/react"

import { Calendar } from "../components/ui/calendar"
import { DatePicker } from "../components/ui/date-picker"

const meta = {
  title: "EVA/Primitives/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: { placeholder: "Pick a date" },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

/** Nothing chosen — the placeholder is `text-muted-foreground` via `data-empty`. */
export const Empty: Story = {}

/** A chosen date. `value` is ISO, because every date in a Brand OS is a Postgres `date`. */
export const WithValue: Story = { args: { value: "2027-02-03" } }

/** Posts as a form field: the hidden input carries `yyyy-mm-dd`. */
export const InAForm: Story = {
  args: { name: "showOn", defaultValue: "2027-02-03" },
  render: (args) => (
    <form className="flex items-center gap-2">
      <DatePicker {...args} />
      <span className="text-muted-foreground text-xs">the hidden input posts showOn</span>
    </form>
  ),
}

/** A lead-time constraint: nothing before the material-order date. */
export const Constrained: Story = {
  args: { disabled: { before: new Date(2027, 0, 4) } },
}

/** The grid on its own, so the token mapping (selection = ink, today = accent surface) is visible. */
export const CalendarOnly: Story = {
  render: () => (
    <Calendar
      mode="single"
      selected={new Date(2027, 1, 3)}
      defaultMonth={new Date(2027, 1, 1)}
    />
  ),
}
