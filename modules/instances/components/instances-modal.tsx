"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Button } from "@/shared/components/ui/button"
import { Plus, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"
import { MOCK_INSTANCE_USAGE } from "../constants/mock-instances"
import { useInstancesQuery } from "../queries/use-instances-query"
import { InstanceListItem } from "./instance-list-item"
import { InstanceListSkeleton } from "./instance-list-skeleton"
import { CreateInstanceDialog } from "./create-instance-dialog"
import { EditInstanceDialog } from "./edit-instance-dialog"
import { DeleteInstanceDialog } from "./delete-instance-dialog"
import { ReconnectInstanceDialog } from "./reconnect-instance-dialog"
import type { Instance } from "../types/instance"

interface InstancesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function InstancesModal({ open, onOpenChange }: InstancesModalProps) {
    const { data: instances, isLoading } = useInstancesQuery()

    const [createOpen, setCreateOpen] = useState(false)
    const [editInstance, setEditInstance] = useState<Instance | null>(null)
    const [deleteInstance, setDeleteInstance] = useState<Instance | null>(null)
    const [reconnectInstance, setReconnectInstance] = useState<Instance | null>(null)

    const handleEdit = (instanceName: string) => {
        const instance = instances?.find(i => i.instanceName === instanceName) ?? null
        setEditInstance(instance)
    }

    const handleReconnect = (instanceName: string) => {
        const instance = instances?.find(i => i.instanceName === instanceName) ?? null
        setReconnectInstance(instance)
    }

    const handleDelete = (instanceName: string) => {
        const instance = instances?.find(i => i.instanceName === instanceName) ?? null
        setDeleteInstance(instance)
    }

    const usagePct = (MOCK_INSTANCE_USAGE.current / MOCK_INSTANCE_USAGE.limit) * 100

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md gap-4" onOpenAutoFocus={e => e.preventDefault()}>
                    <DialogHeader className="pb-0">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                    <Wifi className="h-3.5 w-3.5 text-emerald-500" />
                                </div>
                                <DialogTitle className="text-base">Conexões WhatsApp</DialogTitle>
                            </div>

                            <div className="flex flex-col items-end gap-1 shrink-0 mr-6">
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {MOCK_INSTANCE_USAGE.current}
                                    <span className="text-muted-foreground/40">/{MOCK_INSTANCE_USAGE.limit}</span>
                                </span>
                                <div className="w-16 h-1 rounded-full bg-border/60 overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            usagePct >= 90 ? "bg-rose-500" :
                                            usagePct >= 70 ? "bg-amber-500" :
                                            "bg-emerald-500"
                                        )}
                                        style={{ width: `${usagePct}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    <ScrollArea className="max-h-72">
                        {isLoading ? (
                            <InstanceListSkeleton />
                        ) : instances && instances.length > 0 ? (
                            <div className="flex flex-col gap-1.5 pr-3">
                                {instances.map((instance) => (
                                    <InstanceListItem
                                        key={instance.id}
                                        instance={instance}
                                        onEdit={handleEdit}
                                        onReconnect={handleReconnect}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-10">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-border/60">
                                    <Wifi className="h-4.5 w-4.5 text-muted-foreground/50" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Nenhuma conexão encontrada.
                                </p>
                            </div>
                        )}
                    </ScrollArea>

                    <div className="border-t border-border/60 pt-3">
                        <Button className="w-full gap-2 h-9" onClick={() => setCreateOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Nova conexão
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {createOpen && (
                <CreateInstanceDialog onClose={() => setCreateOpen(false)} />
            )}

            {editInstance && (
                <EditInstanceDialog
                    instance={editInstance}
                    onClose={() => setEditInstance(null)}
                />
            )}

            {deleteInstance && (
                <DeleteInstanceDialog
                    instance={deleteInstance}
                    onClose={() => setDeleteInstance(null)}
                />
            )}

            {reconnectInstance && (
                <ReconnectInstanceDialog
                    instance={reconnectInstance}
                    onClose={() => setReconnectInstance(null)}
                />
            )}
        </>
    )
}
