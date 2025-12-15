/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "oui:flex oui:items-center oui:gap-2 oui:text-sm oui:leading-none oui:font-medium oui:select-none oui:group-data-[disabled=true]:pointer-events-none oui:group-data-[disabled=true]:opacity-50 oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
