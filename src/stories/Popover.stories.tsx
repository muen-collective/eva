import type { Meta, StoryObj } from "@storybook/react"

import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

/**
 * A popover is a small surface anchored to the control that opened it. It is for **transient, optional**
 * work — a rename field, a colour picker, a filter — the kind of thing that should not take the page away
 * but also should not be permanent furniture.
 *
 * It dismisses on Escape and on an outside click, and it keeps focus inside while open. When the content is
 * a decision rather than an edit, that is a Dialog; when it is a list of actions, it is a DropdownMenu. A
 * popover whose content is a long form has become a page, and should be one.
 */
const meta = {
  title: "EVA/Primitives/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A floating surface anchored to its trigger. Radix owns the positioning, focus trap and dismissal. " +
          "Give PopoverContent a width — it defaults to the trigger's width, which is usually too narrow.",
      },
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

/** A small form in a popover — the canonical use: rename something without leaving the page. */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Rename board</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="popover-name">Board name</Label>
            <Input id="popover-name" defaultValue="Spring campaign" />
          </div>
          <Button className="w-full" size="sm">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/** Wider content, the case where the default width would clip: a dimension table. */
export const WithDetail: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <div className="text-sm font-medium">Editorial</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Width</span>
            <span className="text-right tabular-nums">1600px</span>
            <span>Height</span>
            <span className="text-right tabular-nums">2400px</span>
            <span>Aspect</span>
            <span className="text-right tabular-nums">2:3</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/** Open on mount, so the surface can be inspected without a click. */
export const Open: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm text-muted-foreground">Filter references by season or garment.</p>
      </PopoverContent>
    </Popover>
  ),
}
