/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "oui:group/sidebar-wrapper oui:has-data-[variant=inset]:bg-sidebar oui:flex oui:min-h-svh oui:w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "oui:bg-sidebar oui:text-sidebar-foreground oui:flex oui:h-full oui:w-(--sidebar-width) oui:flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="oui:bg-sidebar oui:text-sidebar-foreground oui:w-(--sidebar-width) oui:p-0 oui:[&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="oui:sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="oui:flex oui:h-full oui:w-full oui:flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="oui:group oui:peer oui:text-sidebar-foreground oui:hidden oui:md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "oui:relative oui:w-(--sidebar-width) oui:bg-transparent oui:transition-[width] oui:duration-200 oui:ease-linear",
          "oui:group-data-[collapsible=offcanvas]:w-0",
          "oui:group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "oui:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "oui:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "oui:fixed oui:inset-y-0 oui:z-10 oui:hidden oui:h-svh oui:w-(--sidebar-width) oui:transition-[left,right,width] oui:duration-200 oui:ease-linear oui:md:flex",
          side === "left"
            ? "oui:left-0 oui:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "oui:right-0 oui:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "oui:p-2 oui:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "oui:group-data-[collapsible=icon]:w-(--sidebar-width-icon) oui:group-data-[side=left]:border-r oui:group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="oui:bg-sidebar oui:group-data-[variant=floating]:border-sidebar-border oui:flex oui:h-full oui:w-full oui:flex-col oui:group-data-[variant=floating]:rounded-lg oui:group-data-[variant=floating]:border oui:group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("oui:size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="oui:sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "oui:hover:after:bg-sidebar-border oui:absolute oui:inset-y-0 oui:z-20 oui:hidden oui:w-4 oui:-translate-x-1/2 oui:transition-all oui:ease-linear oui:group-data-[side=left]:-right-4 oui:group-data-[side=right]:left-0 oui:after:absolute oui:after:inset-y-0 oui:after:left-1/2 oui:after:w-[2px] oui:sm:flex",
        "oui:in-data-[side=left]:cursor-w-resize oui:in-data-[side=right]:cursor-e-resize",
        "oui:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize oui:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "oui:hover:group-data-[collapsible=offcanvas]:bg-sidebar oui:group-data-[collapsible=offcanvas]:translate-x-0 oui:group-data-[collapsible=offcanvas]:after:left-full",
        "oui:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "oui:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "oui:bg-background oui:relative oui:flex oui:w-full oui:flex-1 oui:flex-col",
        "oui:md:peer-data-[variant=inset]:m-2 oui:md:peer-data-[variant=inset]:ml-0 oui:md:peer-data-[variant=inset]:rounded-xl oui:md:peer-data-[variant=inset]:shadow-sm oui:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("oui:bg-background oui:h-8 oui:w-full oui:shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("oui:flex oui:flex-col oui:gap-2 oui:p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("oui:flex oui:flex-col oui:gap-2 oui:p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("oui:bg-sidebar-border oui:mx-2 oui:w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "oui:flex oui:min-h-0 oui:flex-1 oui:flex-col oui:gap-2 oui:overflow-auto oui:group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("oui:relative oui:flex oui:w-full oui:min-w-0 oui:flex-col oui:p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "oui:text-sidebar-foreground/70 oui:ring-sidebar-ring oui:flex oui:h-8 oui:shrink-0 oui:items-center oui:rounded-md oui:px-2 oui:text-xs oui:font-medium oui:outline-hidden oui:transition-[margin,opacity] oui:duration-200 oui:ease-linear oui:focus-visible:ring-2 oui:[&>svg]:size-4 oui:[&>svg]:shrink-0",
        "oui:group-data-[collapsible=icon]:-mt-8 oui:group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "oui:text-sidebar-foreground oui:ring-sidebar-ring oui:hover:bg-sidebar-accent oui:hover:text-sidebar-accent-foreground oui:absolute oui:top-3.5 oui:right-3 oui:flex oui:aspect-square oui:w-5 oui:items-center oui:justify-center oui:rounded-md oui:p-0 oui:outline-hidden oui:transition-transform oui:focus-visible:ring-2 oui:[&>svg]:size-4 oui:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "oui:after:absolute oui:after:-inset-2 oui:md:after:hidden",
        "oui:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("oui:w-full oui:text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("oui:flex oui:w-full oui:min-w-0 oui:flex-col oui:gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("oui:group/menu-item oui:relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "oui:peer/menu-button oui:flex oui:w-full oui:items-center oui:gap-2 oui:overflow-hidden oui:rounded-md oui:p-2 oui:text-left oui:text-sm oui:outline-hidden oui:ring-sidebar-ring oui:transition-[width,height,padding] oui:hover:bg-sidebar-accent oui:hover:text-sidebar-accent-foreground oui:focus-visible:ring-2 oui:active:bg-sidebar-accent oui:active:text-sidebar-accent-foreground oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:group-has-data-[sidebar=menu-action]/menu-item:pr-8 oui:aria-disabled:pointer-events-none oui:aria-disabled:opacity-50 oui:data-[active=true]:bg-sidebar-accent oui:data-[active=true]:font-medium oui:data-[active=true]:text-sidebar-accent-foreground oui:data-[state=open]:hover:bg-sidebar-accent oui:data-[state=open]:hover:text-sidebar-accent-foreground oui:group-data-[collapsible=icon]:size-8! oui:group-data-[collapsible=icon]:p-2! oui:[&>span:last-child]:truncate oui:[&>svg]:size-4 oui:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "oui:hover:bg-sidebar-accent oui:hover:text-sidebar-accent-foreground",
        outline:
          "oui:bg-background oui:shadow-[0_0_0_1px_hsl(var(--oui-sidebar-border))] oui:hover:bg-sidebar-accent oui:hover:text-sidebar-accent-foreground oui:hover:shadow-[0_0_0_1px_hsl(var(--oui-sidebar-accent))]",
      },
      size: {
        default: "oui:h-8 oui:text-sm",
        sm: "oui:h-7 oui:text-xs",
        lg: "oui:h-12 oui:text-sm oui:group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "oui:text-sidebar-foreground oui:ring-sidebar-ring oui:hover:bg-sidebar-accent oui:hover:text-sidebar-accent-foreground oui:peer-hover/menu-button:text-sidebar-accent-foreground oui:absolute oui:top-1.5 oui:right-1 oui:flex oui:aspect-square oui:w-5 oui:items-center oui:justify-center oui:rounded-md oui:p-0 oui:outline-hidden oui:transition-transform oui:focus-visible:ring-2 oui:[&>svg]:size-4 oui:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "oui:after:absolute oui:after:-inset-2 oui:md:after:hidden",
        "oui:peer-data-[size=sm]/menu-button:top-1",
        "oui:peer-data-[size=default]/menu-button:top-1.5",
        "oui:peer-data-[size=lg]/menu-button:top-2.5",
        "oui:group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "oui:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground oui:group-focus-within/menu-item:opacity-100 oui:group-hover/menu-item:opacity-100 oui:data-[state=open]:opacity-100 oui:md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "oui:text-sidebar-foreground oui:pointer-events-none oui:absolute oui:right-1 oui:flex oui:h-5 oui:min-w-5 oui:items-center oui:justify-center oui:rounded-md oui:px-1 oui:text-xs oui:font-medium oui:tabular-nums oui:select-none",
        "oui:peer-hover/menu-button:text-sidebar-accent-foreground oui:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "oui:peer-data-[size=sm]/menu-button:top-1",
        "oui:peer-data-[size=default]/menu-button:top-1.5",
        "oui:peer-data-[size=lg]/menu-button:top-2.5",
        "oui:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("oui:flex oui:h-8 oui:items-center oui:gap-2 oui:rounded-md oui:px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="oui:size-4 oui:rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="oui:h-4 oui:max-w-(--skeleton-width) oui:flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "oui:border-sidebar-border oui:mx-3.5 oui:flex oui:min-w-0 oui:translate-x-px oui:flex-col oui:gap-1 oui:border-l oui:px-2.5 oui:py-0.5",
        "oui:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("oui:group/menu-sub-item oui:relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "oui:text-sidebar-foreground oui:ring-sidebar-ring oui:hover:bg-sidebar-accent oui:hover:text-sidebar-accent-foreground oui:active:bg-sidebar-accent oui:active:text-sidebar-accent-foreground oui:[&>svg]:text-sidebar-accent-foreground oui:flex oui:h-7 oui:min-w-0 oui:-translate-x-px oui:items-center oui:gap-2 oui:overflow-hidden oui:rounded-md oui:px-2 oui:outline-hidden oui:focus-visible:ring-2 oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:aria-disabled:pointer-events-none oui:aria-disabled:opacity-50 oui:[&>span:last-child]:truncate oui:[&>svg]:size-4 oui:[&>svg]:shrink-0",
        "oui:data-[active=true]:bg-sidebar-accent oui:data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "oui:text-xs",
        size === "md" && "oui:text-sm",
        "oui:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
