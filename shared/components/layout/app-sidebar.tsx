"use client"

import { useSidebar } from "@/shared/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { APP_NAV_ITEMS, APP_PLAN } from "@/shared/constants/app-nav"
import {
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Send,
  Settings,
  Users,
  Workflow,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

const ICON_MAP = {
  MessageCircle,
  Users,
  Bot,
  Workflow,
  Send,
  BarChart3,
  Settings,
} as const

export function AppSidebar() {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebar()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col border-r border-custom-sidebar-border bg-custom-sidebar text-custom-sidebar-foreground",
          "fixed left-0 top-0 z-30 h-screen transition-[width] duration-300 ease-in-out overflow-hidden",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center border-b border-custom-sidebar-border transition-[padding] duration-300",
            collapsed ? "h-auto flex-col justify-center gap-1 py-3" : "h-14 gap-2 px-3"
          )}
        >
          {collapsed ? (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={toggle}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-custom-sidebar-foreground/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Expandir menu"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-white truncate">
                  ZapFlow
                </span>
              </div>
              <button
                type="button"
                onClick={toggle}
                className="shrink-0 rounded-full p-1.5 text-custom-sidebar-foreground/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Recolher menu"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-3">
          {APP_NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon]
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            const link = (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors min-h-10 w-full",
                  collapsed ? "justify-center px-0" : "gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-custom-sidebar-foreground/90 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "shrink-0",
                    "h-5 w-5"
                  )}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            )
            if (!collapsed) {
              return link
            }
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        <div
          className={cn(
            "border-t border-custom-sidebar-border p-4 transition-all duration-300 overflow-hidden",
            collapsed
              ? "opacity-0 pointer-events-none h-0 p-0 border-0 min-h-0"
              : "opacity-100"
          )}
        >
          <p className="text-xs text-custom-sidebar-foreground/70">Plano atual</p>
          <p className="mt-0.5 font-medium text-white">{APP_PLAN.name}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{
                width: `${Math.min(
                  100,
                  (APP_PLAN.usage / APP_PLAN.limit) * 100
                )}%`,
              }}
            />
          </div>
          <p className="mt-1.5 text-xs text-custom-sidebar-foreground/80">
            {APP_PLAN.usage.toLocaleString("pt-BR")} /{" "}
            {APP_PLAN.limit.toLocaleString("pt-BR")} {APP_PLAN.unit}
          </p>
        </div>
      </aside>
    </TooltipProvider>
  )
}
