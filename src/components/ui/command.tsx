/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "oui:bg-popover oui:text-popover-foreground oui:flex oui:h-full oui:w-full oui:flex-col oui:overflow-hidden oui:rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="oui:sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("oui:overflow-hidden oui:p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="oui:[&_[cmdk-group-heading]]:text-muted-foreground oui:**:data-[slot=command-input-wrapper]:h-12 oui:[&_[cmdk-group-heading]]:px-2 oui:[&_[cmdk-group-heading]]:font-medium oui:[&_[cmdk-group]]:px-2 oui:[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 oui:[&_[cmdk-input-wrapper]_svg]:h-5 oui:[&_[cmdk-input-wrapper]_svg]:w-5 oui:[&_[cmdk-input]]:h-12 oui:[&_[cmdk-item]]:px-2 oui:[&_[cmdk-item]]:py-3 oui:[&_[cmdk-item]_svg]:h-5 oui:[&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="oui:flex oui:h-9 oui:items-center oui:gap-2 oui:border-b oui:px-3"
    >
      <SearchIcon className="oui:size-4 oui:shrink-0 oui:opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "oui:placeholder:text-muted-foreground oui:flex oui:h-10 oui:w-full oui:rounded-md oui:bg-transparent oui:py-3 oui:text-sm oui:outline-hidden oui:disabled:cursor-not-allowed oui:disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "oui:max-h-[300px] oui:scroll-py-1 oui:overflow-x-hidden oui:overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="oui:py-6 oui:text-center oui:text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "oui:text-foreground oui:[&_[cmdk-group-heading]]:text-muted-foreground oui:overflow-hidden oui:p-1 oui:[&_[cmdk-group-heading]]:px-2 oui:[&_[cmdk-group-heading]]:py-1.5 oui:[&_[cmdk-group-heading]]:text-xs oui:[&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("oui:bg-border oui:-mx-1 oui:h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "oui:data-[selected=true]:bg-accent oui:data-[selected=true]:text-accent-foreground oui:[&_svg:not([class*=text-])]:text-muted-foreground oui:relative oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-sm oui:px-2 oui:py-1.5 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled=true]:pointer-events-none oui:data-[disabled=true]:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "oui:text-muted-foreground oui:ml-auto oui:text-xs oui:tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
