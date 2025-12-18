/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "oui:border-input oui:placeholder:text-muted-foreground oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:dark:bg-input/30 oui:flex oui:field-sizing-content oui:min-h-16 oui:w-full oui:rounded-md oui:border oui:bg-transparent oui:px-3 oui:py-2 oui:text-base oui:shadow-xs oui:transition-[color,box-shadow] oui:outline-none oui:focus-visible:ring-[3px] oui:disabled:cursor-not-allowed oui:disabled:opacity-50 oui:md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
