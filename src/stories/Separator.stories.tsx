import type { Meta, StoryObj } from "@storybook/react"

import { Separator } from "../components/ui/separator"

/**
 * A separator is a rule between things. By default it is **decorative** — it carries no meaning for assistive
 * technology, because a visual gap is not information. Set `decorative={false}` only when the boundary is
 * actually a section boundary that a screen reader should announce.
 */
const meta = {
  title: "EVA/Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  args: { orientation: "horizontal", decorative: true },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    decorative: {
      control: "boolean",
      description: "When false the separator exposes role=\"separator\" and is announced.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A 1px rule in --border. Decorative by default; make it semantic only for a real section boundary.",
      },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/** The common case: a rule between two blocks. */
export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm">
      <div className="text-sm font-medium">Today</div>
      <div className="text-sm text-muted-foreground">3 looks styled</div>
      <Separator className="my-3" />
      <div className="text-sm font-medium">Yesterday</div>
      <div className="text-sm text-muted-foreground">5 looks styled</div>
    </div>
  ),
}

/** A vertical rule needs a height from its parent — it stretches, it does not size itself. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Editorial</span>
      <Separator orientation="vertical" />
      <span>Lookbook</span>
      <Separator orientation="vertical" />
      <span>PDP</span>
    </div>
  ),
}
