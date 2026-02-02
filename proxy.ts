import { refresh } from "@/modules/auth/services/auth-service"
import { isAccessTokenNearExpiration, isLogged } from "@/shared/services/session-manager"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
    if (!await isLogged() || await isAccessTokenNearExpiration()) {
        if (!await refresh()) {
            const res = NextResponse.redirect(new URL('/logout', process.env.NEXT_PUBLIC_BASE_URL))
            return res
        }
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/teste/:path*",
        "/workspace-selection",
    ]
}