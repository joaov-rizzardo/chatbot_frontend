"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { TriangleAlert } from "lucide-react"
import type { Instance } from "../types/instance"
import { useDeleteInstanceDialog } from "../hooks/use-delete-instance-dialog"

interface DeleteInstanceDialogProps {
    instance: Instance
    onClose: () => void
}

export function DeleteInstanceDialog({ instance, onClose }: DeleteInstanceDialogProps) {
    const { handleDelete, isDeleting, error } = useDeleteInstanceDialog({
        instanceName: instance.instanceName,
        onClose,
    })

    return (
        <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
            <DialogContent className="sm:max-w-sm" onOpenAutoFocus={e => e.preventDefault()}>
                <DialogHeader>
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                            <TriangleAlert className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <DialogTitle>Excluir conexão</DialogTitle>
                            <DialogDescription>
                                Tem certeza que deseja excluir{" "}
                                <span className="font-medium text-foreground">
                                    {instance.name}
                                </span>
                                ? Esta ação não poderá ser desfeita.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isDeleting}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
