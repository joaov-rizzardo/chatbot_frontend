'use server'

import { getAccessToken } from "@/shared/services/session-manager";

const API_URL = process.env.BACKEND_URL!

export async function serverFetch(path: string, options?: RequestInit): Promise<Response> {
    const accessToken = await getAccessToken()
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
            ...(accessToken !== undefined && { Authorization: `Bearer ${accessToken}` })
        },
    })
    return response
}