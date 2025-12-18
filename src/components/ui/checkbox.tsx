/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "oui:peer oui:border-input oui:dark:bg-input/30 oui:data-[state=checked]:bg-primary oui:data-[state=checked]:text-primary-foreground oui:dark:data-[state=checked]:bg-primary oui:data-[state=checked]:border-primary oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:size-4 oui:shrink-0 oui:rounded-[4px] oui:border oui:shadow-xs oui:transition-shadow oui:outline-none oui:focus-visible:ring-[3px] oui:disabled:cursor-not-allowed oui:disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="oui:grid oui:place-content-center oui:text-current oui:transition-none"
      >
        <CheckIcon className="oui:size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
