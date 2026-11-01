import { afterEach, beforeAll, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import { DatePicker } from "../components/ui/date-picker"

// Radix's floating layer measures its anchor; jsdom has no ResizeObserver.
// Vitest runs without `globals`, so Testing Library cannot auto-clean: do it here.
afterEach(cleanup)
beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
})

describe("DatePicker", () => {
  it("shows the placeholder and marks itself empty when there is no date", () => {
    render(<DatePicker placeholder="Pick a show date" />)
    const trigger = screen.getByRole("button", { name: /pick a show date/i })
    expect(trigger).toBeTruthy()
    expect(trigger.getAttribute("data-empty")).toBe("true")
  })

  it("renders a chosen ISO date through the default format", () => {
    render(<DatePicker value="2027-02-03" />)
    const trigger = screen.getByRole("button")
    expect(trigger.textContent).toContain("2027")
    expect(trigger.getAttribute("data-empty")).toBe("false")
  })

  it("posts the value as an ISO string through a hidden input", () => {
    const { container } = render(<DatePicker name="showOn" defaultValue="2027-02-03" />)
    const hidden = container.querySelector('input[name="showOn"]') as HTMLInputElement | null
    expect(hidden).toBeTruthy()
    expect(hidden?.value).toBe("2027-02-03")
    // never a Date's toString — the column is a Postgres `date`
    expect(hidden?.value).not.toContain("T")
  })

  it("posts an empty string rather than the string 'undefined' when nothing is chosen", () => {
    const { container } = render(<DatePicker name="salesCloseOn" />)
    const hidden = container.querySelector('input[name="salesCloseOn"]') as HTMLInputElement | null
    expect(hidden?.value).toBe("")
  })

  it("can be disabled without losing its label", () => {
    render(<DatePicker aria-label="Show date" disabledTrigger />)
    const trigger = screen.getByRole("button", { name: "Show date" })
    expect((trigger as HTMLButtonElement).disabled).toBe(true)
  })
})
