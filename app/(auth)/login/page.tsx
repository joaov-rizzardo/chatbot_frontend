import { LoginForm } from "@/modules/auth/components/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="relative z-10 w-full max-w-md">
            <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                    <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">ZapFlow</span>
            </div>

            <Card className="bg-custom-sidebar/80 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl text-white">Bem-vindo de volta</CardTitle>
                    <CardDescription className="text-white/60">
                        Entre com suas credenciais para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">

                    <LoginForm />
                    
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-white/50 text-sm">
                            Não tem uma conta?{" "}
                            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                                Criar conta
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>

            <p className="text-center text-white/30 text-sm mt-8">
                © 2024 ZapFlow. Todos os direitos reservados.
            </p>
        </div>
    )
}