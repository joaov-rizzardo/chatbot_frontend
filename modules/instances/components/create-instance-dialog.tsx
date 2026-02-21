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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import { useCreateInstanceDialog } from "../hooks/use-create-instance-dialog"

interface CreateInstanceDialogProps {
    onClose: () => void
}

function QrFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative p-3.5">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-foreground/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-foreground/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-foreground/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-foreground/50" />
            {children}
        </div>
    )
}

export function CreateInstanceDialog({ onClose }: CreateInstanceDialogProps) {
    const {
        step,
        instanceDisplayName,
        setInstanceDisplayName,
        qrCode,
        error,
        handleCreate,
        handleRefresh,
        resetAndClose,
    } = useCreateInstanceDialog({ onClose })

    return (
        <Dialog open onOpenChange={(o) => { if (!o) resetAndClose() }}>
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
                                value={instanceDisplayName}
                                onChange={e => setInstanceDisplayName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleCreate()}
                                maxLength={20}
                                autoFocus
                            />
                            {error && (
                                <p className="text-xs text-destructive">{error}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={resetAndClose}>
                                Cancelar
                            </Button>
                            <Button onClick={handleCreate} disabled={!instanceDisplayName.trim()}>
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

                        <div className="flex flex-col items-center gap-4 py-2">
                            <QrFrame>
                                <Skeleton className="w-44 h-44 rounded-sm" />
                            </QrFrame>
                            <Skeleton className="w-36 h-2.5 rounded" />
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

                        <div className="flex flex-col items-center gap-4 py-2">
                            <QrFrame>
                                <div className="w-44 h-44 bg-white rounded-sm flex items-center justify-center">
                                    {qrCode ? (
                                        <img
                                            src={qrCode}
                                            alt="QR Code WhatsApp"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-xs text-muted-foreground text-center px-4">
                                            QR Code indisponível.
                                        </p>
                                    )}
                                </div>
                            </QrFrame>

                            <div className="flex flex-col items-center gap-1.5">
                                <p className="text-xs text-muted-foreground">
                                    Conectando como{" "}
                                    <span className="font-medium text-foreground">{instanceDisplayName}</span>
                                </p>
                                {error && (
                                    <p className="text-xs text-destructive">{error}</p>
                                )}
                                <button
                                    onClick={handleRefresh}
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
