export interface Workspace {
    id: string
    name: string
    role: "OWNER" | "MEMBER"
    membersCount: number
}
