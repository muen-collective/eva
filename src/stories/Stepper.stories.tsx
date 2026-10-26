import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import {
  Stepper,
  StepperActions,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../components/ui/stepper"
import { Button } from "../components/ui/button"

const meta = {
  title: "EVA/Composites/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    variant: "circle",
    size: "md",
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const horizontalSteps = [
  { id: "account", label: "Account", description: "Your credentials" },
  { id: "profile", label: "Profile", description: "Personal details" },
  { id: "review", label: "Review", description: "Confirm and finish" },
]

const longSteps = [
  { id: "intro", label: "Introduction" },
  { id: "basics", label: "Basics" },
  { id: "advanced", label: "Advanced" },
  { id: "practice", label: "Practice" },
  { id: "certification", label: "Certification" },
]

function HorizontalPlayground() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex w-full flex-col gap-6">
      <Stepper
        steps={horizontalSteps}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        orientation="horizontal"
      >
        <StepperNav>
          {horizontalSteps.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id}>
              <StepperTrigger>
                <StepperIndicator />
                <span className="flex flex-col gap-1">
                  <StepperTitle>{step.label}</StepperTitle>
                  {step.description ? <StepperDescription>{step.description}</StepperDescription> : null}
                </span>
              </StepperTrigger>
              {index < horizontalSteps.length - 1 ? <StepperSeparator /> : null}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="rounded-lg border border-border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">Step {activeIndex + 1} of {horizontalSteps.length}</p>
          <h3 className="mt-1 text-base font-semibold">{horizontalSteps[activeIndex]?.label}</h3>
        </StepperPanel>

        <StepperActions>
          <Button variant="secondary" disabled={activeIndex === 0} onClick={() => setActiveIndex((prev) => prev - 1)}>
            Back
          </Button>
          <Button onClick={() => setActiveIndex((prev) => Math.min(prev + 1, horizontalSteps.length - 1))}>
            {activeIndex === horizontalSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </StepperActions>
      </Stepper>
    </div>
  )
}

function VerticalPlayground() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex w-full flex-col gap-6">
      <Stepper
        steps={longSteps}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        orientation="vertical"
      >
        <StepperNav className="w-full max-w-xs shrink-0">
          {longSteps.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id}>
              <StepperTrigger className="w-full items-start gap-3 rounded-lg px-1 py-1 text-left">
                <StepperIndicator />
                <span className="min-w-0 pt-0.5">
                  <StepperTitle className="truncate">{step.label}</StepperTitle>
                </span>
              </StepperTrigger>
              {index < longSteps.length - 1 ? <StepperSeparator className="ml-4 h-6" /> : null}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="flex-1 rounded-lg border border-border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">Step {activeIndex + 1} of {longSteps.length}</p>
          <h3 className="mt-1 text-base font-semibold">{longSteps[activeIndex]?.label}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Content is rendered beside the rail so the wizard keeps its track while each step owns its own panel.
          </p>
          <StepperActions className="mt-6">
            <Button variant="secondary" disabled={activeIndex === 0} onClick={() => setActiveIndex((prev) => prev - 1)}>
              Back
            </Button>
            <Button onClick={() => setActiveIndex((prev) => Math.min(prev + 1, longSteps.length - 1))}>
              {activeIndex === longSteps.length - 1 ? "Finish" : "Next"}
            </Button>
          </StepperActions>
        </StepperPanel>
      </Stepper>
    </div>
  )
}

export const Horizontal: Story = {
  args: { steps: horizontalSteps },
  render: () => <HorizontalPlayground />,
}

export const Vertical: Story = {
  args: {
    steps: horizontalSteps,
    orientation: "vertical",
  },
  render: () => <VerticalPlayground />,
}

export const Sizes: Story = {
  args: { steps: horizontalSteps },
  render: () => (
    <div className="flex flex-col gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase text-muted-foreground">{size}</p>
          <Stepper
            steps={horizontalSteps}
            activeIndex={1}
            orientation="horizontal"
            size={size}
          >
            <StepperNav>
              {horizontalSteps.map((step, index) => (
                <StepperItem key={step.id} stepId={step.id}>
                  <StepperTrigger>
                    <StepperIndicator />
                    <span className="flex flex-col gap-1">
                      <StepperTitle>{step.label}</StepperTitle>
                    </span>
                  </StepperTrigger>
                  {index < horizontalSteps.length - 1 ? <StepperSeparator /> : null}
                </StepperItem>
              ))}
            </StepperNav>
          </Stepper>
        </div>
      ))}
    </div>
  ),
}

export const Loading: Story = {
  args: { steps: horizontalSteps },
  render: () => (
    <Stepper
      steps={horizontalSteps}
      activeIndex={1}
      orientation="horizontal"
      state="loading"
    >
      <StepperNav>
        {horizontalSteps.map((step, index) => (
          <StepperItem key={step.id} stepId={step.id}>
            <StepperTrigger>
              <StepperIndicator />
              <span className="flex flex-col gap-1">
                <StepperTitle>{step.label}</StepperTitle>
              </span>
            </StepperTrigger>
            {index < horizontalSteps.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  ),
}

export const Error: Story = {
  args: { steps: horizontalSteps },
  render: () => (
    <Stepper
      steps={horizontalSteps}
      activeIndex={2}
      orientation="horizontal"
      state="error"
    >
      <StepperNav>
        {horizontalSteps.map((step, index) => (
          <StepperItem key={step.id} stepId={step.id}>
            <StepperTrigger>
              <StepperIndicator />
              <span className="flex flex-col gap-1">
                <StepperTitle>{step.label}</StepperTitle>
              </span>
            </StepperTrigger>
            {index < horizontalSteps.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  ),
}
