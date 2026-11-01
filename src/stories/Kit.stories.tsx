import type { Meta, StoryObj } from "@storybook/react"

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Badge } from "../components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible"
import { DatePicker } from "../components/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { ScrollArea } from "../components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Separator } from "../components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { Skeleton } from "../components/ui/skeleton"
import { Stepper } from "../components/ui/stepper"
import { Switch } from "../components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Textarea } from "../components/ui/textarea"

/**
 * The whole kit, on the Muen theme, in one place.
 *
 * This exists because the Storybook had five stories for twenty-four primitives, and a short list reads as
 * a short kit. It is deliberately **not** a test: it is the index a designer opens to answer "does the kit
 * have a table, and what does it look like here". Each primitive that has a story of its own is listed with
 * its own name; this page just proves they all exist and all wear the same theme.
 */

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-5">
      <h2 className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">{title}</h2>
      {note ? <p className="mt-1 max-w-xl text-xs text-muted-foreground">{note}</p> : null}
      <div className="mt-3 flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

const meta = {
  title: "EVA/Kit",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllPrimitives: Story = {
  render: () => (
    <div className="max-w-5xl space-y-6 pb-24">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">The kit</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Twenty-four primitives on Radix, wearing the Muen theme. The toolbar switches to the kit&apos;s own
          dark default — the same component, a different set of token values, and nothing else changes.
        </p>
      </header>

      <Section title="button" note="variants are the semantic set: ink is the action, red is status only">
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="secondary">Duplicate</Button>
        <Button variant="ghost">Dismiss</Button>
        <Button variant="destructive">Archive</Button>
        <Button variant="link">Read the brief</Button>
        <Button size="sm">Small</Button>
        <Button size="xs">Extra small</Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Section title="badge">
        <Badge>published</Badge>
        <Badge variant="secondary">draft</Badge>
        <Badge variant="outline">locked</Badge>
        <Badge variant="destructive">blocked</Badge>
      </Section>

      <Section title="alert" note="a stated condition, not a decoration">
        <Alert className="w-full max-w-md">
          <AlertTitle>No fabric swatches yet</AlertTitle>
          <AlertDescription>
            A swatch is a material with a source, a MOQ and a price behind it.
          </AlertDescription>
        </Alert>
      </Section>

      <Section title="card">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Quiet Utility</CardTitle>
            <CardDescription>Workwear softened by time.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">9 pins · 3 materials</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="input · textarea · label · switch">
        <div className="w-56 space-y-1.5">
          <Label htmlFor="kit-name">Board title</Label>
          <Input id="kit-name" placeholder="Quiet Utility" />
        </div>
        <div className="w-56">
          <Textarea placeholder="A description, one or two lines." rows={2} />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="kit-switch" />
          <Label htmlFor="kit-switch">Immovable date</Label>
        </div>
      </Section>

      <Section title="select">
        <Select defaultValue="fw27">
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fw27">FW2027 Womenswear</SelectItem>
            <SelectItem value="casting">FW2027 Women Casting</SelectItem>
          </SelectContent>
        </Select>
      </Section>

      <Section title="date-picker · calendar">
        <DatePicker value="2027-02-03" />
        <Calendar mode="single" selected={new Date(2027, 1, 3)} defaultMonth={new Date(2027, 1, 1)} />
      </Section>

      <Section title="tabs">
        <Tabs defaultValue="themes" className="w-80">
          <TabsList>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="looks">Looks</TabsTrigger>
          </TabsList>
          <TabsContent value="themes" className="text-sm text-muted-foreground">
            Fifteen themes, one per direction.
          </TabsContent>
          <TabsContent value="looks" className="text-sm text-muted-foreground">
            Looks hang from themes.
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Board</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Pins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Quiet Utility</TableCell>
              <TableCell>draft</TableCell>
              <TableCell className="text-right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Terrain</TableCell>
              <TableCell>published</TableCell>
              <TableCell className="text-right">6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section title="skeleton">
        <div className="w-64 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Section>

      <Section title="separator">
        <div className="w-64 space-y-3">
          <p className="text-sm text-foreground">Above the rule</p>
          <Separator />
          <p className="text-sm text-foreground">Below the rule</p>
        </div>
      </Section>

      <Section title="breadcrumb">
        <Breadcrumb>
          <BreadcrumbList className="gap-1.5 font-mono text-[11px] tracking-[0.12em]">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
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
      </Section>

      <Section title="stepper" note="its steps are data, not children — the component owns the layout">
        <Stepper
          className="w-full max-w-xl"
          steps={[
            { id: "brief", label: "brief" },
            { id: "cast", label: "cast" },
            { id: "style", label: "style" },
            { id: "publish", label: "publish" },
          ]}
          activeIndex={1}
          onActiveIndexChange={() => {}}
          orientation="horizontal"
          variant="circle"
          size="md"
        />
      </Section>

      <Section title="overlays" note="dialog · alert-dialog · sheet · dropdown · popover · collapsible — each opens on click">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New moodboard</DialogTitle>
              <DialogDescription>A dialog keeps the list behind it.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Alert dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Lock this board?</AlertDialogTitle>
              <AlertDialogDescription>A locked board is read-only and export-only.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Lock</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>The shelf</SheetTitle>
              <SheetDescription>Drafts that are not on a wall.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Publish</DropdownMenuItem>
            <DropdownMenuItem>Lock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="text-sm">
            A popover is not modal: the board stays visible behind it.
          </PopoverContent>
        </Popover>

        <Collapsible className="w-64">
          <CollapsibleTrigger asChild>
            <Button variant="ghost">Collapsible</Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 text-sm text-muted-foreground">
            Hidden until you ask for it.
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Section title="scroll-area">
        <ScrollArea className="h-32 w-64 border border-border p-3">
          <div className="space-y-2">
            {Array.from({ length: 12 }, (_, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                Reference {index + 1}
              </p>
            ))}
          </div>
        </ScrollArea>
      </Section>
    </div>
  ),
}
