import type { Meta, StoryObj } from "@storybook/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

/**
 * Tabs switch between views of the same thing. The content is either already loaded or free to load — a tab
 * is not a request for the server. When each tab would be a different page with its own URL and its own data,
 * it is navigation, and it belongs in the sidebar.
 *
 * `aria-controls` and the arrow-key behaviour come from Radix, so a tab list is a single stop in the tab
 * order and the arrow keys move between tabs. A list of `<button>`s with `onClick` is not a tab list.
 */
const meta = {
  title: "EVA/Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A set of panels sharing one space, switched by a tab list. Two list variants: default (a filled " +
          "track) and line (an underlined row). Vertical orientation is supported.",
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** The filled track — the default, and what a panel of content uses. */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="references" className="max-w-md">
      <TabsList>
        <TabsTrigger value="references">References</TabsTrigger>
        <TabsTrigger value="looks">Looks</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="references" className="pt-3 text-sm text-muted-foreground">
        62 images, scraped from the campaign brief.
      </TabsContent>
      <TabsContent value="looks" className="pt-3 text-sm text-muted-foreground">
        14 looks styled against this direction.
      </TabsContent>
      <TabsContent value="notes" className="pt-3 text-sm text-muted-foreground">
        No notes yet.
      </TabsContent>
    </Tabs>
  ),
}

/** The line variant, for a section header where a filled track would be too heavy. */
export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="versions">Versions</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-3 text-sm text-muted-foreground">
        The studio's theme, reconciled from two divergent copies.
      </TabsContent>
      <TabsContent value="tokens" className="pt-3 text-sm text-muted-foreground">
        Every contract token is defined, including the ones this theme does not use yet.
      </TabsContent>
      <TabsContent value="versions" className="pt-3 text-sm text-muted-foreground">
        0.6.0 — LockButton, Toggle and ToggleGroup.
      </TabsContent>
    </Tabs>
  ),
}

/** Vertical, for a settings page where the list of sections runs down the side. */
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" className="flex max-w-md gap-4">
      <TabsList className="self-start">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <div className="flex-1 border-l pl-4">
        <TabsContent value="general" className="text-sm text-muted-foreground">
          Workspace name, avatar and default theme.
        </TabsContent>
        <TabsContent value="members" className="text-sm text-muted-foreground">
          Four people have access.
        </TabsContent>
        <TabsContent value="billing" className="text-sm text-muted-foreground">
          Billed annually.
        </TabsContent>
      </div>
    </Tabs>
  ),
}

/** Tabs heading a card — the most common composition, because tab content usually needs a surface. */
export const InACard: Story = {
  render: () => (
    <Card className="max-w-md">
      <Tabs defaultValue="activity">
        <CardHeader>
          <CardTitle>Direction</CardTitle>
          <CardDescription>Wool overcoat, studio light</CardDescription>
          <TabsList variant="line" className="mt-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="activity" className="text-sm text-muted-foreground">
            Styled 14 looks this week.
          </TabsContent>
          <TabsContent value="assets" className="text-sm text-muted-foreground">
            62 references, 14 finals.
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  ),
}
