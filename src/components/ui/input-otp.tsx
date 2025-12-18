/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "oui:flex oui:items-center oui:gap-2 oui:has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("oui:disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("oui:flex oui:items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "oui:data-[active=true]:border-ring oui:data-[active=true]:ring-ring/50 oui:data-[active=true]:aria-invalid:ring-destructive/20 oui:dark:data-[active=true]:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:data-[active=true]:aria-invalid:border-destructive oui:dark:bg-input/30 oui:border-input oui:relative oui:flex oui:h-9 oui:w-9 oui:items-center oui:justify-center oui:border-y oui:border-r oui:text-sm oui:shadow-xs oui:transition-all oui:outline-none oui:first:rounded-l-md oui:first:border-l oui:last:rounded-r-md oui:data-[active=true]:z-10 oui:data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="oui:pointer-events-none oui:absolute oui:inset-0 oui:flex oui:items-center oui:justify-center">
          <div className="oui:animate-caret-blink oui:bg-foreground oui:h-4 oui:w-px oui:duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
