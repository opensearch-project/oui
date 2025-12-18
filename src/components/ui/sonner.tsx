/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="oui:toaster oui:group"
      icons={{
        success: <CircleCheckIcon className="oui:size-4" />,
        info: <InfoIcon className="oui:size-4" />,
        warning: <TriangleAlertIcon className="oui:size-4" />,
        error: <OctagonXIcon className="oui:size-4" />,
        loading: <Loader2Icon className="oui:size-4 oui:animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--oui-popover)",
          "--normal-text": "var(--oui-popover-foreground)",
          "--normal-border": "var(--oui-border)",
          "--border-radius": "var(--oui-radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
