import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ArrowRight, Lock, Mail, MessageSquare } from "lucide-react";

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
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/80">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/20 h-12"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/80">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <Input
                                    id="password"
                                    placeholder="••••••••"
                                    className="pl-11 pr-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/20 h-12"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                                Esqueceu a senha?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant={"default"}
                            className="w-full h-12 text-white font-semibold shadow-lg shadow-primary/30 transition-all duration-300"
                        >
                            Entrar
                            <ArrowRight className="w-5 h-5 ml-2" />
                            {/* {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Entrar
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )} */}
                        </Button>
                    </form>

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