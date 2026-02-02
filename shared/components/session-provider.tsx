// app/providers/session-provider.tsx
"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"

export function SessionProvider({ children }: { children: ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const handler = () => {
            router.replace("/logout")
        }

        window.addEventListener("session-expired", handler)
        return () => {
            window.removeEventListener("session-expired", handler)
        }
    }, [router])

    return children
}
