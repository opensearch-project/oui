/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "oui:file:text-foreground oui:placeholder:text-muted-foreground oui:selection:bg-primary oui:selection:text-primary-foreground oui:dark:bg-input/30 oui:border-input oui:h-8 oui:w-full oui:min-w-0 oui:rounded-md oui:border oui:bg-transparent oui:px-3 oui:py-1 oui:text-base oui:shadow-xs oui:transition-[color,box-shadow] oui:outline-none oui:file:inline-flex oui:file:h-7 oui:file:border-0 oui:file:bg-transparent oui:file:text-sm oui:file:font-medium oui:disabled:pointer-events-none oui:disabled:cursor-not-allowed oui:disabled:opacity-50 oui:md:text-sm",
        "oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:focus-visible:ring-[3px]",
        "oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
