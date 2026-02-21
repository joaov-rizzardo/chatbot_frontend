export type WorkspaceRole = "OWNER" | "MEMBER"

export type AccessTokenPayload = {
    sessionId: string,
    name: string,
    lastName: string,
    email: string,
    iat: number,
    exp: number,
    sub: string,
    workspaceId?: string,
    workspaceRole?: WorkspaceRole
}