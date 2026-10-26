import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const meta = {
  title: "EVA/Foundations/Theme",
  component: Card,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const DarkEVA: Story = {
  render: () => (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Dark EVA</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Badge>Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Alert</Badge>
      </CardContent>
    </Card>
  ),
}
