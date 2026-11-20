import type { Meta, StoryObj } from "@storybook/react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

/**
 * A dialog takes the page away for a task that needs the whole stage — a form, a preview, a set of choices
 * too large for a popover. It is modal: the page behind it is inert until it closes.
 *
 * It must have a title. `DialogTitle` is what a screen reader announces on open, and a dialog without one
 * opens as an unnamed region. When the task is a single yes/no on something destructive, the narrower
 * AlertDialog is the right component — it is built to end in a decision, not to hold a form.
 */
const meta = {
  title: "EVA/Primitives/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal surface for a task. Compose from DialogHeader (DialogTitle, DialogDescription), a body, " +
          "and DialogFooter. DialogClose is the cancel. Closes on Escape and on a backdrop click.",
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/** A form in a dialog — the common case. The footer holds the cancel and the one primary action. */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New board</DialogTitle>
          <DialogDescription>
            A board collects the references one direction is argued from.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="dialog-board-name">Name</Label>
            <Input id="dialog-board-name" placeholder="Spring campaign" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dialog-board-season">Season</Label>
            <Input id="dialog-board-season" placeholder="SS26" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Create board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** Read-only content: a dialog whose job is to show something large, with a single way out. */
export const ReadOnly: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View brief</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Direction brief</DialogTitle>
          <DialogDescription>Wool overcoat, studio light, four views.</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          A wool overcoat over a knit, shot in flat studio light. The face is locked from the reference; only
          the garment clause changes between looks.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** Open on mount, so the surface can be inspected without a click. */
export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Run garment swap</DialogTitle>
          <DialogDescription>This replaces the outfit on the locked model.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Run</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
