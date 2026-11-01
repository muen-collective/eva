import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"

import { LockButton } from "../components/ui/lock-button"

afterEach(cleanup)

describe("LockButton", () => {
  it("reports the lock as a pressed toggle", () => {
    render(<LockButton locked />)
    const button = screen.getByRole("button", { name: "Unlock" })
    expect(button.getAttribute("aria-pressed")).toBe("true")
    expect(button.getAttribute("data-state")).toBe("locked")
  })

  it("names the action, not the state: an open lock offers Lock", () => {
    render(<LockButton locked={false} />)
    expect(screen.getByRole("button", { name: "Lock" }).getAttribute("aria-pressed")).toBe("false")
  })

  it("asks to flip and leaves the decision to the caller", () => {
    const onLockedChange = vi.fn()
    render(<LockButton locked onLockedChange={onLockedChange} />)
    fireEvent.click(screen.getByRole("button", { name: "Unlock" }))
    expect(onLockedChange).toHaveBeenCalledWith(false)
    // controlled: the prop still says locked, so the glyph has not moved
    expect(screen.getByRole("button", { name: "Unlock" }).getAttribute("aria-pressed")).toBe("true")
  })

  it("rotates the shackle, and keeps the body still", () => {
    const { container, rerender } = render(<LockButton locked />)
    const shackle = () => container.querySelector("[data-lock-shackle]") as SVGPathElement
    expect(shackle().style.transform).toBe("rotate(0deg)")
    rerender(<LockButton locked={false} />)
    expect(shackle().style.transform).toBe("rotate(35deg)")
    // the body is not part of the moving group: it must never carry a transform
    expect((container.querySelector("rect") as SVGRectElement).getAttribute("transform")).toBeNull()
  })

  it("stays inert when disabled", () => {
    const onLockedChange = vi.fn()
    render(<LockButton locked disabled onLockedChange={onLockedChange} />)
    fireEvent.click(screen.getByRole("button", { name: "Unlock" }))
    expect(onLockedChange).not.toHaveBeenCalled()
  })
})
