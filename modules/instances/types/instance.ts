export type InstanceStatus = "open" | "connecting" | "close" | "refused"

export type Instance = {
    id: string
    instanceName: string
    status: InstanceStatus
    phoneNumber: string | null
    qrCode: string | null
}
