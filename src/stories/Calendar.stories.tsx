import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "../components/ui/calendar"

/**
 * A calendar picks a date — or a range, or several. It is `react-day-picker` v9 with the kit's class map, so
 * the keyboard model and the ARIA come from the library and every colour comes from a token.
 *
 * In this kit selection is `--primary` ink and "today" is `--accent`, which is a **surface**, not a brand hue.
 * That is deliberate: the only thing that should read as chosen is the thing that was chosen.
 *
 * A full calendar is a lot of surface. When the answer is "a date", the field that opens it is a
 * DatePicker — reach for the Calendar directly only when the month is the subject, not a detail of the form.
 */
const meta = {
  title: "EVA/Primitives/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A month grid for picking one date, several dates or a range. Takes every react-day-picker prop; " +
          "the mode prop (single / multiple / range) decides what onSelect returns.",
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

/** One date. The selected day is ink; hovering a day is the accent surface. */
export const Single: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <div className="space-y-3">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "nothing yet"}
        </p>
      </div>
    )
  },
}

/** A range — the case a shoot date or a campaign window needs. Both ends are ink, the middle is the surface. */
export const Range: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
    })
    return (
      <div className="space-y-3">
        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} className="rounded-lg border" />
        <p className="text-sm text-muted-foreground">
          {range?.from ? range.from.toLocaleDateString() : "—"}
          {" → "}
          {range?.to ? range.to.toLocaleDateString() : "—"}
        </p>
      </div>
    )
  },
}

/** Several dates, for the days something is scheduled. */
export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([new Date()])
    return (
      <Calendar mode="multiple" selected={dates} onSelect={setDates} className="rounded-lg border" />
    )
  },
}

/**
 * Two months with the dropdown caption — what a range picker uses, and the one place the button-variant
 * mapping (`buttonVariant="ghost"`) is worth pointing at.
 */
export const TwoMonths: Story = {
  render: () => (
    <Calendar
      mode="single"
      numberOfMonths={2}
      captionLayout="dropdown"
      buttonVariant="ghost"
      className="rounded-lg border"
    />
  ),
}
