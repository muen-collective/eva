import type { Meta, StoryObj } from "@storybook/react"
import { CircleCheck, CircleDashed, Image as ImageIcon, Sparkles, SquareTerminal } from "lucide-react"

import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "../components/ui/trace"

/**
 * A trace is an agent's work as one line per event, with a disclosure where a line has more to say.
 * Status is written in the title as well as coloured.
 */
const meta = {
  title: "EVA/Composites/Trace",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The shadcn trace grammar on EVA's Collapsible: icon, title, optional description; a line with more to say becomes a disclosure. Running, error and pending are states, and the title says what is happening.",
      },
    },
  },
  tags: ["autodocs"],
  render: () => (
    <Trace className="w-[380px]">
      <TraceLine>
        <TraceIcon>
          <CircleCheck />
        </TraceIcon>
        <TraceTitle>Read the lookbook</TraceTitle>
        <TraceDescription>27 looks</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <Sparkles />
        </TraceIcon>
        <TraceTitle>Styling the side view</TraceTitle>
        <TraceDescription>running</TraceDescription>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <CircleDashed />
        </TraceIcon>
        <TraceTitle>Waiting for your approval</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <SquareTerminal />
        </TraceIcon>
        <TraceTitle>The run failed at the queue step</TraceTitle>
      </TraceLine>
    </Trace>
  ),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Collapsible: Story = {
  render: () => (
    <Trace className="w-[380px]">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <ImageIcon />
            </TraceIcon>
            <TraceTitle>Generated the side view</TraceTitle>
            <TraceDescription>4.2s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          Krea 2 · detail-edit · seed 88213 · 1.4k tokens. The final is in the look&apos;s folder and
          the view is back in review.
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
}
