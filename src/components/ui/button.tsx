/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "oui:inline-flex oui:items-center oui:justify-center oui:gap-2 oui:whitespace-nowrap oui:rounded-md oui:text-sm oui:font-medium oui:transition-all oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg:not([class*=size-])]:size-4 oui:shrink-0 oui:[&_svg]:shrink-0 oui:outline-none oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:focus-visible:ring-[3px] oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "oui:bg-primary oui:text-primary-foreground oui:hover:bg-primary/90",
        destructive:
          "oui:bg-destructive oui:text-white oui:hover:bg-destructive/90 oui:focus-visible:ring-destructive/20 oui:dark:focus-visible:ring-destructive/40 oui:dark:bg-destructive/60",
        outline:
          "oui:border oui:bg-background oui:shadow-xs oui:hover:bg-accent oui:hover:text-accent-foreground oui:dark:bg-input/30 oui:dark:border-input oui:dark:hover:bg-input/50",
        secondary:
          "oui:bg-secondary oui:text-secondary-foreground oui:hover:bg-secondary/80",
        ghost:
          "oui:hover:bg-accent oui:hover:text-accent-foreground oui:dark:hover:bg-accent/50",
        link: "oui:text-primary oui:underline-offset-4 oui:hover:underline",
      },
      size: {
        default: "oui:h-9 oui:px-4 oui:py-2 oui:has-[>svg]:px-3",
        sm: "oui:h-8 oui:rounded-md oui:gap-1.5 oui:px-3 oui:has-[>svg]:px-2.5",
        lg: "oui:h-10 oui:rounded-md oui:px-6 oui:has-[>svg]:px-4",
        icon: "oui:size-9",
        "icon-sm": "oui:size-8",
        "icon-lg": "oui:size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
