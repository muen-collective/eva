import type { Meta, StoryObj } from "@storybook/react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Badge } from "../components/ui/badge"

/**
 * A table is for data that is **compared across rows** — money, counts, dates, states. If the reader is
 * reading sentences, it is a list. If the reader is scanning a column to find the odd one out, it is a table.
 *
 * The header row is `--muted-foreground` at 12px and the body is the default text: the table earns its
 * emphasis from alignment and rhythm, not from making every cell bold. Numeric columns are right-aligned,
 * because that is what lets the eye compare digits down a column.
 */
const meta = {
  title: "EVA/Primitives/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description:
        "Width and any table-specific utilities. A wide table scrolls inside the component's own " +
        "container rather than pushing the page — set `max-w-*` here to cap it.",
      table: { category: "Styling" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A native <table> with the kit's skin. Table wraps it in a scroll container, so a wide table " +
          "scrolls horizontally instead of pushing the page wide. Use TableCaption for the table's name.",
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const looks = [
  { id: "Look 01", garment: "Wool overcoat", views: 4, state: "Approved" },
  { id: "Look 02", garment: "Leather jacket", views: 4, state: "Needs styling" },
  { id: "Look 03", garment: "Knit and denim", views: 3, state: "Rejected" },
]

/** The full anatomy: caption, header, body and a footer that totals the numeric column. */
export const Default: Story = {
  render: () => (
    <Table className="max-w-2xl">
      <TableCaption>Looks styled in this direction.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Look</TableHead>
          <TableHead>Garment</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="text-right">State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {looks.map((look) => (
          <TableRow key={look.id}>
            <TableCell className="font-medium">{look.id}</TableCell>
            <TableCell>{look.garment}</TableCell>
            <TableCell className="text-right tabular-nums">{look.views}</TableCell>
            <TableCell className="text-right">
              <Badge variant={look.state === "Rejected" ? "destructive" : "secondary"}>{look.state}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">11</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

/** Without the caption and footer — the compact case, when the table sits under a heading that already names it. */
export const Compact: Story = {
  render: () => (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["--background", "#f5f5f5"],
          ["--foreground", "#0a0a0a"],
          ["--border", "#e5e5e5"],
          ["--primary", "#0a0a0a"],
        ].map(([token, value]) => (
          <TableRow key={token}>
            <TableCell className="font-mono text-xs">{token}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

/** A selected row — `data-state="selected"` is what tints it, so selection is not a class the caller invents. */
export const SelectedRow: Story = {
  render: () => (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Board</TableHead>
          <TableHead className="text-right">References</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell>Spring campaign</TableCell>
          <TableCell className="text-right tabular-nums">62</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Outerwear</TableCell>
          <TableCell className="text-right tabular-nums">18</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
