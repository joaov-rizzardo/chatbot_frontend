"use client"

import { useState } from "react"
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

interface EditInstanceDialogProps {
    instance: Instance
    onClose: () => void
}

export function EditInstanceDialog({ instance, onClose }: EditInstanceDialogProps) {
    const [name, setName] = useState(instance.name)

    const handleSave = () => {
        if (!name.trim()) return
        // TODO: call backend to update instance name
        console.log("Update instance:", instance.instanceName, "→", name.trim())
        onClose()
    }

    const isDirty = name.trim() !== instance.name && name.trim() !== ""

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
                        autoFocus
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={!isDirty}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
