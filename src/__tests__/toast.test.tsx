import { afterEach, describe, expect, it, vi } from "vitest"
import { act, cleanup, render, screen } from "@testing-library/react"

import { Toast } from "../components/ui/toast"

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe("Toast", () => {
  it("announces the message without asking for attention", () => {
    render(<Toast>“#d126a1” added as a draft colour</Toast>)

    const message = screen.getByText("“#d126a1” added as a draft colour")
    expect(message).toBeTruthy()

    // Radix wraps the viewport in a labelled region, which is what a screen reader announces politely.
    const region = screen.getByRole("region", { name: /notifications/i })
    expect(region.contains(message)).toBe(true)
  })

  it("closes itself after its duration", () => {
    vi.useFakeTimers()
    const onOpenChange = vi.fn()

    render(
      <Toast duration={2000} onOpenChange={onOpenChange}>
        Saved
      </Toast>
    )

    act(() => {
      vi.advanceTimersByTime(2500)
    })

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("keeps its feedback colour in the border, not the text", () => {
    render(<Toast tone="destructive">A board needs a name</Toast>)

    const region = screen.getByText("A board needs a name").closest("[data-slot='toast']")
    expect(region?.className).toContain("border-destructive/50")
    expect(region?.className).toContain("text-foreground")
  })
})
