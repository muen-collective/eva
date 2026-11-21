import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "../components/ui/badge"
import { Socket } from "../components/ui/socket"

/**
 * A socket is a solid dot on a card's edge, never a hollow ring. Images are
 * blue; text is green. The wire leaving it (the noodle) carries the same colour,
 * and the dot sits on the label's baseline.
 */
const meta = {
  title: "EVA/Primitives/Socket",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The canvas socket: an 8px solid dot, images blue and text green, with a 2px card-ground ring. The count badge sits to its right; the dot aligns with the row's label.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Row({
  kind,
  label,
  count,
  required,
}: {
  kind: "media" | "text" | "video"
  label: string
  count: string
  required?: string
}) {
  return (
    <div className="grid w-80 grid-cols-[16px_1fr_auto_52px] items-center gap-3 border-b border-border py-2 text-sm last:border-0">
      <Socket kind={kind} />
      <span>{label}</span>
      <span className="text-xs text-muted-foreground">{required ?? ""}</span>
      <Badge variant="outline" className="justify-self-end font-medium tabular-nums">
        {count}
      </Badge>
    </div>
  )
}

export const Sockets: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Row kind="media" label="images" count="0/4" required="at least 1" />
      <Row kind="text" label="text prompt" count="0/1" required="required" />
      <Row kind="video" label="video" count="1/1" />
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="eva-noodle w-8" />
        images noodle
        <span className="eva-noodle w-8" data-kind="text" />
        text noodle
        <span className="eva-noodle w-8" data-kind="video" />
        video noodle
      </div>
    </div>
  ),
}
