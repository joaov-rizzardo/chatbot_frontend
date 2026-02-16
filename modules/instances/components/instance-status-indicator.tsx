import { cn } from "@/lib/utils"
import type { InstanceStatus } from "../types/instance"

const STATUS_COLORS: Record<InstanceStatus, string> = {
    open: "bg-emerald-500",
    connecting: "bg-yellow-500",
    close: "bg-red-500",
    refused: "bg-red-500",
}

const STATUS_LABELS: Record<InstanceStatus, string> = {
    open: "Conectado",
    connecting: "Conectando",
    close: "Desconectado",
    refused: "Recusado",
}

interface InstanceStatusIndicatorProps {
    status: InstanceStatus
}

export function InstanceStatusIndicator({ status }: InstanceStatusIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={cn("h-2.5 w-2.5 rounded-full shrink-0", STATUS_COLORS[status])}
                aria-label={STATUS_LABELS[status]}
            />
            <span className="text-xs text-muted-foreground">{STATUS_LABELS[status]}</span>
        </div>
    )
}
