import type { Meta, StoryObj } from "@storybook/react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

/**
 * A card is a surface that groups one thing. It is the unit a page is built from, not a decoration — if
 * two pieces of content do not belong to the same decision, they belong in two cards.
 *
 * In dark EVA there are **no shadow tokens**: depth is a border, and the glow ring is reserved for focus.
 * A card that needs to lift off the page is the exception, and it lifts with a border, not a shadow.
 */
const meta = {
  title: "EVA/Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A bordered surface grouping one piece of content. Compose it from CardHeader (CardTitle, " +
          "CardDescription, CardAction), CardContent and CardFooter — each part is optional and slots " +
          "into a grid, so header, content and footer stay aligned across cards of different heights.",
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The full anatomy: title, description, an action in the header, a body, and a footer. Every part except
 * CardContent is optional.
 */
export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Direction locked</CardTitle>
        <CardDescription>Wool overcoat, studio light, 4 views.</CardDescription>
        <CardAction>
          <Badge variant="secondary">Approved</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          The sheet is complete and the garment swap can run against it.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button size="sm">Run swap</Button>
      </CardFooter>
    </Card>
  ),
}

/** Title and body only — the smallest card that is still a card. */
export const Minimal: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>No references yet</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Add images to this board and the direction can be described.
        </p>
      </CardContent>
    </Card>
  ),
}

/** Three cards side by side, the way a board actually renders a column of work. */
export const InAGrid: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
      {[
        { title: "Spring campaign", count: "62 references", state: "Approved" },
        { title: "Outerwear", count: "18 references", state: "In progress" },
        { title: "Knitwear", count: "9 references", state: "Empty" },
      ].map((board) => (
        <Card key={board.title}>
          <CardHeader>
            <CardTitle>{board.title}</CardTitle>
            <CardDescription>{board.count}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Badge variant={board.state === "Empty" ? "outline" : "secondary"}>{board.state}</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
}
