/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:fixed oui:inset-0 oui:z-50 oui:bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "oui:bg-background oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:fixed oui:z-50 oui:flex oui:flex-col oui:gap-4 oui:shadow-lg oui:transition oui:ease-in-out oui:data-[state=closed]:duration-300 oui:data-[state=open]:duration-500",
          side === "right" &&
            "oui:data-[state=closed]:slide-out-to-right oui:data-[state=open]:slide-in-from-right oui:inset-y-0 oui:right-0 oui:h-full oui:w-3/4 oui:border-l oui:sm:max-w-sm",
          side === "left" &&
            "oui:data-[state=closed]:slide-out-to-left oui:data-[state=open]:slide-in-from-left oui:inset-y-0 oui:left-0 oui:h-full oui:w-3/4 oui:border-r oui:sm:max-w-sm",
          side === "top" &&
            "oui:data-[state=closed]:slide-out-to-top oui:data-[state=open]:slide-in-from-top oui:inset-x-0 oui:top-0 oui:h-auto oui:border-b",
          side === "bottom" &&
            "oui:data-[state=closed]:slide-out-to-bottom oui:data-[state=open]:slide-in-from-bottom oui:inset-x-0 oui:bottom-0 oui:h-auto oui:border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="oui:ring-offset-background oui:focus:ring-ring oui:data-[state=open]:bg-secondary oui:absolute oui:top-4 oui:right-4 oui:rounded-xs oui:opacity-70 oui:transition-opacity oui:hover:opacity-100 oui:focus:ring-2 oui:focus:ring-offset-2 oui:focus:outline-hidden oui:disabled:pointer-events-none">
          <XIcon className="oui:size-4" />
          <span className="oui:sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("oui:flex oui:flex-col oui:gap-1.5 oui:p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("oui:mt-auto oui:flex oui:flex-col oui:gap-2 oui:p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("oui:text-foreground oui:font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("oui:text-muted-foreground oui:text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
