import type { Meta, StoryObj } from "@storybook/react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Label } from "../components/ui/label"

/**
 * A select picks one value from a list that is known and short. It is a native-ish listbox: the closed
 * trigger shows the current value, and the open list is the choices.
 *
 * It is **not** a menu. A menu runs commands; a select sets a value. If picking an option immediately does
 * something, that is a DropdownMenu, and if the choice needs an explicit confirm, it is a form.
 *
 * Above roughly ten options, or when the answer is a search, the right control is an Input with a
 * combobox — a select that takes a minute to scan is a select that should have been a search.
 */
const meta = {
  title: "EVA/Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single-choice listbox. SelectTrigger shows the SelectValue; SelectContent holds the items, " +
          "optionally grouped with SelectGroup / SelectLabel and divided by SelectSeparator.",
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

/** The closed and open states of a plain choose-one field. */
export const Default: Story = {
  render: () => (
    <div className="w-56">
      <Select defaultValue="editorial">
        <SelectTrigger>
          <SelectValue placeholder="Pick a format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="editorial">Editorial</SelectItem>
          <SelectItem value="lookbook">Lookbook</SelectItem>
          <SelectItem value="pdp">Product page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/** With a label and helper text — the shape a settings field takes. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex w-56 flex-col gap-1.5">
      <Label htmlFor="crop-select">Default crop</Label>
      <Select defaultValue="medium">
        <SelectTrigger id="crop-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full">Full body</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="detail">Detail</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">Applies to new looks in this direction.</p>
    </div>
  ),
}

/** Grouped, for a list long enough that the groups are what make it scannable. */
export const Grouped: Story = {
  render: () => (
    <div className="w-60">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose a garment" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Outerwear</SelectLabel>
            <SelectItem value="overcoat">Wool overcoat</SelectItem>
            <SelectItem value="jacket">Leather jacket</SelectItem>
            <SelectItem value="parka">Parka</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Knitwear</SelectLabel>
            <SelectItem value="rollneck">Roll-neck</SelectItem>
            <SelectItem value="cardigan">Cardigan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

/** Disabled items keep their place in the list — a missing option is harder to understand than a disabled one. */
export const WithDisabledItem: Story = {
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick an engine" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="krea">Krea 2</SelectItem>
          <SelectItem value="qwen">Qwen 2.1 Edit</SelectItem>
          <SelectItem value="flux" disabled>
            Flux (coming soon)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/** The small trigger, for a toolbar where the select is one control among several. */
export const Small: Story = {
  render: () => (
    <div className="w-44">
      <Select defaultValue="all">
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All seasons</SelectItem>
          <SelectItem value="ss">Spring / Summer</SelectItem>
          <SelectItem value="aw">Autumn / Winter</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
