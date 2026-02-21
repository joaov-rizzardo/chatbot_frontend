import { cn } from "@/lib/utils"
import type { InstanceStatus } from "../types/instance"

const STATUS_CONFIG: Record<InstanceStatus, { dot: string; pulse: boolean; label: string }> = {
    open:       { dot: "bg-emerald-500", pulse: true,  label: "Conectado" },
    connecting: { dot: "bg-amber-500",   pulse: true,  label: "Conectando" },
    close:      { dot: "bg-rose-500",    pulse: false, label: "Desconectado" },
    refused:    { dot: "bg-rose-500",    pulse: false, label: "Recusado" },
}

interface InstanceStatusIndicatorProps {
    status: InstanceStatus
}

export function InstanceStatusIndicator({ status }: InstanceStatusIndicatorProps) {
    const { dot, pulse, label } = STATUS_CONFIG[status]
    return (
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
                {pulse && (
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-50", dot)} />
                )}
                <span className={cn("relative inline-flex rounded-full h-2 w-2", dot)} />
            </span>
            <span className="text-xs text-muted-foreground tracking-wide">{label}</span>
        </div>
    )
}
