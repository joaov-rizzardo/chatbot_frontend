import { connectToWorkspace } from "@/modules/auth/services/auth-service";
import { NextResponse } from "next/server";

type ConnectBody = {
    workspaceId: string;
};

export async function POST(request: Request) {
    const body = (await request.json()) as ConnectBody;
    const { workspaceId } = body;

    if (!workspaceId || typeof workspaceId !== "string") {
        return NextResponse.json(
            { code: "BAD_REQUEST", message: "workspaceId é obrigatório" },
            { status: 400 }
        );
    }

    const result = await connectToWorkspace(workspaceId);

    if (!result.success) {
        return NextResponse.json(result.error, { status: result.statusCode });
    }

    return new NextResponse(null, { status: 204 });
}
