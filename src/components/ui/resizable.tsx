/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "oui:flex oui:h-full oui:w-full oui:data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "oui:bg-border oui:focus-visible:ring-ring oui:relative oui:flex oui:w-px oui:items-center oui:justify-center oui:after:absolute oui:after:inset-y-0 oui:after:left-1/2 oui:after:w-1 oui:after:-translate-x-1/2 oui:focus-visible:ring-1 oui:focus-visible:ring-offset-1 oui:focus-visible:outline-hidden oui:data-[panel-group-direction=vertical]:h-px oui:data-[panel-group-direction=vertical]:w-full oui:data-[panel-group-direction=vertical]:after:left-0 oui:data-[panel-group-direction=vertical]:after:h-1 oui:data-[panel-group-direction=vertical]:after:w-full oui:data-[panel-group-direction=vertical]:after:translate-x-0 oui:data-[panel-group-direction=vertical]:after:-translate-y-1/2 oui:[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="oui:bg-border oui:z-10 oui:flex oui:h-4 oui:w-3 oui:items-center oui:justify-center oui:rounded-xs oui:border">
          <GripVerticalIcon className="oui:size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
