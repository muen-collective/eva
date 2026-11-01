import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"

import { Toggle } from "../components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"

afterEach(cleanup)

const filterRow = (props: { onValueChange?: (value: string) => void } = {}) => (
  <ToggleGroup type="single" defaultValue="all" aria-label="Filter boards" {...props}>
    <ToggleGroupItem value="all">All</ToggleGroupItem>
    <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
    <ToggleGroupItem value="published">Published</ToggleGroupItem>
  </ToggleGroup>
)

describe("Toggle", () => {
  it("announces its pressed state and asks to flip it", () => {
    const onPressedChange = vi.fn()
    render(
      <Toggle pressed={false} onPressedChange={onPressedChange} aria-label="Show grid">
        Grid
      </Toggle>
    )
    const button = screen.getByRole("button", { name: "Show grid" })
    expect(button.getAttribute("aria-pressed")).toBe("false")
    fireEvent.click(button)
    expect(onPressedChange).toHaveBeenCalledWith(true)
  })
})

describe("ToggleGroup", () => {
  it("is a radio group in single mode, with one item checked", () => {
    render(filterRow())
    expect(screen.getByRole("radiogroup", { name: "Filter boards" })).toBeTruthy()
    expect(screen.getAllByRole("radio")).toHaveLength(3)
    expect(screen.getByRole("radio", { name: "All" }).getAttribute("aria-checked")).toBe("true")
    expect(screen.getByRole("radio", { name: "Draft" }).getAttribute("aria-checked")).toBe("false")
  })

  it("reports the chosen value and moves the checked state", () => {
    const onValueChange = vi.fn()
    render(filterRow({ onValueChange }))
    fireEvent.click(screen.getByRole("radio", { name: "Draft" }))
    expect(onValueChange).toHaveBeenCalledWith("draft")
    expect(screen.getByRole("radio", { name: "Draft" }).getAttribute("aria-checked")).toBe("true")
  })

  it("is a pressed-button group in multiple mode", () => {
    render(
      <ToggleGroup type="multiple" aria-label="Text style">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    )
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(2)
    expect(buttons[0].getAttribute("aria-pressed")).toBe("false")
  })

  it("keeps a disabled item in place and inert", () => {
    const onValueChange = vi.fn()
    render(
      <ToggleGroup type="single" aria-label="Filter boards" onValueChange={onValueChange}>
        <ToggleGroupItem value="draft" disabled>
          Draft
        </ToggleGroupItem>
      </ToggleGroup>
    )
    const item = screen.getByRole("radio", { name: "Draft" })
    expect(item.hasAttribute("disabled")).toBe(true)
    fireEvent.click(item)
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
