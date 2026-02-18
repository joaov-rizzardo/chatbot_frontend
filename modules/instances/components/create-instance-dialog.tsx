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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import { QrCodeMock } from "./qr-code-mock"

interface CreateInstanceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type Step = "name" | "loading" | "qr-code"

export function CreateInstanceDialog({ open, onOpenChange }: CreateInstanceDialogProps) {
    const [step, setStep] = useState<Step>("name")
    const [instanceName, setInstanceName] = useState("")

    const resetAndClose = () => {
        onOpenChange(false)
        setTimeout(() => {
            setStep("name")
            setInstanceName("")
        }, 200)
    }

    const handleGenerateQr = () => {
        if (!instanceName.trim()) return
        setStep("loading")
        // TODO: call backend to create instance and get QR code
        setTimeout(() => setStep("qr-code"), 1200)
    }

    const handleRefresh = () => {
        setStep("loading")
        // TODO: call backend to refresh QR code
        setTimeout(() => setStep("qr-code"), 1200)
    }

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) resetAndClose() }}>
            <DialogContent className="sm:max-w-sm" onOpenAutoFocus={e => e.preventDefault()}>
                {step === "name" && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Nova conexão</DialogTitle>
                            <DialogDescription>
                                Dê um nome para identificar esta conexão WhatsApp.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="new-instance-name">Nome da conexão</Label>
                            <Input
                                id="new-instance-name"
                                placeholder="Ex: Atendimento, Vendas..."
                                value={instanceName}
                                onChange={e => setInstanceName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleGenerateQr()}
                                autoFocus
                            />
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={resetAndClose}>
                                Cancelar
                            </Button>
                            <Button onClick={handleGenerateQr} disabled={!instanceName.trim()}>
                                Gerar QR Code
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === "loading" && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Gerando QR Code</DialogTitle>
                            <DialogDescription>
                                Aguarde enquanto preparamos o código para conexão.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center gap-3 py-2">
                            <Skeleton className="w-48 h-48 rounded-lg" />
                            <Skeleton className="w-40 h-3 rounded" />
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={resetAndClose}>
                                Cancelar
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === "qr-code" && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Escaneie o QR Code</DialogTitle>
                            <DialogDescription>
                                Abra o WhatsApp &rarr; Aparelhos conectados &rarr; Conectar aparelho.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center gap-3 py-2">
                            <div className="w-48 h-48 rounded-lg bg-white p-3 shadow-sm border border-border">
                                <QrCodeMock />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <p className="text-xs text-muted-foreground">
                                    Conectando como{" "}
                                    <span className="font-medium text-foreground">{instanceName}</span>
                                </p>
                                <button
                                    onClick={handleRefresh}
                                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                                >
                                    <RefreshCw className="h-3 w-3" />
                                    Gerar novo código
                                </button>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={resetAndClose}>
                                Cancelar
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
