/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "oui:inline-flex oui:items-center oui:justify-center oui:rounded-md oui:border oui:px-2 oui:py-0.5 oui:text-xs oui:font-medium oui:w-fit oui:whitespace-nowrap oui:shrink-0 oui:[&>svg]:size-3 oui:gap-1 oui:[&>svg]:pointer-events-none oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:focus-visible:ring-[3px] oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive transition-[color,box-shadow] oui:overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "oui:border-transparent oui:bg-primary oui:text-primary-foreground oui:[a&]:hover:bg-primary/90",
        secondary:
          "oui:border-transparent oui:bg-secondary oui:text-secondary-foreground oui:[a&]:hover:bg-secondary/90",
        destructive:
          "oui:border-transparent oui:bg-destructive oui:text-white oui:[a&]:hover:bg-destructive/90 oui:focus-visible:ring-destructive/20 oui:dark:focus-visible:ring-destructive/40 oui:dark:bg-destructive/60",
        outline:
          "oui:text-foreground oui:[a&]:hover:bg-accent oui:[a&]:hover:text-accent-foreground",
        verified:
          "oui:rounded-[8px] oui:border-transparent oui:bg-[#3B82F6] oui:text-white",
        "severity-low":
          "oui:border-transparent oui:bg-severity-low oui:text-white",
        "severity-med":
          "oui:border-transparent oui:bg-severity-med oui:text-white",
        "severity-high":
          "oui:border-transparent oui:bg-severity-high oui:text-white",
        "severity-critical":
          "oui:border-transparent oui:bg-severity-critical oui:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
