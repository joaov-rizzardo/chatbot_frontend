import { WorkspaceSelectionForm } from "@/modules/auth/components/workspace-selection-form";
import { getWorkspaces } from "@/modules/auth/services/workspace-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { isLogged } from "@/shared/services/session-manager";
import { MessageSquare } from "lucide-react";
import { redirect } from "next/navigation";

export default async function WorkspaceSelectionPage() {
    if (!(await isLogged())) {
        redirect("/logout")
    }

    const workspaces = await getWorkspaces()

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
                    <WorkspaceSelectionForm workspaces={workspaces} />
                </CardContent>
            </Card>

            <p className="text-center text-white/30 text-sm mt-8">
                © 2024 ZapFlow. Todos os direitos reservados.
            </p>
        </div>
    )
}