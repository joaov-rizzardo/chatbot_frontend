import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ArrowRight, Building2, Check, MessageSquare } from "lucide-react";

interface Workspace {
    id: string;
    name: string;
    role: string;
    members: number;
}

const mockWorkspaces: Workspace[] = [
    { id: "1", name: "ZapFlow Marketing", role: "Admin", members: 12 },
    { id: "2", name: "Vendas Brasil", role: "Editor", members: 8 },
    { id: "3", name: "Suporte Técnico", role: "Membro", members: 25 },  
];

export default function WorkspaceSelectionPage() {
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
                    <CardTitle className="text-2xl text-white">Selecione o Workspace</CardTitle>
                    <CardDescription className="text-white/60">
                        Escolha em qual workspace você deseja trabalhar
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-3 overflow-y-scroll h-75 2xl:h-100 scrollbar-dark px-2">
                        {mockWorkspaces.map((workspace) => (
                            <button
                                key={workspace.id}
                                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group ${false
                                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${false
                                        ? "bg-primary text-white"
                                        : "bg-white/10 text-white/60 group-hover:bg-white/20"
                                        }`}>
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium">{workspace.name}</h3>
                                        <p className="text-white/50 text-sm">{workspace.role} • {workspace.members} membros</p>
                                    </div>
                                    {false && (
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <Button
                        className="w-full h-12 mt-6 bg-linear-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-semibold shadow-lg shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continuar
                        <ArrowRight className="w-5 h-5 ml-2" />
                        {/* {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Continuar
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )} */}
                    </Button>

                    <button
                        className="w-full mt-4 text-white/50 hover:text-white/70 text-sm transition-colors"
                    >
                        ← Voltar para login
                    </button>
                </CardContent>
            </Card>

            <p className="text-center text-white/30 text-sm mt-8">
                © 2024 ZapFlow. Todos os direitos reservados.
            </p>
        </div>
    )
}