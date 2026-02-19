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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import type { Instance } from "../types/instance"
import { useReconnectInstanceDialog } from "../hooks/use-reconnect-instance-dialog"

interface ReconnectInstanceDialogProps {
    instance: Instance
    onClose: () => void
}

export function ReconnectInstanceDialog({ instance, onClose }: ReconnectInstanceDialogProps) {
    const { step, qrCode, error, handleRefresh } = useReconnectInstanceDialog({
        instanceName: instance.instanceName,
        onClose,
    })

    return (
        <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
            <DialogContent className="sm:max-w-sm" onOpenAutoFocus={e => e.preventDefault()}>
                {step === "loading" ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Reconectando</DialogTitle>
                            <DialogDescription>
                                Gerando um novo QR code para{" "}
                                <span className="font-medium text-foreground">{instance.name}</span>.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center gap-3 py-2">
                            <Skeleton className="w-48 h-48 rounded-lg" />
                            <Skeleton className="w-40 h-3 rounded" />
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Escaneie o QR Code</DialogTitle>
                            <DialogDescription>
                                Abra o WhatsApp &rarr; Aparelhos conectados &rarr; Conectar aparelho.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center gap-3 py-2">
                            <div className="w-48 h-48 rounded-lg bg-white p-3 shadow-sm border border-border flex items-center justify-center">
                                {qrCode ? (
                                    <img
                                        src={qrCode}
                                        alt="QR Code WhatsApp"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <p className="text-xs text-muted-foreground text-center">
                                        QR Code indisponível.
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <p className="text-xs text-muted-foreground">
                                    Reconectando{" "}
                                    <span className="font-medium text-foreground">{instance.name}</span>
                                </p>
                                {error && (
                                    <p className="text-xs text-destructive">{error}</p>
                                )}
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
                            <Button variant="outline" onClick={onClose}>
                                Fechar
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
