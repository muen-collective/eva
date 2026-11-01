import type { Meta, StoryObj } from "@storybook/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

const meta = {
  title: "EVA/Primitives/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: "palette", title: "Palette", body: "Five fixed chips: wall, ink, grey, brand, warning." },
  { value: "swatches", title: "Fabric swatches", body: "No swatches yet — materials land with epic 11." },
  { value: "references", title: "References", body: "Six pins, one of them a Pinterest save." },
]

/** Single-open is the house default: one answer on screen at a time. */
export const Single: Story = {
  args: { type: "single", collapsible: true },
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

/** Several open at once, when comparing matters more than focus. */
export const Multiple: Story = {
  args: { type: "multiple", defaultValue: ["palette", "swatches"] },
  render: () => (
    <Accordion type="multiple" defaultValue={["palette", "swatches"]} className="w-96">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

/** A disabled row still has to look like a row — not like a gap. */
export const DisabledItem: Story = {
  args: { type: "single", collapsible: true },
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="palette">
        <AccordionTrigger>Palette</AccordionTrigger>
        <AccordionContent>Five fixed chips.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="locked" disabled>
        <AccordionTrigger>Locked board</AccordionTrigger>
        <AccordionContent>Read-only.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
