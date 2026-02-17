import { backendCall } from "@/lib/backend-call";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await backendCall("/instance");

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        return NextResponse.json(body, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
