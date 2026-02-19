export type InstanceStatus = "open" | "connecting" | "close" | "refused"

export type Instance = {
    id: string
    name: string
    instanceName: string
    instanceId: string
    workspaceId: string
    status: InstanceStatus
    phoneNumber: string | null
    createdAt: string
    updatedAt: string
}

export type InstanceWithQrCode = Instance & { qrCode: string | null }
