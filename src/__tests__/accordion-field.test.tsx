import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { Field, FieldDescription, FieldError, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"

afterEach(cleanup)

describe("Accordion", () => {
  it("exposes each trigger as a button with its title", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="palette">
          <AccordionTrigger>Palette</AccordionTrigger>
          <AccordionContent>Five chips.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole("button", { name: "Palette" })).toBeTruthy()
  })

  it("keeps the closed panel out of the accessibility tree", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="palette">
          <AccordionTrigger>Palette</AccordionTrigger>
          <AccordionContent>Five chips.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.queryByText("Five chips.")).toBeNull()
  })
})

describe("Field", () => {
  it("associates the label with the control", () => {
    render(
      <Field>
        <FieldLabel htmlFor="t">Title</FieldLabel>
        <Input id="t" />
        <FieldDescription>One or two words.</FieldDescription>
      </Field>
    )
    expect(screen.getByLabelText("Title")).toBeTruthy()
    expect(screen.getByText("One or two words.")).toBeTruthy()
  })

  it("renders the error message where the field can announce it", () => {
    render(
      <Field data-invalid="">
        <FieldLabel htmlFor="t2">Title</FieldLabel>
        <Input id="t2" aria-invalid />
        <FieldError errors={[{ message: "A board needs a title." }]} />
      </Field>
    )
    expect(screen.getByText("A board needs a title.")).toBeTruthy()
  })
})
