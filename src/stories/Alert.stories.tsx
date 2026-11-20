import type { Meta, StoryObj } from "@storybook/react"
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Button } from "../components/ui/button"

/**
 * An alert is a message that is about the page right now — a result, a warning, a failed save. It stays in
 * the flow: it is not dismissible, not floating, and it never interrupts.
 *
 * Feedback colours are **border-only**. The card surface and the text stay neutral, so an error is legible
 * without turning a paragraph red, and the state survives being read by someone who cannot see the hue.
 * When the message has to be noticed before the page is read, that is a Dialog or an AlertDialog, not a
 * louder Alert.
 */
const meta = {
  title: "EVA/Primitives/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive"],
      description: "Which feedback border the alert carries. Text stays neutral in every variant.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "An inline message about the current page. The variant sets the border colour only; the surface " +
          "and the text stay neutral. Put the message in AlertTitle / AlertDescription, and an optional " +
          "Button in AlertAction.",
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/** The plain message: a block of note text with no state attached. */
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>This board is shared with everyone in the studio.</AlertDescription>
    </Alert>
  ),
}

/** All five feedback variants together — the only thing that changes is the border. */
export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Alert>
        <Info />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>A neutral note about this page.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <Info />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Something changed that you might want to know about.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes were saved.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This direction has no reference images yet.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleX />
        <AlertTitle>Could not save</AlertTitle>
        <AlertDescription>The connection dropped. Try again in a moment.</AlertDescription>
      </Alert>
    </div>
  ),
}

/** With an action: the one thing you can do about the message, on the same line. */
export const WithAction: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-xl">
      <TriangleAlert />
      <AlertTitle>Unsaved changes</AlertTitle>
      <AlertDescription>Leaving now discards the three looks you styled.</AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Save draft
        </Button>
      </AlertAction>
    </Alert>
  ),
}

/** Without an icon. The icon is the fastest signal, so dropping it makes the alert quieter, not wrong. */
export const NoIcon: Story = {
  render: () => (
    <Alert className="max-w-xl">
      <AlertTitle>Looks you styled</AlertTitle>
      <AlertDescription>
        Fourteen looks were styled this week. The moodboard is the record, not this message.
      </AlertDescription>
    </Alert>
  ),
}
