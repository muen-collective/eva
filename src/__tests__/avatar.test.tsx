import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "../components/ui/avatar"

import { afterEach } from "vitest"

afterEach(cleanup)

describe("Avatar", () => {
  it("shows initials when there is no image — the fallback is the default face here", () => {
    render(
      <Avatar data-testid="a">
        <AvatarFallback>TP</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByText("TP").textContent).toBe("TP")
  })

  it("names an at-limit badge for assistive tech, and hides a decorative one", () => {
    render(
      <Avatar>
        <AvatarFallback>JN</AvatarFallback>
        <AvatarBadge aria-label="at the limit" />
      </Avatar>,
    )
    expect(screen.getByLabelText("at the limit").getAttribute("aria-hidden")).toBeNull()
  })

  it("leaves an unlabelled badge out of the accessibility tree", () => {
    render(
      <Avatar>
        <AvatarFallback>JU</AvatarFallback>
        <AvatarBadge className="bg-destructive" />
      </Avatar>,
    )
    // the badge with no aria-label is aria-hidden: nothing to query by name
    expect(document.querySelector('[data-slot="avatar-badge"]')?.getAttribute("aria-hidden")).toBe("true")
  })
})

describe("AvatarGroup", () => {
  it("is one labelled group of faces, not a list", () => {
    render(
      <AvatarGroup aria-label="Who works here">
        <Avatar>
          <AvatarFallback>TP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JN</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    )
    const group = screen.getByRole("group", { name: "Who works here" })
    expect(group.querySelectorAll('[data-slot="avatar"]').length).toBe(2)
  })

  it("folds the remainder as a count that reads inside the group", () => {
    render(
      <AvatarGroup aria-label="Who works here">
        <Avatar>
          <AvatarFallback>TP</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>,
    )
    const group = screen.getByRole("group", { name: "Who works here" })
    expect(group.textContent).toContain("+3")
  })
})
