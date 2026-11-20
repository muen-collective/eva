import type { Meta, StoryObj } from "@storybook/react"

import { ScrollArea, ScrollBar } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"

/**
 * A scroll area scrolls **one region** of a page while the page itself stays put. It exists when a list is
 * tall and must not push the rest of the surface down — a sidebar of boards, a column of references.
 *
 * It is not a fix for a long page. A page that scrolls as a whole should scroll as a whole; nesting a
 * scroll area around the whole document traps the wheel and breaks the browser's own scrolling on touch.
 */
const meta = {
  title: "EVA/Primitives/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A region with its own custom scrollbar. Give it a height (or max-height) — it does not size " +
          "itself. Pass a ScrollBar with orientation=\"horizontal\" for content that is wider than the box.",
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

/** A vertical list taller than its box, with the kit's thin scrollbar. */
export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-56 w-64 rounded-lg border">
      <div className="p-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>
            <div className="py-1.5 text-sm">Reference {String(i + 1).padStart(2, "0")}</div>
            {i < 19 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

/**
 * Horizontal, for a filmstrip of references. Pair it with a `max-w` on the wrapper so the overflow is real —
 * a scroll area with nothing to scroll looks identical to a bug.
 */
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-72 rounded-lg border">
      <div className="flex gap-3 p-3" style={{ width: "max-content" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="grid h-24 w-24 shrink-0 place-items-center rounded-md bg-muted text-xs text-muted-foreground"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

/**
 * Both axes, which is the case a plain `overflow: auto` gets right and a bad scroll area gets wrong: the
 * corner has to be filled by the scrollbars, not by a gap.
 */
export const BothAxes: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border">
      <div className="p-3" style={{ width: "max-content" }}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} className="py-1 font-mono text-xs whitespace-nowrap">
            eva-primitives-component--story-{i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
