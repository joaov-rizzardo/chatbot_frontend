'use server'

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { AccessTokenPayload } from "../types/access-token-payload"

const ACCESS_TOKEN_COOKIE_NAME = "access_token"
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token"

export async function getAccessToken(): Promise<string | undefined> {
    const cookiesStore = await cookies()
    return cookiesStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value
}

export async function getRefreshToken(): Promise<string | undefined> {
    const cookiesStore = await cookies()
    return cookiesStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value
}

export async function setTokens(accessToken: string, refreshToken: string) {
    await Promise.all([
        setAccessToken(accessToken),
        setRefreshToken(refreshToken)
    ])
}

export async function setAccessToken(accessToken: string) {
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    })
}

export async function setRefreshToken(refreshToken: string) {
    const cookieStore = await cookies()
    cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    })
}

export async function clearAuthTokens() {
    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
    cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export async function isLogged(): Promise<boolean> {
    try {
        const cookiesStore = await cookies();
        const accessToken = cookiesStore.get(ACCESS_TOKEN_COOKIE_NAME)
        if (!accessToken) return false
        const payload = jwt.decode(accessToken.value) as AccessTokenPayload
        if (payload.exp * 1000 < Date.now()) {
            return false
        }
        return true
    } catch {
        return false
    }

}

export async function getLoggedUser(): Promise<AccessTokenPayload> {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get(ACCESS_TOKEN_COOKIE_NAME)
    if (!accessToken) return {} as AccessTokenPayload
    const payload = jwt.decode(accessToken.value) as AccessTokenPayload
    return payload
}

export async function hasWorkspace(): Promise<boolean> {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get(ACCESS_TOKEN_COOKIE_NAME)
    if (!accessToken) return false
    const payload = jwt.decode(accessToken.value) as AccessTokenPayload
    return Boolean(payload.workspaceId)
}

export async function isAccessTokenNearExpiration(): Promise<boolean> {
    const cookiesStore = await cookies();
    const nowInSeconds = Math.floor(Date.now() / 1000)
    const accessToken = cookiesStore.get(ACCESS_TOKEN_COOKIE_NAME)
    if (!accessToken) return true
    const payload = jwt.decode(accessToken.value) as AccessTokenPayload
    return payload.exp - nowInSeconds <= 30
}
