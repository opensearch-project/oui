/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "oui:relative oui:w-full oui:rounded-lg oui:border oui:px-4 oui:py-3 oui:text-sm oui:grid oui:has-[>svg]:grid-cols-[calc(var(--oui-spacing)*4)_1fr] oui:grid-cols-[0_1fr] oui:has-[>svg]:gap-x-3 oui:gap-y-0.5 oui:items-start oui:[&>svg]:size-4 oui:[&>svg]:translate-y-0.5 oui:[&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "oui:bg-card oui:text-card-foreground",
        destructive:
          "oui:text-destructive oui:bg-card oui:[&>svg]:text-current oui:*:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "oui:col-start-2 oui:line-clamp-1 oui:min-h-4 oui:font-medium oui:tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "oui:text-muted-foreground oui:col-start-2 oui:grid oui:justify-items-start oui:gap-1 oui:text-sm oui:[&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
