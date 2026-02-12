'use server'

import { serverFetch } from "@/lib/server-fetch"
import { Workspace } from "../types/workspace"

export async function getWorkspaces(): Promise<Workspace[]> {
    const response = await serverFetch('/workspace')

    if(response.status !== 200){
        return []
    }

    const body = await response.json() as Workspace[]

    return body
}
