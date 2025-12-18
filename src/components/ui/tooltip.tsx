/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "oui:bg-foreground oui:text-background oui:animate-in oui:fade-in-0 oui:zoom-in-95 oui:data-[state=closed]:animate-out oui:data-[state=closed]:fade-out-0 oui:data-[state=closed]:zoom-out-95 oui:data-[side=bottom]:slide-in-from-top-2 oui:data-[side=left]:slide-in-from-right-2 oui:data-[side=right]:slide-in-from-left-2 oui:data-[side=top]:slide-in-from-bottom-2 oui:z-50 oui:w-fit oui:origin-(--radix-tooltip-content-transform-origin) oui:rounded-md oui:px-3 oui:py-1.5 oui:text-xs oui:text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="oui:bg-foreground oui:fill-foreground oui:z-50 oui:size-2.5 oui:translate-y-[calc(-50%_-_2px)] oui:rotate-45 oui:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
