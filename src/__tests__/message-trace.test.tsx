import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"

import { Message, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "../components/ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../components/ui/trace"

afterEach(cleanup)

describe("Message", () => {
  it("names the speaker in a header and carries align on the block", () => {
    render(
      <MessageGroup>
        <Message align="end">
          <MessageContent>
            <MessageHeader>You</MessageHeader>
            <p>Keep the sleeve.</p>
            <MessageFooter>21:03</MessageFooter>
          </MessageContent>
        </Message>
      </MessageGroup>
    )
    expect(screen.getByText("You")).toBeTruthy()
    const message = screen.getByText("Keep the sleeve.").closest("[data-slot=message]")
    expect(message?.getAttribute("data-align")).toBe("end")
  })
})

describe("Trace", () => {
  it("writes the status as an attribute, not only a colour", () => {
    render(
      <Trace>
        <TraceLine status="running">
          <TraceIcon />
          <TraceTitle>Styling the side view</TraceTitle>
        </TraceLine>
        <TraceLine status="error">
          <TraceIcon />
          <TraceTitle>The run failed</TraceTitle>
        </TraceLine>
      </Trace>
    )
    expect(screen.getByText("Styling the side view").closest("[data-slot=trace-line]")?.getAttribute("data-status")).toBe("running")
    expect(screen.getByText("The run failed").closest("[data-slot=trace-line]")?.getAttribute("data-status")).toBe("error")
  })

  it("opens a collapsible line", () => {
    render(
      <Trace>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon />
              <TraceTitle>Generated the side view</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>seed 88213</TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    )
    const trigger = screen.getByRole("button", { name: /Generated the side view/ })
    expect(trigger.getAttribute("aria-expanded")).toBe("false")
    fireEvent.click(trigger)
    expect(trigger.getAttribute("aria-expanded")).toBe("true")
  })
})
