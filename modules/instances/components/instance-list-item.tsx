import { Button } from "@/shared/components/ui/button"
import { Pencil, RefreshCw, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Instance } from "../types/instance"
import { formatPhone } from "../utils/format-phone"
import { InstanceStatusIndicator } from "./instance-status-indicator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip"

const STATUS_BORDER: Record<string, string> = {
    open:       "border-l-emerald-500",
    connecting: "border-l-amber-500",
    close:      "border-l-rose-500/70",
    refused:    "border-l-rose-500/70",
}

interface InstanceListItemProps {
    instance: Instance
    onEdit?: (instanceName: string) => void
    onReconnect?: (instanceName: string) => void
    onDelete?: (instanceName: string) => void
}

export function InstanceListItem({ instance, onEdit, onReconnect, onDelete }: InstanceListItemProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <div className={cn(
                "group flex items-center justify-between gap-3 rounded-md border border-border/60 border-l-4 bg-card/40 px-3 py-2.5 transition-colors hover:bg-accent/20",
                STATUS_BORDER[instance.status]
            )}>
                <div className="flex flex-col gap-1 min-w-0">
                    <InstanceStatusIndicator status={instance.status} />
                    <p className="text-sm font-medium text-foreground truncate">
                        {instance.phoneNumber ? formatPhone(instance.phoneNumber) : (
                            <span className="text-muted-foreground/50">—</span>
                        )}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                        {instance.name}
                    </p>
                </div>

                <div className="flex items-center gap-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onEdit?.(instance.instanceName)}
                                aria-label="Editar"
                            >
                                <Pencil className="h-3 w-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={6}>Editar</TooltipContent>
                    </Tooltip>

                    {instance.status !== "open" && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => onReconnect?.(instance.instanceName)}
                                    aria-label="Reconectar"
                                >
                                    <RefreshCw className="h-3 w-3" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={6}>Reconectar</TooltipContent>
                        </Tooltip>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-rose-500 hover:text-rose-500 hover:bg-rose-500/10"
                                onClick={() => onDelete?.(instance.instanceName)}
                                aria-label="Excluir"
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={6} className="bg-rose-600">Excluir</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}
