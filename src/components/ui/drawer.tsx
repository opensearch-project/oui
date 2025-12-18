/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "oui:data-[state=open]:animate-in oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=open]:fade-in-0 oui:fixed oui:inset-0 oui:z-50 oui:bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "oui:group/drawer-content oui:bg-background oui:fixed oui:z-50 oui:flex oui:h-auto oui:flex-col",
          "oui:data-[vaul-drawer-direction=top]:inset-x-0 oui:data-[vaul-drawer-direction=top]:top-0 oui:data-[vaul-drawer-direction=top]:mb-24 oui:data-[vaul-drawer-direction=top]:max-h-[80vh] oui:data-[vaul-drawer-direction=top]:rounded-b-lg oui:data-[vaul-drawer-direction=top]:border-b",
          "oui:data-[vaul-drawer-direction=bottom]:inset-x-0 oui:data-[vaul-drawer-direction=bottom]:bottom-0 oui:data-[vaul-drawer-direction=bottom]:mt-24 oui:data-[vaul-drawer-direction=bottom]:max-h-[80vh] oui:data-[vaul-drawer-direction=bottom]:rounded-t-lg oui:data-[vaul-drawer-direction=bottom]:border-t",
          "oui:data-[vaul-drawer-direction=right]:inset-y-0 oui:data-[vaul-drawer-direction=right]:right-0 oui:data-[vaul-drawer-direction=right]:w-3/4 oui:data-[vaul-drawer-direction=right]:border-l oui:data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "oui:data-[vaul-drawer-direction=left]:inset-y-0 oui:data-[vaul-drawer-direction=left]:left-0 oui:data-[vaul-drawer-direction=left]:w-3/4 oui:data-[vaul-drawer-direction=left]:border-r oui:data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="oui:bg-muted oui:mx-auto oui:mt-4 oui:hidden oui:h-2 oui:w-[100px] oui:shrink-0 oui:rounded-full oui:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "oui:flex oui:flex-col oui:gap-0.5 oui:p-4 oui:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center oui:group-data-[vaul-drawer-direction=top]/drawer-content:text-center oui:md:gap-1.5 oui:md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("oui:mt-auto oui:flex oui:flex-col oui:gap-2 oui:p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("oui:text-foreground oui:font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("oui:text-muted-foreground oui:text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
