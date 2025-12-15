/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("oui:border-b oui:last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="oui:flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:flex oui:flex-1 oui:items-start oui:justify-between oui:gap-4 oui:rounded-md oui:py-4 oui:text-left oui:text-sm oui:font-medium oui:transition-all oui:outline-none oui:hover:underline oui:focus-visible:ring-[3px] oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="oui:text-muted-foreground oui:pointer-events-none oui:size-4 oui:shrink-0 oui:translate-y-0.5 oui:transition-transform oui:duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="oui:data-[state=closed]:animate-accordion-up oui:data-[state=open]:animate-accordion-down oui:overflow-hidden oui:text-sm"
      {...props}
    >
      <div className={cn("oui:pt-0 oui:pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
