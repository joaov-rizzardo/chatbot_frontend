import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { MessageSquare } from "lucide-react"

export default function WorkspaceSelectionLoading() {
    return (
        <div className="relative z-10 w-full max-w-md">
            <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                    <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">ZapFlow</span>
            </div>

            <Card className="bg-custom-sidebar/80 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl">
                <CardHeader className="text-center pb-2">
                    <Skeleton className="h-8 w-48 mx-auto bg-white/20" />
                    <Skeleton className="h-4 w-64 mx-auto mt-2 bg-white/10" />
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-3 overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
                            >
                                <Skeleton className="w-12 h-12 rounded-lg bg-white/20" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-32 bg-white/20" />
                                    <Skeleton className="h-4 w-24 bg-white/10" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Skeleton className="h-12 w-full mt-6 rounded-lg bg-white/20" />
                    <Skeleton className="h-4 w-32 mt-4 mx-auto bg-white/10" />
                </CardContent>
            </Card>

            <p className="text-center text-white/30 text-sm mt-8">
                © 2024 ZapFlow. Todos os direitos reservados.
            </p>
        </div>
    )
}
