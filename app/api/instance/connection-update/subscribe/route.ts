import { backendCall } from "@/lib/backend-call";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await backendCall("/instance/connection-update/subscribe", {
        headers: { Accept: "text/event-stream" },
        cache: "no-store",
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(err, { status: response.status });
    }

    return new Response(response.body, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}
