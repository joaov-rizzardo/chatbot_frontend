import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_URL!

export async function backendFetch(path: string, options?: RequestInit): Promise<Response> {
    const cookiesStore = await cookies()
    const accessToken = cookiesStore.get("access_token")?.value

    const response = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${accessToken}`,
        }
    })

    if (response.status !== 401) {
        return response
    }

    const refreshed = await refreshToken()
    if (!refreshed) {
        clearAuthCookies()
        throw new Error('Session expired. Please login again.')
    }

    const newAccessToken = (await cookies()).get('access_token')?.value

   const retryResponse = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${newAccessToken}`,
        },
        cache: 'no-store',
    })

    if(retryResponse.status === 401){
        throw new Error("Unauthorized")
    }

    return retryResponse
}


async function refreshToken(): Promise<boolean> {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value

    if (!refreshToken) return false

    const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
        cache: 'no-store',
    })

    if (!res.ok) return false

    const data = await res.json()

    cookieStore.set('access_token', data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    })

    cookieStore.set('refresh_token', data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    })

    return true
}

async function clearAuthCookies() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
}