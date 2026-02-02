import { refresh } from "@/modules/auth/services/auth-service";
import { getAccessToken } from "@/shared/services/session-manager";

const API_URL = process.env.BACKEND_URL!

export async function backendCall(path: string, options?: RequestInit): Promise<Response> {

    const accessToken = await getAccessToken()

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
            ...(accessToken !== undefined && { Authorization: `Bearer ${accessToken}` })
        }
    })

    if (response.status !== 401) {
        return response
    }

    const refreshResponse = await refresh()

    if (!refreshResponse) {
        return response
    }

    const refreshedAccessToken = await getAccessToken()

    const retryResponse = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
            ...(refreshedAccessToken !== undefined && { Authorization: `Bearer ${refreshedAccessToken}` })
        },
        cache: 'no-store',
    })

    return retryResponse
}