import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { ViewStrip, type StripView } from "../components/ui/view-strip"

const frame = (label: string, bg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="320"><rect width="240" height="320" fill="${bg}"/><text x="120" y="170" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#151c17">${label}</text></svg>`
  )}`

const views: StripView[] = [
  { label: "front", src: frame("front", "#d9e6d7"), approved: true },
  { label: "side", src: frame("side", "#e9e2d0") },
  { label: "back", src: frame("back", "#dfe3e8") },
  { label: "detail", src: frame("detail", "#e7dfe6") },
]

const meta = {
  title: "EVA/Composites/ViewStrip",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A look's views as a tablist: arrows move the selection, the label sits on the thumb, and an approved view carries a check.",
      },
    },
  },
  tags: ["autodocs"],
  args: { views, value: 0 },
  render: (args) => {
    function Demo(props: typeof args) {
      const [value, setValue] = React.useState(props.value)
      return (
        <div className="w-[360px]">
          <ViewStrip {...props} value={value} onValueChange={setValue} />
        </div>
      )
    }
    return <Demo {...args} />
  },
} satisfies Meta<typeof ViewStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TwoViews: Story = {
  render: (args) => {
    function Demo(props: typeof args) {
      const [value, setValue] = React.useState(0)
      return (
        <div className="w-[360px]">
          <ViewStrip {...props} views={views.slice(0, 2)} value={value} onValueChange={setValue} />
        </div>
      )
    }
    return <Demo {...args} />
  },
}

export const AllApproved: Story = {
  render: (args) => {
    function Demo(props: typeof args) {
      const [value, setValue] = React.useState(0)
      return (
        <div className="w-[360px]">
          <ViewStrip
            {...props}
            views={views.map((view) => ({ ...view, approved: true }))}
            value={value}
            onValueChange={setValue}
          />
        </div>
      )
    }
    return <Demo {...args} />
  },
}
