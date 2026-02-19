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
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import type { Instance } from "../types/instance"
import { useEditInstanceDialog } from "../hooks/use-edit-instance-dialog"

interface EditInstanceDialogProps {
    instance: Instance
    onClose: () => void
}

export function EditInstanceDialog({ instance, onClose }: EditInstanceDialogProps) {
    const { name, setName, isDirty, handleSave, isSaving, error } = useEditInstanceDialog({
        instanceName: instance.instanceName,
        currentName: instance.name,
        onClose,
    })

    return (
        <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
            <DialogContent className="sm:max-w-sm" onOpenAutoFocus={e => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Editar conexão</DialogTitle>
                    <DialogDescription>
                        Altere o nome de identificação desta conexão.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="edit-instance-name">Nome da conexão</Label>
                    <Input
                        id="edit-instance-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && isDirty && handleSave()}
                        maxLength={20}
                        autoFocus
                        disabled={isSaving}
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSaving}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={!isDirty || isSaving}>
                        {isSaving ? "Salvando..." : "Salvar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
