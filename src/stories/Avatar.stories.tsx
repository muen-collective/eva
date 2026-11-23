import type { Meta, StoryObj } from "@storybook/react"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "../components/ui/avatar"

const meta = {
  title: "EVA/Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** The fallback is the default face in this system — nobody has uploaded a picture, initials carry it. */
export const Initials: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="font-mono text-[10px]">TP</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <img src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

/** A badge means at-limit, not online-presence — the caller supplies the colour token. */
export const AtLimit: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="font-mono text-[10px]">JN</AvatarFallback>
      <AvatarBadge aria-label="at the limit" className="bg-destructive" />
    </Avatar>
  ),
}

/** Faces touching: the group says "one board" in a way separated circles cannot. */
export const Group: Story = {
  render: () => (
    <AvatarGroup aria-label="Who works here">
      {["TP", "JN", "JU"].map((who) => (
        <Avatar key={who}>
          <AvatarFallback className="font-mono text-[10px]">{who}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}

/** Folded past four; the count is styled as a face so it sits in the same rhythm. */
export const GroupFolded: Story = {
  render: () => (
    <AvatarGroup aria-label="Who works here">
      {["TP", "JN", "JU", "PR"].map((who) => (
        <Avatar key={who}>
          <AvatarFallback className="font-mono text-[10px]">{who}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}

/** Long initials and a narrow container must not push the faces apart or overflow the ring. */
export const Narrow: Story = {
  render: () => (
    <div style={{ width: 72 }}>
      <AvatarGroup aria-label="Who works here">
        {["Pavan Kumar P S", "United Bamboo"].map((name) => (
          <Avatar key={name}>
            <AvatarFallback className="font-mono text-[10px]">
              {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  ),
}
