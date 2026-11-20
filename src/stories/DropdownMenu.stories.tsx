import type { Meta, StoryObj } from "@storybook/react"
import { Copy, Download, LogOut, Settings, Share2, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"

/**
 * A dropdown menu is a list of **commands** behind one button. Every item does something the moment it is
 * chosen; nothing here sets a value for a form. If the list sets a value, it is a Select — and if the list
 * is navigation to other pages, it is links in a menu, not actions.
 *
 * Destructive commands sit last, below a separator, and are the only red text in the list. Grouping is the
 * menu's whole structure: labels name groups, separators close them, and nothing is grouped by accident.
 */
const meta = {
  title: "EVA/Primitives/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A menu of commands anchored to a trigger. Supports groups, checkbox and radio items, shortcuts, " +
          "and nested submenus. Radix provides the roving focus, typeahead and Escape handling.",
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/** The shape most menus take: a couple of actions, a separator, then the destructive one alone. */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <Copy />
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          Export
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** Grouped with labelled sections — how a menu stays scannable once it has more than five items. */
export const WithGroupsAndSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Board</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Spring campaign</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Open</DropdownMenuItem>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Outerwear</DropdownMenuItem>
              <DropdownMenuItem>Knitwear</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut />
            Leave board
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** Checkbox items: several can be on, and the menu stays open so the set can be built up in one visit. */
export const CheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Show</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem defaultChecked>Reference</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>Final</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Notes</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem disabled>History</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** Radio items: exactly one, for a view mode. The difference from a Select is that changing it is a command. */
export const RadioItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuRadioGroup defaultValue="grid">
          <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="board">Board</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
