/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "oui:bg-background oui:group/calendar oui:p-3 oui:[--cell-size:--spacing(8)] oui:[[data-slot=card-content]_&]:bg-transparent oui:[[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("oui:w-fit", defaultClassNames.root),
        months: cn(
          "oui:flex oui:gap-4 oui:flex-col oui:md:flex-row oui:relative",
          defaultClassNames.months
        ),
        month: cn("oui:flex oui:flex-col oui:w-full oui:gap-4", defaultClassNames.month),
        nav: cn(
          "oui:flex oui:items-center oui:gap-1 oui:w-full oui:absolute oui:top-0 oui:inset-x-0 oui:justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "oui:size-(--cell-size) oui:aria-disabled:opacity-50 oui:p-0 oui:select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "oui:size-(--cell-size) oui:aria-disabled:opacity-50 oui:p-0 oui:select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "oui:flex oui:items-center oui:justify-center oui:h-(--cell-size) oui:w-full oui:px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "oui:w-full oui:flex oui:items-center oui:text-sm oui:font-medium oui:justify-center oui:h-(--cell-size) oui:gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "oui:relative oui:has-focus:border-ring oui:border oui:border-input oui:shadow-xs oui:has-focus:ring-ring/50 oui:has-focus:ring-[3px] oui:rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "oui:absolute oui:bg-popover oui:inset-0 oui:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "oui:select-none oui:font-medium",
          captionLayout === "label"
            ? "oui:text-sm"
            : "oui:rounded-md oui:pl-2 oui:pr-1 oui:flex oui:items-center oui:gap-1 oui:text-sm oui:h-8 oui:[&>svg]:text-muted-foreground oui:[&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "oui:w-full oui:border-collapse",
        weekdays: cn("oui:flex", defaultClassNames.weekdays),
        weekday: cn(
          "oui:text-muted-foreground oui:rounded-md oui:flex-1 oui:font-normal oui:text-[0.8rem] oui:select-none",
          defaultClassNames.weekday
        ),
        week: cn("oui:flex oui:w-full oui:mt-2", defaultClassNames.week),
        week_number_header: cn(
          "oui:select-none oui:w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "oui:text-[0.8rem] oui:select-none oui:text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "oui:relative oui:w-full oui:h-full oui:p-0 oui:text-center oui:[&:last-child[data-selected=true]_button]:rounded-r-md oui:group/day oui:aspect-square oui:select-none",
          props.showWeekNumber
            ? "oui:[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "oui:[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "oui:rounded-l-md oui:bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("oui:rounded-none", defaultClassNames.range_middle),
        range_end: cn("oui:rounded-r-md oui:bg-accent", defaultClassNames.range_end),
        today: cn(
          "oui:bg-accent oui:text-accent-foreground oui:rounded-md oui:data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "oui:text-muted-foreground oui:aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "oui:text-muted-foreground oui:opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("oui:invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("oui:size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("oui:size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("oui:size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="oui:flex oui:size-(--cell-size) oui:items-center oui:justify-center oui:text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "oui:data-[selected-single=true]:bg-primary oui:data-[selected-single=true]:text-primary-foreground oui:data-[range-middle=true]:bg-accent oui:data-[range-middle=true]:text-accent-foreground oui:data-[range-start=true]:bg-primary oui:data-[range-start=true]:text-primary-foreground oui:data-[range-end=true]:bg-primary oui:data-[range-end=true]:text-primary-foreground oui:group-data-[focused=true]/day:border-ring oui:group-data-[focused=true]/day:ring-ring/50 oui:dark:hover:text-accent-foreground oui:flex oui:aspect-square oui:size-auto oui:w-full oui:min-w-(--cell-size) oui:flex-col oui:gap-1 oui:leading-none oui:font-normal oui:group-data-[focused=true]/day:relative oui:group-data-[focused=true]/day:z-10 oui:group-data-[focused=true]/day:ring-[3px] oui:data-[range-end=true]:rounded-md oui:data-[range-end=true]:rounded-r-md oui:data-[range-middle=true]:rounded-none oui:data-[range-start=true]:rounded-md oui:data-[range-start=true]:rounded-l-md oui:[&>span]:text-xs oui:[&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
