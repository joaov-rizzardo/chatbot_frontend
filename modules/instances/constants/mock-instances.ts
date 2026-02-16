import { Instance } from "../types/instance"

export const MOCK_INSTANCES: Instance[] = [
    {
        id: "1",
        instanceName: "ws-abc-001",
        status: "open",
        phoneNumber: "+5511999887766",
        qrCode: null,
    },
    {
        id: "2",
        instanceName: "ws-abc-002",
        status: "connecting",
        phoneNumber: "+5521988776655",
        qrCode: null,
    },
    {
        id: "3",
        instanceName: "ws-abc-003",
        status: "close",
        phoneNumber: "+14155551234",
        qrCode: null,
    },
    {
        id: "4",
        instanceName: "ws-abc-004",
        status: "open",
        phoneNumber: "+5531977665544",
        qrCode: null,
    },
    {
        id: "5",
        instanceName: "ws-abc-005",
        status: "refused",
        phoneNumber: null,
        qrCode: null,
    },
]

export const MOCK_INSTANCE_USAGE = {
    current: 5,
    limit: 7,
}
