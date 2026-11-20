import type { Meta, StoryObj } from "@storybook/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Switch } from "../components/ui/switch"
import { Separator } from "../components/ui/separator"

/**
 * Everything on this page is painted by tokens, so switching the theme in the toolbar repaints all of it at
 * once — that is the whole claim the design system makes, and this is where you can check it.
 *
 * Muen is the default here because it is the harder case. The kit's Dark EVA (Unit 01) is still one click
 * away in the toolbar, and a component that looks right in one and wrong in the other is a token bug, not a
 * theme preference.
 */
const meta = {
  title: "EVA/Foundations/Theme",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The token contract, rendered. Every surface, ink and feedback colour a theme defines, shown with " +
          "the components that use it. Switch the theme in the toolbar to see the same markup in the other " +
          "palette.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const surfaces = [
  { name: "--background", cls: "bg-background" },
  { name: "--card", cls: "bg-card" },
  { name: "--popover", cls: "bg-popover" },
  { name: "--muted", cls: "bg-muted" },
  { name: "--accent", cls: "bg-accent" },
  { name: "--inverse", cls: "bg-inverse" },
]

const inks = [
  { name: "--primary", cls: "bg-primary" },
  { name: "--secondary", cls: "bg-secondary" },
  { name: "--tertiary", cls: "bg-tertiary" },
  { name: "--brand", cls: "bg-brand" },
  { name: "--ring", cls: "bg-ring" },
  { name: "--border", cls: "bg-border" },
]

const feedback = [
  { name: "--destructive", cls: "bg-destructive" },
  { name: "--success", cls: "bg-success" },
  { name: "--warning", cls: "bg-warning" },
  { name: "--info", cls: "bg-info" },
]

function Swatch({ name, cls }: { name: string; cls: string }) {
  return (
    <div className="space-y-1.5">
      <div className={`h-12 w-full rounded-md border ${cls}`} />
      <div className="font-mono text-xs text-muted-foreground">{name}</div>
    </div>
  )
}

/**
 * The surfaces a theme defines, in one row.
 *
 * In this theme they are deliberately close: Muen is the wall as the page **and** as the card, so
 * `--background`, `--card` and `--accent` sit within a few percent of each other and depth comes from the
 * card's border and inset stroke rather than from a value jump. That is the Muen material, not a missing
 * token — switch to EVA Unit 01 in the toolbar to see the same row separate sharply.
 */
export const Surfaces: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
      {surfaces.map((s) => (
        <Swatch key={s.name} {...s} />
      ))}
    </div>
  ),
}

/** The ink: the brand triad, `--brand`, the focus ring and the border colour. */
export const Ink: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
      {inks.map((s) => (
        <Swatch key={s.name} {...s} />
      ))}
    </div>
  ),
}

/** Feedback, which in this kit is status only and never an action. */
export const Feedback: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
      {feedback.map((s) => (
        <Swatch key={s.name} {...s} />
      ))}
    </div>
  ),
}

/**
 * The tokens in use rather than in a row. Everything here reads its colour from the theme — nothing on this
 * card contains a literal.
 */
export const InUse: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Direction locked</CardTitle>
        <CardDescription>Wool overcoat, studio light, four views.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Rejected</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
        <Separator />
        <Input placeholder="Board name" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Share to feed</span>
          <Switch defaultChecked aria-label="Share to feed" />
        </div>
        <div className="flex gap-2">
          <Button>Run swap</Button>
          <Button variant="outline">Preview</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  ),
}
