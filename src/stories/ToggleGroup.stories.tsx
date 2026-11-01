import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Toggle } from "../components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"

const meta = {
  title: "EVA/Primitives/Toggle",
  component: ToggleGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

const FILTERS = [
  { value: "all", label: "All", count: 12 },
  { value: "draft", label: "Draft", count: 7 },
  { value: "published", label: "Published", count: 4 },
  { value: "locked", label: "Locked", count: 1 },
]

/** Single-select: the filter row. One board list, one answer to "which". */
export const SingleSelect: Story = {
  args: { type: "single" },
  render: () => {
    const [value, setValue] = React.useState("all")
    return (
      <div className="space-y-3">
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(next) => next && setValue(next)}
          aria-label="Filter boards by status"
        >
          {FILTERS.map((filter) => (
            <ToggleGroupItem key={filter.value} value={filter.value} size="sm">
              {filter.label}
              <span className="text-muted-foreground">{filter.count}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-sm text-muted-foreground">Showing: {value}</p>
      </div>
    )
  },
}

/** Multi-select: the formatting row. Each toggle stands alone. */
export const Multiple: Story = {
  args: { type: "multiple" },
  render: () => {
    const [on, setOn] = React.useState<string[]>(["bold"])
    return (
      <ToggleGroup type="multiple" value={on} onValueChange={setOn} aria-label="Text style" size="sm">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="wide">Wide</ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/** Outline is the weight for a filter row: separate buttons, each with its own edge. */
export const Outline: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="grid" aria-label="View">
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** `spacing={0}` seams the items into one segmented control — a mode switch, not a list of choices. */
export const Connected: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" variant="outline" spacing={0} defaultValue="grid" aria-label="View">
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="table">Table</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** Vertical stacks the same group without changing anything else. */
export const Vertical: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" orientation="vertical" defaultValue="all" aria-label="Scope">
      <ToggleGroupItem value="all">Everything</ToggleGroupItem>
      <ToggleGroupItem value="mine">Only mine</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** A single toggle, the unit the group is made of. */
export const Standalone: Story = {
  args: { type: "single" },
  render: () => {
    const [pressed, setPressed] = React.useState(true)
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Show grid">
        Grid
      </Toggle>
    )
  },
}

/** Disabled items keep their place: the row does not reflow because one filter is unavailable. */
export const Disabled: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" defaultValue="all" aria-label="Filter boards by status">
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="draft" disabled>
        Draft
      </ToggleGroupItem>
      <ToggleGroupItem value="published">Published</ToggleGroupItem>
    </ToggleGroup>
  ),
}
