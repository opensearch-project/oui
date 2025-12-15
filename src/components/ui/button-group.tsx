/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "oui:flex oui:w-fit oui:items-stretch oui:[&>*]:focus-visible:z-10 oui:[&>*]:focus-visible:relative oui:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit oui:[&>input]:flex-1 oui:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md oui:has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "oui:[&>*:not(:first-child)]:rounded-l-none oui:[&>*:not(:first-child)]:border-l-0 oui:[&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "oui:flex-col oui:[&>*:not(:first-child)]:rounded-t-none oui:[&>*:not(:first-child)]:border-t-0 oui:[&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        "oui:bg-muted oui:flex oui:items-center oui:gap-2 oui:rounded-md oui:border oui:px-4 oui:text-sm oui:font-medium oui:shadow-xs oui:[&_svg]:pointer-events-none oui:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "oui:bg-input oui:relative oui:!m-0 oui:self-stretch oui:data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
