/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "oui:bg-popover oui:text-popover-foreground oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-95 oui:data-[side=bottom]:slide-in-from-top-2 oui:data-[side=left]:slide-in-from-right-2 oui:data-[side=right]:slide-in-from-left-2 oui:data-[side=top]:slide-in-from-bottom-2 oui:z-50 oui:max-h-(--radix-dropdown-menu-content-available-height) oui:min-w-[8rem] oui:origin-(--radix-dropdown-menu-content-transform-origin) oui:overflow-x-hidden oui:overflow-y-auto oui:rounded-md oui:border oui:p-1 oui:shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:data-[variant=destructive]:text-destructive oui:data-[variant=destructive]:focus:bg-destructive/10 oui:dark:data-[variant=destructive]:focus:bg-destructive/20 oui:data-[variant=destructive]:focus:text-destructive oui:data-[variant=destructive]:*:[svg]:!text-destructive oui:[&_svg:not([class*=text-])]:text-muted-foreground oui:relative oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-sm oui:px-2 oui:py-1.5 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled]:pointer-events-none oui:data-[disabled]:opacity-50 oui:data-[inset]:pl-8 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:relative oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-sm oui:py-1.5 oui:pr-2 oui:pl-8 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled]:pointer-events-none oui:data-[disabled]:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="oui:pointer-events-none oui:absolute oui:left-2 oui:flex oui:size-3.5 oui:items-center oui:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="oui:size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:relative oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-sm oui:py-1.5 oui:pr-2 oui:pl-8 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled]:pointer-events-none oui:data-[disabled]:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span className="oui:pointer-events-none oui:absolute oui:left-2 oui:flex oui:size-3.5 oui:items-center oui:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="oui:size-2 oui:fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "oui:px-2 oui:py-1.5 oui:text-sm oui:font-medium oui:data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("oui:bg-border oui:-mx-1 oui:my-1 oui:h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "oui:text-muted-foreground oui:ml-auto oui:text-xs oui:tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:data-[state=open]:bg-accent oui:data-[state=open]:text-accent-foreground oui:[&_svg:not([class*=text-])]:text-muted-foreground oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-sm oui:px-2 oui:py-1.5 oui:text-sm oui:outline-hidden oui:select-none oui:data-[inset]:pl-8 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="oui:ml-auto oui:size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "oui:bg-popover oui:text-popover-foreground oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-95 oui:data-[side=bottom]:slide-in-from-top-2 oui:data-[side=left]:slide-in-from-right-2 oui:data-[side=right]:slide-in-from-left-2 oui:data-[side=top]:slide-in-from-bottom-2 oui:z-50 oui:min-w-[8rem] oui:origin-(--radix-dropdown-menu-content-transform-origin) oui:overflow-hidden oui:rounded-md oui:border oui:p-1 oui:shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
