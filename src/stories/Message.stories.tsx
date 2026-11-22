import type { Meta, StoryObj } from "@storybook/react"

import {
  Message,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "../components/ui/message"

/**
 * A message is one speaker's block: header (who), content (what), footer (when or what it cost).
 * There is no avatar — the header names the speaker.
 */
const meta = {
  title: "EVA/Composites/Message",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The shadcn message grammar without an avatar: a header names the speaker, the content is the message, the footer carries the time or cost. `align=\"end\"` turns it around for the person's own message.",
      },
    },
  },
  tags: ["autodocs"],
  render: () => (
    <MessageGroup className="w-[420px]">
      <Message>
        <MessageContent>
          <MessageHeader>Styling agent</MessageHeader>
          <p className="px-3 text-sm text-foreground">
            The side view is queued. I&apos;ll report back when the final lands.
          </p>
          <MessageFooter>21:02</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <p className="px-3 text-sm text-foreground">Keep the sleeve, shorten the hem by 3cm.</p>
          <MessageFooter>21:03</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongText: Story = {
  render: () => (
    <MessageGroup className="w-[380px]">
      <Message>
        <MessageContent>
          <MessageHeader>Styling agent</MessageHeader>
          <p className="px-3 text-sm text-foreground">
            I paired look 002 by camera view rather than by file order: b1 is front, b2 is the
            detail crop, b3 is the side and b4 is the back. The wipe now matches front under front.
          </p>
          <MessageFooter>no runs yet</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}
