"use client"

import { useEffect, useState } from "react"
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
    instance: Instance | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditInstanceDialog({ instance, open, onOpenChange }: EditInstanceDialogProps) {
    const [name, setName] = useState("")

    useEffect(() => {
        if (instance) setName(instance.name)
    }, [instance])

    const handleSave = () => {
        if (!name.trim() || !instance) return
        // TODO: call backend to update instance name
        console.log("Update instance:", instance.instanceName, "→", name.trim())
        onOpenChange(false)
    }

    const isDirty = name.trim() !== instance?.name && name.trim() !== ""

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
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
