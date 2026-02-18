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

interface DeleteInstanceDialogProps {
    instance: Instance | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeleteInstanceDialog({ instance, open, onOpenChange }: DeleteInstanceDialogProps) {
    const handleDelete = () => {
        if (!instance) return
        // TODO: call backend to delete instance
        console.log("Delete instance:", instance.instanceName)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                    {instance?.name}
                                </span>
                                ? Esta ação não poderá ser desfeita.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
