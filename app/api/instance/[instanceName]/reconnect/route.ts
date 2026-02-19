import { backendCall } from "@/lib/backend-call";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    _request: NextRequest,
    { params }: { params: Promise<{ instanceName: string }> },
) {
    const { instanceName } = await params;
    const response = await backendCall(`/instance/${instanceName}/reconnect`, {
        method: "POST",
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(err, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
