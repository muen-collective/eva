import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"

afterEach(cleanup)

function House() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/brands">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Ralph Lauren</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

describe("Breadcrumb", () => {
  it("is a navigation landmark with an accessible name", () => {
    render(<House />)
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeTruthy()
  })

  it("marks the last crumb as the current page", () => {
    render(<House />)
    const current = screen.getByText("Ralph Lauren")
    expect(current.getAttribute("aria-current")).toBe("page")
    // and it is not a disabled link, which is what the registry ships and what a screen reader would try
    expect(current.getAttribute("role")).toBeNull()
    expect(current.getAttribute("aria-disabled")).toBeNull()
  })

  it("does not link the current page — it is where you already are", () => {
    render(<House />)
    expect(screen.queryByRole("link", { name: "Ralph Lauren" })).toBeNull()
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/brands")
  })

  it("hides the separator from assistive tech", () => {
    const { container } = render(<House />)
    const sep = container.querySelector('[data-slot="breadcrumb-separator"]')
    expect(sep?.getAttribute("aria-hidden")).toBe("true")
  })
})
