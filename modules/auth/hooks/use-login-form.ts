'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LoginFormData, loginSchema } from "../schemas/login-schema"
import { BackendApiResponse } from "@/shared/types/backend-api-response"
import { LoginApiResponse } from "../types/login-api-response"

export function useLoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const router = useRouter()

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

        toast("Login realizado", {
            description: "Agora é necessário selecionar um workspace para continuar.",
            duration: 5_000,
            position: "bottom-right",
        })

        router.push("/workspace-selection")
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    }
}
