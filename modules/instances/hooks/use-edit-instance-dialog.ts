"use client"

import { useState, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instancesQueryKey } from "../queries/use-instances-query"
import { updateInstance } from "../services/instance-client"

interface UseEditInstanceDialogOptions {
    instanceName: string
    currentName: string
    onClose: () => void
}

export function useEditInstanceDialog({ instanceName, currentName, onClose }: UseEditInstanceDialogOptions) {
    const [name, setName] = useState(currentName)
    const queryClient = useQueryClient()

    const isDirty = name.trim() !== currentName && name.trim() !== ""

    const updateMutation = useMutation({
        mutationFn: () => updateInstance(instanceName, name.trim()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: instancesQueryKey })
            onClose()
        },
    })

    const handleSave = useCallback(() => {
        if (!isDirty) return
        updateMutation.mutate()
    }, [isDirty, updateMutation])

    return {
        name,
        setName,
        isDirty,
        handleSave,
        isSaving: updateMutation.isPending,
        error: updateMutation.isError ? "Falha ao atualizar instância. Tente novamente." : null,
    }
}
