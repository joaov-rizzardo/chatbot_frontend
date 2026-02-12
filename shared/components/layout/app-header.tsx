"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Bell, ChevronDown, HelpCircle, LogOut, CreditCard, Settings, User } from "lucide-react"
import Link from "next/link"

export function AppHeader() {
  return (
    <header
      className={cn(
        "flex justify-end h-14 shrink-0 items-center gap-4 border-b border-border bg-muted/50 px-6",
        "sticky top-0 z-20"
      )}
    >
      <div className="flex flex-end items-center gap-2">
        <button
          type="button"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Ajuda"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-none text-foreground">
                  João Doria
                </p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-lg shadow-lg">
            <DropdownMenuLabel className="font-semibold text-foreground">
              Minha Conta
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href="/app"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User className="h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/app/configuracoes"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/app"
                className="flex items-center gap-2 cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
                Planos e faturamento
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/logout"
                className="flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
