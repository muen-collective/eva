import type { Meta, StoryObj } from "@storybook/react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

const meta = {
  title: "EVA/Primitives/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** The house schema: a slash, not a chevron. `Home / Ralph Lauren / Moodboards / Quiet Utility`. */
export const HouseSchema: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5 font-mono text-[11px] tracking-[0.12em]">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Ralph Lauren</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Moodboards</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Quiet Utility</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** Two levels, the shallowest a screen ever gets. */
export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5 font-mono text-[11px] tracking-[0.12em]">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Ralph Lauren</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** The default separator, for surfaces that are not the house schema. */
export const Chevron: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Ralph Lauren</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** A long title is the case that breaks a breadcrumb: `break-words` on the list, truncate nowhere. */
export const LongLastCrumb: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList className="max-w-[320px] gap-1.5 font-mono text-[11px] tracking-[0.12em]">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Moodboards</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Quiet utility, technical outerwear for the prefall delivery</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/**
 * Collapsed — the shadcn composition for a trail too long to show.
 *
 * `BreadcrumbEllipsis` is decorative (`role="presentation"`, `aria-hidden`); the *control* is the dropdown
 * around it, which is why the trigger carries its own `sr-only` label. An ellipsis with no accessible name
 * is a dead end for a keyboard or screen-reader user.
 */
export const Collapsed: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5 font-mono text-[11px] tracking-[0.12em]">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon-xs" variant="ghost">
                <BreadcrumbEllipsis />
                <span className="sr-only">Show hidden pages</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Moodboards</DropdownMenuItem>
              <DropdownMenuItem>Fabric board</DropdownMenuItem>
              <DropdownMenuItem>Line sheet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Ralph Lauren</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Quiet Utility</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/**
 * A router link, via `asChild`.
 *
 * The kit does not depend on Next, so the story proves the seam instead: any component that renders an
 * anchor and accepts `href` works here. `asChild` is the radix flavour's prop — the "base" flavour uses
 * Base UI's `render` instead, and copying that snippet into this kit produces an anchor with no href.
 */
export const WithRouterLink: Story = {
  render: () => {
    function RouterLink({ href, children }: { href: string; children: React.ReactNode }) {
      return (
        <a href={href} data-router-link="">
          {children}
        </a>
      )
    }
    return (
      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 font-mono text-[11px] tracking-[0.12em]">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <RouterLink href="/brands">Home</RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <RouterLink href="/brand/ralph-lauren/moodboards">Moodboards</RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Quiet Utility</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  },
}
