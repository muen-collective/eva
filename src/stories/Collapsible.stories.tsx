import type { Meta, StoryObj } from "@storybook/react"
import { ChevronDown } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible"
import { Button } from "../components/ui/button"

/**
 * A collapsible hides one block behind a control that stays visible. It is the cheapest way to defer detail
 * — a technical note, an advanced set of fields — without sending the person to another page.
 *
 * It is **not** a disclosure for primary navigation and not an accordion: if several sections take turns
 * being open, that is Accordion, which owns the keyboard and the single-open behaviour. A collapsible holds
 * exactly one thing, and the trigger has to say what that thing is.
 */
const meta = {
  title: "EVA/Primitives/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "One block shown or hidden by a labelled trigger. Radix supplies the aria-expanded wiring and the " +
          "keyboard behaviour; apply asChild to the trigger when you want your own Button to be the control.",
      },
    },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

/** The default: a quiet trigger, a block of prose underneath. */
export const Default: Story = {
  render: () => (
    <Collapsible className="max-w-md space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Prompt detail</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="group">
            Show
            <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground">
        <p>
          Medium crop, plain white studio, four views. The face is locked; only the garment clause changes
          between looks.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

/** Open on mount — for the case where the detail is expected, but still collapsible. */
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="max-w-md space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm">
          Advanced
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 rounded-lg border px-3 py-2 text-sm text-muted-foreground">
        <div>Seed: fixed</div>
        <div>Steps: 28</div>
        <div>Guidance: 3.5</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
