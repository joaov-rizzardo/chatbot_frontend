import { login } from "@/modules/auth/services/auth-service";
import { NextResponse } from "next/server";

type LoginBody = {
    email: string
    password: string
}

export async function POST(request: Request) {
    const body = (await request.json()) as LoginBody
    const { email, password } = body;

    const response = await login(email, password)

    return NextResponse.json(response, { status: response.statusCode })
}