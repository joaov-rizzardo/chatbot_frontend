"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Badge } from "@/shared/components/ui/badge"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
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

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md" onOpenAutoFocus={e => e.preventDefault()}>
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle>Conexões WhatsApp</DialogTitle>
                            <Badge variant="secondary" className="text-xs mr-2">
                                {MOCK_INSTANCE_USAGE.current}/{MOCK_INSTANCE_USAGE.limit}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <ScrollArea className="max-h-80">
                        {isLoading ? (
                            <InstanceListSkeleton />
                        ) : instances && instances.length > 0 ? (
                            <div className="flex flex-col gap-2 pr-3">
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
                            <p className="text-sm text-muted-foreground text-center py-6">
                                Nenhuma conexão encontrada.
                            </p>
                        )}
                    </ScrollArea>

                    <div className="pt-2">
                        <Button className="w-full" onClick={() => setCreateOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Criar nova conexão
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <CreateInstanceDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
            />

            <EditInstanceDialog
                instance={editInstance}
                open={editInstance !== null}
                onOpenChange={(o) => { if (!o) setEditInstance(null) }}
            />

            <DeleteInstanceDialog
                instance={deleteInstance}
                open={deleteInstance !== null}
                onOpenChange={(o) => { if (!o) setDeleteInstance(null) }}
            />

            <ReconnectInstanceDialog
                instance={reconnectInstance}
                open={reconnectInstance !== null}
                onOpenChange={(o) => { if (!o) setReconnectInstance(null) }}
            />
        </>
    )
}
