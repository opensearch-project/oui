/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "oui:border-input oui:data-[placeholder]:text-muted-foreground oui:[&_svg:not([class*=text-])]:text-muted-foreground oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:dark:bg-input/30 oui:dark:hover:bg-input/50 oui:flex oui:w-fit oui:items-center oui:justify-between oui:gap-2 oui:rounded-md oui:border oui:bg-transparent oui:px-3 oui:py-2 oui:text-sm oui:whitespace-nowrap oui:shadow-xs oui:transition-[color,box-shadow] oui:outline-none oui:focus-visible:ring-[3px] oui:disabled:cursor-not-allowed oui:disabled:opacity-50 oui:data-[size=default]:h-9 oui:data-[size=sm]:h-8 oui:*:data-[slot=select-value]:line-clamp-1 oui:*:data-[slot=select-value]:flex oui:*:data-[slot=select-value]:items-center oui:*:data-[slot=select-value]:gap-2 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="oui:size-4 oui:opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "oui:bg-popover oui:text-popover-foreground oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-95 oui:data-[side=bottom]:slide-in-from-top-2 oui:data-[side=left]:slide-in-from-right-2 oui:data-[side=right]:slide-in-from-left-2 oui:data-[side=top]:slide-in-from-bottom-2 oui:relative oui:z-50 oui:max-h-(--radix-select-content-available-height) oui:min-w-[8rem] oui:origin-(--radix-select-content-transform-origin) oui:overflow-x-hidden oui:overflow-y-auto oui:rounded-md oui:border oui:shadow-md",
          position === "popper" &&
            "oui:data-[side=bottom]:translate-y-1 oui:data-[side=left]:-translate-x-1 oui:data-[side=right]:translate-x-1 oui:data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "oui:p-1",
            position === "popper" &&
              "oui:h-[var(--radix-select-trigger-height)] oui:w-full oui:min-w-[var(--radix-select-trigger-width)] oui:scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("oui:text-muted-foreground oui:px-2 oui:py-1.5 oui:text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "oui:focus:bg-accent oui:focus:text-accent-foreground oui:[&_svg:not([class*=text-])]:text-muted-foreground oui:relative oui:flex oui:w-full oui:cursor-default oui:items-center oui:gap-2 oui:rounded-sm oui:py-1.5 oui:pr-8 oui:pl-2 oui:text-sm oui:outline-hidden oui:select-none oui:data-[disabled]:pointer-events-none oui:data-[disabled]:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4 oui:*:[span]:last:flex oui:*:[span]:last:items-center oui:*:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="oui:absolute oui:right-2 oui:flex oui:size-3.5 oui:items-center oui:justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="oui:size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("oui:bg-border oui:pointer-events-none oui:-mx-1 oui:my-1 oui:h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "oui:flex oui:cursor-default oui:items-center oui:justify-center oui:py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="oui:size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "oui:flex oui:cursor-default oui:items-center oui:justify-center oui:py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="oui:size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
