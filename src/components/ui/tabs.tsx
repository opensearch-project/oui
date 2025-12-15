/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("oui:flex oui:flex-col oui:gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "oui:bg-muted oui:text-muted-foreground oui:inline-flex oui:h-9 oui:w-fit oui:items-center oui:justify-center oui:rounded-lg oui:p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "oui:data-[state=active]:bg-background oui:dark:data-[state=active]:text-foreground oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:focus-visible:outline-ring oui:dark:data-[state=active]:border-input oui:dark:data-[state=active]:bg-input/30 oui:text-foreground oui:dark:text-muted-foreground oui:inline-flex oui:h-[calc(100%-1px)] oui:flex-1 oui:items-center oui:justify-center oui:gap-1.5 oui:rounded-md oui:border oui:border-transparent oui:px-2 oui:py-1 oui:text-sm oui:font-medium oui:whitespace-nowrap oui:transition-[color,box-shadow] oui:focus-visible:ring-[3px] oui:focus-visible:outline-1 oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:data-[state=active]:shadow-sm oui:[&_svg]:pointer-events-none oui:[&_svg]:shrink-0 oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("oui:flex-1 oui:outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
