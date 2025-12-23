/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "oui:bg-card oui:text-card-foreground oui:flex oui:flex-col oui:gap-3 oui:rounded-xl oui:border oui:py-4 oui:shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const hasBorder = className?.includes('border-b');
  
  return (
    <div
      data-slot="card-header"
      className={cn(
        "oui:@container/card-header oui:grid oui:auto-rows-min oui:grid-rows-[auto_auto] oui:items-start oui:gap-2 oui:px-4 oui:has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        hasBorder && "oui:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("oui:leading-none oui:font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("oui:text-muted-foreground oui:text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "oui:col-start-2 oui:row-span-2 oui:row-start-1 oui:self-start oui:justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("oui:px-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  const hasBorder = className?.includes('border-t');
  
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "oui:flex oui:items-center oui:px-4",
        hasBorder && "oui:pt-6",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
