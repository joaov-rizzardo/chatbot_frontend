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

                        <div className="flex flex-col items-center gap-4 py-2">
                            <QrFrame>
                                <Skeleton className="w-44 h-44 rounded-sm" />
                            </QrFrame>
                            <Skeleton className="w-36 h-2.5 rounded" />
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
                                    Reconectando{" "}
                                    <span className="font-medium text-foreground">{instance.name}</span>
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
