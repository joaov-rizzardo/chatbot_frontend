import { logout } from '@/modules/auth/services/auth-service'
import { NextResponse } from 'next/server'

export async function GET() {
    const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL))

    await logout()

    return response
}
