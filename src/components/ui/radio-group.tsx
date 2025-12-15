/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("oui:grid oui:gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "oui:border-input oui:text-primary oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:dark:bg-input/30 oui:aspect-square oui:size-4 oui:shrink-0 oui:rounded-full oui:border oui:shadow-xs oui:transition-[color,box-shadow] oui:outline-none oui:focus-visible:ring-[3px] oui:disabled:cursor-not-allowed oui:disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="oui:relative oui:flex oui:items-center oui:justify-center"
      >
        <CircleIcon className="oui:fill-primary oui:absolute oui:top-1/2 oui:left-1/2 oui:size-2 oui:-translate-x-1/2 oui:-translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
