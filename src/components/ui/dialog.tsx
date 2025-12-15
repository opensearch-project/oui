/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:fixed oui:inset-0 oui:z-50 oui:bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "oui:bg-background oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-95 oui:fixed oui:top-[50%] oui:left-[50%] oui:z-50 oui:grid oui:w-full oui:max-w-[calc(100%-2rem)] oui:translate-x-[-50%] oui:translate-y-[-50%] oui:gap-4 oui:rounded-lg oui:border oui:p-6 oui:shadow-lg oui:duration-200 oui:sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="oui:ring-offset-background oui:focus:ring-ring oui:data-[state=open]:bg-accent oui:data-[state=open]:text-muted-foreground oui:absolute oui:top-4 oui:right-4 oui:rounded-xs oui:opacity-70 oui:transition-opacity oui:hover:opacity-100 oui:focus:ring-2 oui:focus:ring-offset-2 oui:focus:outline-hidden oui:disabled:pointer-events-none oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4"
          >
            <XIcon />
            <span className="oui:sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("oui:flex oui:flex-col oui:gap-2 oui:text-center oui:sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "oui:flex oui:flex-col-reverse oui:gap-2 oui:sm:flex-row oui:sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("oui:text-lg oui:leading-none oui:font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("oui:text-muted-foreground oui:text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
