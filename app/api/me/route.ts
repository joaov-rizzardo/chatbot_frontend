import { getLoggedUser } from "@/shared/services/session-manager";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getLoggedUser();
    return NextResponse.json(user);
}
