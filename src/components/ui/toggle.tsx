/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "oui:inline-flex oui:items-center oui:justify-center oui:gap-2 oui:rounded-md oui:text-sm oui:font-medium oui:hover:bg-muted oui:hover:text-muted-foreground oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:data-[state=on]:bg-accent oui:data-[state=on]:text-accent-foreground oui:[&_svg]:pointer-events-none oui:[&_svg:not([class*=size-])]:size-4 oui:[&_svg]:shrink-0 oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:focus-visible:ring-[3px] oui:outline-none oui:transition-[color,box-shadow] oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "oui:bg-transparent",
        outline:
          "oui:border oui:border-input oui:bg-transparent oui:shadow-xs oui:hover:bg-accent oui:hover:text-accent-foreground",
      },
      size: {
        default: "oui:h-9 oui:px-2 oui:min-w-9",
        sm: "oui:h-8 oui:px-1.5 oui:min-w-8",
        lg: "oui:h-10 oui:px-2.5 oui:min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
