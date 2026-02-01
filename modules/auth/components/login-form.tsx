'use client'

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { LoginFormData, loginSchema } from "../schemas/login-schema"
import { useForm } from "react-hook-form"
import { Spinner } from "@/shared/components/ui/spinner"
import { Field, FieldDescription } from "@/shared/components/ui/field"
import { BackendApiResponse } from "@/shared/types/backend-api-response"
import { LoginApiResponse } from "../types/login-api-response"

export function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })

        const body = await response.json() as BackendApiResponse<LoginApiResponse>

        if (!body.success) {
            if (body.statusCode === 401 && body.error.code === "BAD_CREDENTIALS") {
                setError("root", {
                    message: "E-mail e/ou senha incorretos"
                })
            } else {
                setError("root", {
                    message: "Não foi possível se comunicar com o servidor, tente novamente mais tarde."
                })
            }
            return
        }

        console.log(body)

    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/20 h-12"
                        {...register('email')}
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
                        {...register('password')}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Esqueceu a senha?
                </button>
            </div>

            <Field>
                <Button
                    type="submit"
                    variant={"default"}
                    disabled={Boolean(errors.email) || Boolean(errors.password)}
                    className="w-full h-12 text-white font-semibold shadow-lg shadow-primary/30 transition-all duration-300"
                >
                    {isSubmitting ? (
                        <Spinner className="text-white/30 size-6" />
                    ) : (
                        <>
                            Entrar
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </Button>

                {errors.root && (
                    <FieldDescription className="text-destructive/70 text-right">
                        {errors.root.message}
                    </FieldDescription>
                )}

            </Field>

        </form>
    )
}