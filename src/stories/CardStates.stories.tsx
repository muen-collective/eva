import type { Meta, StoryObj } from "@storybook/react"

/**
 * The card has four states.
 *
 * Hover and focus are transient and belong to the browser; **selected** and **disabled** are persistent
 * facts about the card, so they are a `data-state` the surface sets. The theme owns the material:
 * selected takes the plate and an inset hairline (the box does not move), disabled is the same card at
 * half weight with no pointer.
 *
 * The second card is the hover state — it is identical to inactive until you put the pointer on it.
 */
const demos = [
  { label: "inactive", state: "inactive", note: "at rest" },
  { label: "hover", state: "inactive", note: "hover the card" },
  { label: "selected", state: "selected", note: "the plate and the hairline" },
  { label: "disabled", state: "disabled", note: "half weight, no pointer" },
] as const

function CardStates() {
  return (
    <div className="p-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {demos.map((demo) => (
          <div key={demo.label}>
            <p className="mb-3 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
              {demo.label}
            </p>
            <div className="eva-card" data-state={demo.state}>
              <div className="aspect-[4/3] rounded-[16px] bg-muted" />
              <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                board · state
              </p>
              <p className="text-[15px] font-medium text-foreground">Rumpled Heirloom</p>
              <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                9 pins · unpublished
              </p>
            </div>
            <p className="mt-2 font-mono text-[9px] tracking-[0.06em] text-muted-foreground">
              {demo.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta = {
  title: "EVA/Foundations/Card states",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const States: Story = { render: () => <CardStates /> }
