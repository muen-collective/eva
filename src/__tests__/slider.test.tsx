import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"

import { Slider } from "../components/ui/slider"

afterEach(cleanup)

describe("Slider", () => {
  it("is one thumb with role=slider, labelled, and reports its bounds", () => {
    render(<Slider aria-label="Pet size" defaultValue={[128]} min={64} max={192} step={8} />)
    const thumb = screen.getByRole("slider", { name: "Pet size" })
    expect(thumb.getAttribute("aria-valuenow")).toBe("128")
    expect(thumb.getAttribute("aria-valuemin")).toBe("64")
    expect(thumb.getAttribute("aria-valuemax")).toBe("192")
  })

  it("steps with the arrow keys and reports the new value", () => {
    const onValueChange = vi.fn()
    render(
      <Slider aria-label="Pet size" defaultValue={[128]} min={64} max={192} step={8} onValueChange={onValueChange} />
    )
    const thumb = screen.getByRole("slider", { name: "Pet size" })
    fireEvent.keyDown(thumb, { key: "ArrowRight" })
    expect(onValueChange).toHaveBeenCalled()
    expect(onValueChange.mock.calls.at(-1)?.[0]).toEqual([136])
  })

  it("is a range when the value has two numbers", () => {
    render(<Slider aria-label="Span" defaultValue={[20, 60]} />)
    const thumbs = screen.getAllByRole("slider")
    expect(thumbs).toHaveLength(2)
    expect(thumbs[0].getAttribute("aria-valuenow")).toBe("20")
    expect(thumbs[1].getAttribute("aria-valuenow")).toBe("60")
  })

  it("does not move when disabled", () => {
    render(<Slider aria-label="Locked" defaultValue={[50]} disabled />)
    const thumb = screen.getByRole("slider", { name: "Locked" })
    expect(thumb.hasAttribute("data-disabled")).toBe(true)
    fireEvent.keyDown(thumb, { key: "ArrowRight" })
    expect(thumb.getAttribute("aria-valuenow")).toBe("50")
  })
})
