"use server"

import { BackendApiResponse } from "@/shared/types/backend-api-response";
import { LoginApiResponse } from "../types/login-api-response";
import { BackendErrorResponseBody } from "@/shared/types/backend-error-response-body";
import { clearAuthTokens, getRefreshToken, setAccessToken, setTokens } from "@/shared/services/session-manager";
import { RefreshTokenResponse } from "../types/refresh-token-response";

const API_URL = process.env.BACKEND_URL!

export async function login(email: string, password: string): Promise<BackendApiResponse<LoginApiResponse>> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        if (response.status === 200) {
            const body = await response.json() as LoginApiResponse
            await setTokens(body.accessToken, body.refreshToken)
            return {
                success: true,
                statusCode: response.status,
                data: body
            }
        }
        const body = await response.json() as BackendErrorResponseBody
        return {
            success: false,
            statusCode: response.status,
            error: body
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            error: {
                code: "UNKNOWN_SERVER_ERROR",
                message: "An unexpected server error occurred. Please try again later."
            }
        }
    }
}

export async function logout(): Promise<void> {
    await clearAuthTokens()
}

export async function refresh(): Promise<boolean> {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) return false
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken
        })
    })
    if (response.status !== 200) {
        return false
    }
    const { accessToken } = await response.json() as RefreshTokenResponse
    await setAccessToken(accessToken)
    return true
}

