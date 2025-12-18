/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "oui:group/navigation-menu oui:relative oui:flex oui:max-w-max oui:flex-1 oui:items-center oui:justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "oui:group oui:flex oui:flex-1 oui:list-none oui:items-center oui:justify-center oui:gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("oui:relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "oui:group oui:inline-flex oui:h-9 oui:w-max oui:items-center oui:justify-center oui:rounded-md oui:bg-background oui:px-4 oui:py-2 oui:text-sm oui:font-medium oui:hover:bg-accent oui:hover:text-accent-foreground oui:focus:bg-accent oui:focus:text-accent-foreground oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:data-[state=open]:hover:bg-accent oui:data-[state=open]:text-accent-foreground oui:data-[state=open]:focus:bg-accent oui:data-[state=open]:bg-accent/50 oui:focus-visible:ring-ring/50 oui:outline-none oui:transition-[color,box-shadow] oui:focus-visible:ring-[3px] oui:focus-visible:outline-1"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "oui:group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="oui:relative oui:top-[1px] oui:ml-1 oui:size-3 oui:transition oui:duration-300 oui:group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "oui:data-[motion^=from-]:animate-in oui:data-[motion^=to-]:animate-out oui:data-[motion^=from-]:fade-in oui:data-[motion^=to-]:fade-out oui:data-[motion=from-end]:slide-in-from-right-52 oui:data-[motion=from-start]:slide-in-from-left-52 oui:data-[motion=to-end]:slide-out-to-right-52 oui:data-[motion=to-start]:slide-out-to-left-52 oui:top-0 oui:left-0 oui:w-full oui:p-2 oui:pr-2.5 oui:md:absolute oui:md:w-auto",
        "oui:group-data-[viewport=false]/navigation-menu:bg-popover oui:group-data-[viewport=false]/navigation-menu:text-popover-foreground oui:group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in oui:group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out oui:group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 oui:group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 oui:group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 oui:group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 oui:group-data-[viewport=false]/navigation-menu:top-full oui:group-data-[viewport=false]/navigation-menu:mt-1.5 oui:group-data-[viewport=false]/navigation-menu:overflow-hidden oui:group-data-[viewport=false]/navigation-menu:rounded-md oui:group-data-[viewport=false]/navigation-menu:border oui:group-data-[viewport=false]/navigation-menu:shadow oui:group-data-[viewport=false]/navigation-menu:duration-200 oui:**:data-[slot=navigation-menu-link]:focus:ring-0 oui:**:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "oui:absolute oui:top-full oui:left-0 oui:isolate oui:z-50 oui:flex oui:justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "oui:origin-top-center oui:bg-popover oui:text-popover-foreground oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:zoom-out-95 oui:data-[state=open]:zoom-in-90 oui:relative oui:mt-1.5 oui:h-[var(--radix-navigation-menu-viewport-height)] oui:w-full oui:overflow-hidden oui:rounded-md oui:border oui:shadow oui:md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "oui:data-[active=true]:focus:bg-accent oui:data-[active=true]:hover:bg-accent oui:data-[active=true]:bg-accent/50 oui:data-[active=true]:text-accent-foreground oui:hover:bg-accent oui:hover:text-accent-foreground oui:focus:bg-accent oui:focus:text-accent-foreground oui:focus-visible:ring-ring/50 oui:[&_svg:not([class*=text-])]:text-muted-foreground oui:flex oui:flex-col oui:gap-1 oui:rounded-sm oui:p-2 oui:text-sm oui:transition-all oui:outline-none oui:focus-visible:ring-[3px] oui:focus-visible:outline-1 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "oui:data-[state=visible]:animate-in oui:data-[state=hidden]:animate-out oui:data-[state=hidden]:fade-out oui:data-[state=visible]:fade-in oui:top-full oui:z-[1] oui:flex oui:h-1.5 oui:items-end oui:justify-center oui:overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="oui:bg-border oui:relative oui:top-[60%] oui:h-2 oui:w-2 oui:rotate-45 oui:rounded-tl-sm oui:shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
