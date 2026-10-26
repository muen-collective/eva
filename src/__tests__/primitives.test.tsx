import { describe, expect, it } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  cn,
} from "../index"

describe("mitsu-ui public API", () => {
  it("exports cn()", () => {
    expect(cn("a", "b")).toBe("a b")
    expect(cn("px-2", "px-4")).toBe("px-4") // tailwind-merge dedupe
  })

  it("Button renders with variant classes", () => {
    const { container } = render(<Button variant="secondary">Save</Button>)
    const button = container.querySelector("button")
    expect(button?.textContent).toBe("Save")
    expect(button?.className).toContain("secondary")
  })

  it("Badge renders", () => {
    render(<Badge>Beta</Badge>)
    expect(screen.getByText("Beta")).toBeTruthy()
  })

  it("Card composes subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    )
    expect(screen.getByText("Title")).toBeTruthy()
    expect(screen.getByText("Desc")).toBeTruthy()
    expect(screen.getByText("Body")).toBeTruthy()
  })

  it("Alert renders with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Details</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Heads up")).toBeTruthy()
    expect(screen.getByText("Details")).toBeTruthy()
  })

  it("form controls render", () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Jane" />
        <Textarea placeholder="Notes" />
      </>
    )
    expect(screen.getByLabelText("Name")).toBeTruthy()
    expect(screen.getByPlaceholderText("Jane")).toBeTruthy()
    expect(screen.getByPlaceholderText("Notes")).toBeTruthy()
  })

  it("Separator and Skeleton render", () => {
    const { container } = render(
      <>
        <Separator />
        <Skeleton className="h-4 w-4" />
      </>
    )
    expect(container.querySelector('[data-slot="separator"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="skeleton"]')).toBeTruthy()
  })

  it("Switch toggles on click", () => {
    render(<Switch aria-label="enable" />)
    const sw = screen.getByRole("switch")
    expect(sw.getAttribute("data-state")).toBe("unchecked")
    fireEvent.click(sw)
    expect(sw.getAttribute("data-state")).toBe("checked")
  })

  it("Tabs switch content on trigger activation", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>
    )
    expect(screen.getByText("Content A")).toBeTruthy()
    // Radix Tabs activates on mousedown (not click) for faster response
    fireEvent.mouseDown(screen.getByRole("tab", { name: "B" }))
    expect(screen.getByText("Content B")).toBeTruthy()
  })

  it("Dialog opens on trigger click", () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.queryByText("Dialog title")).toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "Open" }))
    expect(screen.getByText("Dialog title")).toBeTruthy()
  })
})
