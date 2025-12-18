/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "oui:peer oui:data-[state=checked]:bg-primary oui:data-[state=unchecked]:bg-input oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:dark:data-[state=unchecked]:bg-input/80 oui:inline-flex oui:h-[1.15rem] oui:w-8 oui:shrink-0 oui:items-center oui:rounded-full oui:border oui:border-transparent oui:shadow-xs oui:transition-all oui:outline-none oui:focus-visible:ring-[3px] oui:disabled:cursor-not-allowed oui:disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "oui:bg-background oui:dark:data-[state=unchecked]:bg-foreground oui:dark:data-[state=checked]:bg-primary-foreground oui:pointer-events-none oui:block oui:size-4 oui:rounded-full oui:ring-0 oui:transition-transform oui:data-[state=checked]:translate-x-[calc(100%-2px)] oui:data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
