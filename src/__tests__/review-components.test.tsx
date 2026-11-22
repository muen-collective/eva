import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"

import { CompareStage } from "../components/ui/compare-stage"
import { ViewStrip } from "../components/ui/view-strip"
import { ReviewCard } from "../components/ui/review-card"

afterEach(cleanup)

describe("CompareStage", () => {
  it("is a slider in wipe mode and the arrow keys move it", () => {
    render(<CompareStage before="/before.png" after="/after.png" />)
    const stage = screen.getByRole("slider", { name: "Before and after wipe" })
    expect(stage.getAttribute("aria-valuenow")).toBe("50")
    fireEvent.keyDown(stage, { key: "ArrowRight" })
    expect(Number(stage.getAttribute("aria-valuenow"))).toBeGreaterThan(50)
    fireEvent.keyDown(stage, { key: "Home" })
    expect(stage.getAttribute("aria-valuenow")).toBe("0")
  })

  it("trades the slider for two frames in side-by-side mode", () => {
    render(<CompareStage before="/before.png" after="/after.png" defaultMode="split" />)
    expect(screen.queryByRole("slider")).toBeNull()
    expect(screen.getByText("before")).toBeTruthy()
    expect(screen.getByText("after")).toBeTruthy()
  })

  it("reports a mode change the caller can control", () => {
    const onModeChange = vi.fn()
    render(<CompareStage before="/before.png" after="/after.png" onModeChange={onModeChange} />)
    fireEvent.click(screen.getByRole("button", { name: "side by side" }))
    expect(onModeChange).toHaveBeenCalledWith("split")
  })
})

describe("ViewStrip", () => {
  const views = [
    { label: "front", src: "/front.png", approved: true },
    { label: "side", src: "/side.png" },
    { label: "back", src: "/back.png" },
  ]

  it("announces the selected view and moves with the arrows", () => {
    const onValueChange = vi.fn()
    render(<ViewStrip views={views} value={0} onValueChange={onValueChange} />)
    expect(screen.getByRole("tablist", { name: "Views" })).toBeTruthy()
    expect(screen.getByRole("tab", { name: /front/ }).getAttribute("aria-selected")).toBe("true")
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" })
    expect(onValueChange).toHaveBeenCalledWith(1)
  })

  it("marks an approved view in its name", () => {
    render(<ViewStrip views={views} value={0} />)
    expect(screen.getByRole("tab", { name: "front, approved" })).toBeTruthy()
  })
})

describe("ReviewCard", () => {
  it("reads approved n/m and marks full approval", () => {
    render(<ReviewCard src="/cover.png" number="001" title="Look" approved={4} total={4} />)
    expect(screen.getByText(/approved 4\/4/)).toBeTruthy()
  })

  it("is one button and disabled when asked", () => {
    render(<ReviewCard src="/cover.png" number="001" title="Look" approved={0} total={4} disabled />)
    const card = screen.getByRole("button", { name: /Look/ })
    expect(card.hasAttribute("disabled")).toBe(true)
  })
})
