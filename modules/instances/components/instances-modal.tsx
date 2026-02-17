"use client"

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

interface InstancesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function InstancesModal({ open, onOpenChange }: InstancesModalProps) {
    const { data: instances, isLoading } = useInstancesQuery()

    const handleEdit = (instanceName: string) => {
        // TODO: integrate with backend
        console.log("Edit:", instanceName)
    }

    const handleReconnect = (instanceName: string) => {
        // TODO: integrate with backend
        console.log("Reconnect:", instanceName)
    }

    const handleDelete = (instanceName: string) => {
        // TODO: integrate with backend
        console.log("Delete:", instanceName)
    }

    const handleCreate = () => {
        // TODO: integrate with backend
        console.log("Create new instance")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
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
                    <Button className="w-full" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Criar nova conexão
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
