import type { Meta, StoryObj } from "@storybook/react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

/**
 * A sheet is a dialog that comes in from an edge. It is the same modal behaviour as a Dialog, chosen for a
 * different **shape**: a panel that is tall and narrow (filters, a detail pane) enters from the side, and one
 * that is short and wide (a composer, a confirmation) enters from the bottom.
 *
 * The edge is a composition decision, not a style. A sheet from the right implies "more, alongside what you
 * were looking at"; from the bottom it implies "something you were about to do".
 */
const meta = {
  title: "EVA/Primitives/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A side-anchored modal panel. SheetContent takes side=\"top\" | \"right\" | \"bottom\" | \"left\" " +
          "and showCloseButton. Give it a SheetHeader with SheetTitle — an untitled sheet is an unnamed region.",
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

/** From the right: a filter pane, the most common sheet. */
export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filter references</SheetTitle>
          <SheetDescription>Narrow the board without leaving it.</SheetDescription>
        </SheetHeader>
        <div className="space-y-3 px-4">
          <div className="space-y-1.5">
            <Label htmlFor="sheet-season">Season</Label>
            <Input id="sheet-season" placeholder="SS26" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sheet-garment">Garment</Label>
            <Input id="sheet-garment" placeholder="Outerwear" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Clear</Button>
          </SheetClose>
          <Button>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/** From the bottom, for a short task the person is about to commit to. */
export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Save look</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Save this look?</SheetTitle>
          <SheetDescription>It is added to the direction and can be re-styled later.</SheetDescription>
        </SheetHeader>
        <SheetFooter className="flex-row justify-end gap-2">
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <Button>Save look</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/** From the left, when the panel is the navigation rather than a detail of the page. */
export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Boards</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Boards</SheetTitle>
          <SheetDescription>Four boards in this workspace.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 text-sm">
          {["Spring campaign", "Outerwear", "Knitwear", "Archive"].map((board) => (
            <a key={board} href="#" className="rounded-md px-2 py-1.5 hover:bg-muted">
              {board}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
}

/** Open on mount, so the panel can be inspected without a click. */
export const Open: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Look detail</SheetTitle>
          <SheetDescription>Look 01 — wool overcoat, four views.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
