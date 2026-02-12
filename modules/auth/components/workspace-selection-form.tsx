'use client'

import { Button } from "@/shared/components/ui/button"
import { ArrowRight, Building2, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { Workspace } from "../types/workspace"
import { useWorkspaceSelectionForm } from "../hooks/use-workspace-selection-form"
import { WORKSPACE_ROLES_MAPPER } from "@/shared/constants/workspace-roles-mapper"

interface WorkspaceSelectionFormProps {
    workspaces: Workspace[]
}

export function WorkspaceSelectionForm({ workspaces }: WorkspaceSelectionFormProps) {
    const router = useRouter()
    const {
        selectedWorkspaceId,
        selectWorkspace,
        handleConfirmSelection,
        canConfirm,
        isConnecting,
    } = useWorkspaceSelectionForm(workspaces)

    async function logout() {
        await fetch("/api/logout")
        router.push("/login")
    }

    return (
        <React.Fragment>
            <div className="space-y-3 overflow-y-scroll h-75 2xl:h-100 scrollbar-dark px-2">
                {workspaces.map((workspace) => {
                    const isSelected = selectedWorkspaceId === workspace.id
                    return (
                        <button
                            key={workspace.id}
                            type="button"
                            onClick={() => selectWorkspace(workspace.id)}
                            className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group ${isSelected
                                ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isSelected
                                    ? "bg-primary text-white"
                                    : "bg-white/10 text-white/60 group-hover:bg-white/20"
                                    }`}>
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-medium">{workspace.name}</h3>
                                    <p className="text-white/50 text-sm">{WORKSPACE_ROLES_MAPPER[workspace.role]} • {workspace.membersCount} membro{workspace.membersCount > 1 ? 's' : ''}</p>
                                </div>
                                {isSelected && (
                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>

            <Button
                type="button"
                onClick={handleConfirmSelection}
                disabled={!canConfirm}
                className="w-full h-12 mt-6 bg-linear-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-semibold shadow-lg shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isConnecting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        Continuar
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                )}
            </Button>

            <button
                type="button"
                className="w-full mt-4 text-white/50 hover:text-white/70 text-sm transition-colors"
                onClick={logout}
            >
                ← Voltar para login
            </button>
        </React.Fragment>
    )
}
