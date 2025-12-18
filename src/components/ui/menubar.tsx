/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "oui:bg-background oui:flex oui:h-9 oui:items-center oui:gap-1 oui:rounded-md oui:border oui:p-1 oui:shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:data-[state=open]:bg-accent oui:data-[state=open]:text-accent-foreground oui:flex oui:items-center oui:rounded-sm oui:px-2 oui:py-1 oui:text-sm oui:font-medium oui:outline-hidden oui:select-none",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "oui:bg-popover oui:text-popover-foreground oui:data-[state=open]:animate-in oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-95 oui:data-[side=bottom]:slide-in-from-top-2 oui:data-[side=left]:slide-in-from-right-2 oui:data-[side=right]:slide-in-from-left-2 oui:data-[side=top]:slide-in-from-bottom-2 oui:z-50 oui:min-w-[12rem] oui:origin-(--radix-menubar-content-transform-origin) oui:overflow-hidden oui:rounded-md oui:border oui:p-1 oui:shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
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

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:relative oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-xs oui:py-1.5 oui:pr-2 oui:pl-8 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled]:pointer-events-none oui:data-[disabled]:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="oui:pointer-events-none oui:absolute oui:left-2 oui:flex oui:size-3.5 oui:items-center oui:justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="oui:size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:relative oui:flex oui:cursor-default oui:items-center oui:gap-2 oui:rounded-xs oui:py-1.5 oui:pr-2 oui:pl-8 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled]:pointer-events-none oui:data-[disabled]:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span className="oui:pointer-events-none oui:absolute oui:left-2 oui:flex oui:size-3.5 oui:items-center oui:justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="oui:size-2 oui:fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "oui:px-2 oui:py-1.5 oui:text-sm oui:font-medium oui:data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("oui:bg-border oui:-mx-1 oui:my-1 oui:h-px", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "oui:text-muted-foreground oui:ml-auto oui:text-xs oui:tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:data-[state=open]:bg-accent oui:data-[state=open]:text-accent-foreground oui:flex oui:cursor-default oui:items-center oui:rounded-sm oui:px-2 oui:py-1.5 oui:text-sm oui:outline-none oui:select-none oui:data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="oui:ml-auto oui:h-4 oui:w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "oui:bg-popover oui:text-popover-foreground oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-95 oui:data-[side=bottom]:slide-in-from-top-2 oui:data-[side=left]:slide-in-from-right-2 oui:data-[side=right]:slide-in-from-left-2 oui:data-[side=top]:slide-in-from-bottom-2 oui:z-50 oui:min-w-[8rem] oui:origin-(--radix-menubar-content-transform-origin) oui:overflow-hidden oui:rounded-md oui:border oui:p-1 oui:shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
