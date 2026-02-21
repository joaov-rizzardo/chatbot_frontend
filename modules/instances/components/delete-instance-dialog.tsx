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
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-500/10 border border-rose-500/20">
                            <TriangleAlert className="h-4 w-4 text-rose-500" />
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
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-rose-600 hover:bg-rose-700"
                    >
                        {isDeleting ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
