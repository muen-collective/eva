import type { Meta, StoryObj } from "@storybook/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Button } from "../components/ui/button"

/**
 * An alert dialog asks a question that cannot be answered by accident, in a window that holds the page
 * still until it is. Its job is the **yes/no**, so it carries no form and no secondary navigation.
 *
 * Reach for it when the action is destructive or irreversible. When the content is something to read, fill
 * in or step through, use a Dialog instead — an alert dialog that asks for more than a decision is the
 * wrong tool, and users learn to click through it.
 */
const meta = {
  title: "EVA/Primitives/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal that interrupts to confirm one destructive decision. Exactly two exits: the action " +
          "(AlertDialogAction) and the cancel (AlertDialogCancel). Dismisses on Escape and on a backdrop " +
          "click, both of which are the cancel.",
      },
    },
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/** The confirmation every destructive action owes the person doing it. */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete board</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “Spring campaign”?</AlertDialogTitle>
          <AlertDialogDescription>
            The board and its 62 references go with it. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * The non-destructive case. Same window, default action — for a question that is disruptive but not
 * permanent, like replacing the contents of a board that can be rebuilt.
 */
export const NonDestructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Replace references</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replace all references?</AlertDialogTitle>
          <AlertDialogDescription>
            The current 24 images are removed from this board and the new scrape is added. They stay in the
            library, so this can be redone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Replace</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/** Open on mount, for documentation and visual checks rather than for use. */
export const Open: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard these changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved edits to the direction. Leaving now loses them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
