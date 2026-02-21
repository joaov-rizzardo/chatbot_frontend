import { refresh } from "@/modules/auth/services/auth-service"
import { hasWorkspace, isAccessTokenNearExpiration, isLogged } from "@/shared/services/session-manager"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
    if (!await isLogged() || await isAccessTokenNearExpiration()) {
        if (!await refresh()) {
            return NextResponse.redirect(new URL('/logout', process.env.NEXT_PUBLIC_BASE_URL))
        }
    }

    if (request.nextUrl.pathname.startsWith('/app') && !await hasWorkspace()) {
        return NextResponse.redirect(new URL('/workspace-selection', process.env.NEXT_PUBLIC_BASE_URL))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/app/:path*",
        "/workspace-selection",
    ]
}