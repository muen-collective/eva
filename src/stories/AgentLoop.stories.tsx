import type { Meta, StoryObj } from "@storybook/react"
import { CircleCheck, CircleDashed, Image as ImageIcon, Sparkles, SquareTerminal } from "lucide-react"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Message, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "../components/ui/message"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "../components/ui/trace"

/**
 * The agent loop window: a semi-transparent, non-modal inspector over the canvas. It borrows the
 * harness's ledger grammar (turns → steps → tool rows), not a chat — there is no prompt box here.
 */
const meta = {
  title: "EVA/Patterns/AgentLoop",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A floating loop window over a dimmed canvas: run header, the turns as messages, the steps as traces, and a footer with the queue and stop. The window is the only translucent thing; the state word carries the state.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="relative h-[640px] w-full bg-muted/40 p-8">
      <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
        the canvas sits here
      </div>

      <section
        role="region"
        aria-label="Agent loop"
        className="absolute bottom-6 right-6 flex h-[520px] w-[400px] flex-col overflow-hidden rounded-xl border border-border bg-background/75 shadow-lg backdrop-blur-xl"
      >
        <header className="flex flex-none items-center gap-2 border-b border-border px-3 py-2.5">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          <span className="text-xs font-medium text-foreground">loop · look 007</span>
          <span className="text-xs text-muted-foreground">01:42</span>
          <Badge variant="secondary" className="ml-auto text-[11px]">
            running
          </Badge>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <MessageGroup>
            <Message>
              <MessageContent>
                <MessageHeader>You · turn 2</MessageHeader>
                <div className="mx-3 rounded-lg bg-muted px-2.5 py-2 text-sm text-foreground">
                  tighten the hem, keep the sleeve
                </div>
                <MessageFooter>21:03</MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageContent>
                <MessageHeader>Styling agent · turn 2</MessageHeader>
                <Trace className="px-3">
                  <TraceLine>
                    <TraceIcon>
                      <CircleCheck />
                    </TraceIcon>
                    <TraceTitle>Read the selected view</TraceTitle>
                    <TraceDescription>front · approved</TraceDescription>
                  </TraceLine>
                  <TraceCollapsible>
                    <TraceCollapsibleTrigger>
                      <TraceLine status="running">
                        <TraceIcon>
                          <Sparkles />
                        </TraceIcon>
                        <TraceTitle>Styling the side view</TraceTitle>
                        <TraceDescription>4.2s</TraceDescription>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent>
                      Krea 2 · detail-edit · seed 88213 · 1.4k tokens. The final will land in look
                      007&apos;s folder and the view goes back to review.
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                  <TraceLine>
                    <TraceIcon>
                      <ImageIcon />
                    </TraceIcon>
                    <TraceTitle>Queued the back view</TraceTitle>
                    <TraceDescription>next</TraceDescription>
                  </TraceLine>
                </Trace>
                <MessageFooter>21:04</MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageContent>
                <MessageHeader>You · turn 3</MessageHeader>
                <div className="mx-3 rounded-lg bg-muted px-2.5 py-2 text-sm text-foreground">
                  stop after the back view — I want to review before detail
                </div>
                <MessageFooter>21:05</MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageContent>
                <MessageHeader>Styling agent · turn 3</MessageHeader>
                <Trace className="px-3">
                  <TraceLine status="pending">
                    <TraceIcon>
                      <CircleDashed />
                    </TraceIcon>
                    <TraceTitle>Waiting for your approval</TraceTitle>
                    <TraceDescription>blocked</TraceDescription>
                  </TraceLine>
                </Trace>
              </MessageContent>
            </Message>
          </MessageGroup>
        </div>

        <footer className="flex flex-none items-center gap-2 border-t border-border px-3 py-2">
          <span className="text-[11px] text-muted-foreground">4/27 approved</span>
          <Button size="xs" variant="ghost" className="ml-auto">
            open in Harness
          </Button>
          <Button size="xs" variant="outline">
            stop the loop
          </Button>
        </footer>
      </section>
    </div>
  ),
}

export const Waiting: Story = {
  render: () => (
    <div className="relative h-[420px] w-full bg-muted/40 p-8">
      <section
        role="region"
        aria-label="Agent loop"
        className="absolute bottom-6 right-6 flex w-[400px] flex-col overflow-hidden rounded-xl border border-border bg-background/75 shadow-lg backdrop-blur-xl"
      >
        <header className="flex flex-none items-center gap-2 border-b border-border px-3 py-2.5">
          <span aria-hidden className="size-1.5 rounded-full bg-muted-foreground" />
          <span className="text-xs font-medium text-foreground">loop · look 007</span>
          <Badge variant="outline" className="ml-auto text-[11px]">
            waiting for you
          </Badge>
        </header>
        <div className="px-4 py-4">
          <p className="text-sm text-foreground">The side view is ready for your review.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Approve it in the review panel; the loop will continue with the back view.
          </p>
        </div>
        <footer className="flex items-center gap-2 border-t border-border px-3 py-2">
          <span className="text-[11px] text-muted-foreground">3/27 approved</span>
          <Button size="xs" className="ml-auto">
            review the view
          </Button>
        </footer>
      </section>
    </div>
  ),
}

export const Failed: Story = {
  render: () => (
    <div className="relative h-[420px] w-full bg-muted/40 p-8">
      <section
        role="region"
        aria-label="Agent loop"
        className="absolute bottom-6 right-6 flex w-[400px] flex-col overflow-hidden rounded-xl border border-border bg-background/75 shadow-lg backdrop-blur-xl"
      >
        <header className="flex flex-none items-center gap-2 border-b border-border px-3 py-2.5">
          <span aria-hidden className="size-1.5 rounded-full bg-destructive" />
          <span className="text-xs font-medium text-foreground">loop · look 007</span>
          <Badge variant="destructive" className="ml-auto text-[11px]">
            failed
          </Badge>
        </header>
        <div className="px-4 py-4">
          <Trace>
            <TraceLine status="error">
              <TraceIcon>
                <SquareTerminal />
              </TraceIcon>
              <TraceTitle>The run failed at the queue step</TraceTitle>
            </TraceLine>
          </Trace>
          <p className="mt-2 text-xs text-muted-foreground">
            The provider refused the run; no final was written. Nothing in the lookbook changed.
          </p>
        </div>
        <footer className="flex items-center gap-2 border-t border-border px-3 py-2">
          <Button size="xs" variant="ghost" className="ml-auto">
            open in Harness
          </Button>
          <Button size="xs" variant="outline">
            try again
          </Button>
        </footer>
      </section>
    </div>
  ),
}
