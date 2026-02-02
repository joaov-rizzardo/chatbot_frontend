import { logout } from "@/modules/auth/services/auth-service";

export async function GET() {
    await logout()
    return new Response(null, { status: 204 });
}