/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "oui:relative oui:flex oui:w-full oui:touch-none oui:items-center oui:select-none oui:data-[disabled]:opacity-50 oui:data-[orientation=vertical]:h-full oui:data-[orientation=vertical]:min-h-44 oui:data-[orientation=vertical]:w-auto oui:data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "oui:bg-muted oui:relative oui:grow oui:overflow-hidden oui:rounded-full oui:data-[orientation=horizontal]:h-1.5 oui:data-[orientation=horizontal]:w-full oui:data-[orientation=vertical]:h-full oui:data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "oui:bg-primary oui:absolute oui:data-[orientation=horizontal]:h-full oui:data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="oui:border-primary oui:ring-ring/50 oui:block oui:size-4 oui:shrink-0 oui:rounded-full oui:border oui:bg-white oui:shadow-sm oui:transition-[color,box-shadow] oui:hover:ring-4 oui:focus-visible:ring-4 oui:focus-visible:outline-hidden oui:disabled:pointer-events-none oui:disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
