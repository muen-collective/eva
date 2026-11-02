"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Toast — a result said at the edge of the screen, not in the flow.
 *
 * A confirmation printed in the page pushes everything below it down: the receipt ends up louder than
 * the change it is confirming. A toast is the same sentence where it cannot move anything.
 *
 * Built on Radix's toast (focus, swipe-to-dismiss, `role="status"`/`aria-live` are its behaviour, not
 * ours). The look is tokens only: the card's ground, a hairline border, and — per the design contract —
 * feedback colour lives **in the border**, with the text staying neutral.
 *
 * The common case is one line:
 *
 *   <Toast>“#d126a1” added as a draft colour</Toast>
 *
 * The parts are exported too, for a consumer that wants to own placement or stack several.
 */
const toastVariants = cva(
  "pointer-events-auto flex w-full items-start gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-foreground shadow-lg data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2",
  {
    variants: {
      tone: {
        default: "border-border",
        success: "border-success/50",
        destructive: "border-destructive/50",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

function ToastProvider({ ...props }: React.ComponentProps<typeof ToastPrimitive.Provider>) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
}

function ToastViewport({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "fixed bottom-4 right-4 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col gap-2 outline-hidden",
        className
      )}
      {...props}
    />
  )
}

function ToastRoot({
  className,
  tone,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-tone={tone ?? "default"}
      className={cn(toastVariants({ tone }), className)}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("min-w-0 text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function ToastAction({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Action>) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        "shrink-0 self-center rounded-md border border-border px-2 py-1 text-xs text-foreground transition-colors hover:border-foreground",
        className
      )}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      className={cn(
        "shrink-0 self-start rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * One message, self-contained: provider, root and viewport, so a screen writes a single element.
 * It closes itself after `duration` (Radix pauses that while the pointer is over it or it has focus).
 */
function Toast({
  children,
  tone = "default",
  duration = 4000,
  onOpenChange,
}: {
  children: React.ReactNode
  tone?: VariantProps<typeof toastVariants>["tone"]
  duration?: number
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = React.useState(true)

  return (
    <ToastProvider swipeDirection="right">
      <ToastRoot
        tone={tone}
        open={open}
        duration={duration}
        onOpenChange={(next) => {
          setOpen(next)
          onOpenChange?.(next)
        }}
      >
        <ToastTitle>{children}</ToastTitle>
      </ToastRoot>
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
}
