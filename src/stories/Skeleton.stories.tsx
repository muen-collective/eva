import type { Meta, StoryObj } from "@storybook/react"

import { Skeleton } from "../components/ui/skeleton"
import { Card, CardContent, CardHeader } from "../components/ui/card"

/**
 * A skeleton is the shape of content that has not arrived. It is honest about what is coming — same
 * geometry as the real thing — so the page does not jump when the data lands.
 *
 * The pulse is `--muted`, the quietest surface in the kit. A skeleton that is louder than the content it
 * replaces turns waiting into a performance.
 */
const meta = {
  title: "EVA/Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description:
        "The size and shape — the component sets only the pulse and the fill, so the geometry is yours: " +
        "`h-4 w-48` for a line, `size-9 rounded-full` for an avatar.",
      table: { category: "Styling" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A pulsing block standing in for content that is loading. Size it with the className so it matches " +
          "the real element's geometry.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/** The primitive itself: a rounded block that takes its size from the utility classes you give it. */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
}

/** A paragraph standing in for text, at the width lines of real text would wrap to. */
export const TextLines: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
}

/**
 * The composition that matters: a card skeleton built from the real Card's anatomy, so the loading state
 * and the loaded state occupy the same box.
 */
export const CardPlaceholder: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
      {[0, 1].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-10/12" />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

/** An avatar and a line — the row-shaped case. */
export const AvatarRow: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-9 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  ),
}
