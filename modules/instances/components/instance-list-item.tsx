import { Button } from "@/shared/components/ui/button"
import { Pencil, RefreshCw, Trash2 } from "lucide-react"
import type { Instance } from "../types/instance"
import { formatPhone } from "../utils/format-phone"
import { InstanceStatusIndicator } from "./instance-status-indicator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip"

interface InstanceListItemProps {
    instance: Instance
    onEdit?: (instanceName: string) => void
    onReconnect?: (instanceName: string) => void
    onDelete?: (instanceName: string) => void
}

export function InstanceListItem({ instance, onEdit, onReconnect, onDelete }: InstanceListItemProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <InstanceStatusIndicator status={instance.status} />
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                        {instance.phoneNumber ? formatPhone(instance.phoneNumber) : instance.instanceName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                        {instance.instanceName}
                    </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit?.(instance.instanceName)}
                                aria-label="Editar"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8}>
                            Editar
                        </TooltipContent>
                    </Tooltip>

                    {instance.status !== "open" && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onReconnect?.(instance.instanceName)}
                                    aria-label="Reconectar"
                                >
                                    <RefreshCw className="h-3.5 w-3.5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={8}>
                                Reconectar
                            </TooltipContent>
                        </Tooltip>

                    )}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete?.(instance.instanceName)}
                                aria-label="Excluir"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8} className="bg-destructive">
                            Excluir
                        </TooltipContent>
                    </Tooltip>

                </div>
            </div>
        </TooltipProvider>
    )
}
