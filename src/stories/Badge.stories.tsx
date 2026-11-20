import type { Meta, StoryObj } from "@storybook/react"
import { Check, Plus } from "lucide-react"

import { Badge } from "../components/ui/badge"

/**
 * A badge is a short label on a thing — a state, a count, a category. It is not a button: if it can be
 * clicked it is a Button with a small size, not a Badge with a click handler.
 *
 * The destructive variant is **tinted**, not solid: a solid red chip in a dense list outranks the row it
 * sits in. Weight belongs to the content, not to the label describing it.
 */
const meta = {
  title: "EVA/Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Label" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      description: "How much attention the label asks for.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A compact label for state or category. Renders a <span>; pass asChild with an <a> to make it a " +
          "link. Not interactive — for a pressable chip use Button with size=\"sm\".",
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Every variant, in the order they escalate from quiet to loud. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="destructive">destructive</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="ghost">ghost</Badge>
      <Badge variant="link">link</Badge>
    </div>
  ),
}

/** With an icon. The icon is inline-start by default and follows the badge's own text colour. */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <Check data-icon="inline-start" />
        Approved
      </Badge>
      <Badge variant="outline">
        <Plus data-icon="inline-start" />
        Draft
      </Badge>
      <Badge variant="secondary">
        Synced
        <Check data-icon="inline-end" />
      </Badge>
    </div>
  ),
}

/**
 * The case that earns the component: a row of looks whose state has to be readable at a glance, without
 * the label competing with the name it sits next to.
 */
export const InContext: Story = {
  render: () => (
    <ul className="flex max-w-md flex-col divide-y rounded-lg border">
      {[
        { name: "Look 01 — wool overcoat", state: "Approved", variant: "default" as const },
        { name: "Look 02 — leather jacket", state: "Needs styling", variant: "outline" as const },
        { name: "Look 03 — knit and denim", state: "Rejected", variant: "destructive" as const },
      ].map((row) => (
        <li key={row.name} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
          <span>{row.name}</span>
          <Badge variant={row.variant}>{row.state}</Badge>
        </li>
      ))}
    </ul>
  ),
}
