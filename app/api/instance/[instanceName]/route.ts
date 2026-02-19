import { backendCall } from "@/lib/backend-call";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ instanceName: string }> },
) {
    const { instanceName } = await params;
    const response = await backendCall(`/instance/${instanceName}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(err, { status: response.status });
    }

    return new NextResponse(null, { status: 204 });
}
