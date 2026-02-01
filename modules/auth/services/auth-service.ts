import { BackendApiResponse } from "@/shared/types/backend-api-response";
import { LoginApiResponse } from "../types/login-api-response";
import { BackendErrorResponseBody } from "@/shared/types/backend-error-response-body";

const API_URL = process.env.BACKEND_URL!

export class AuthService {

    public static async login(email: string, password: string): Promise<BackendApiResponse<LoginApiResponse>> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (response.status === 200) {
                const body = await response.json() as LoginApiResponse
                return {
                    success: true,
                    statusCode: response.status,
                    data: body
                }
            }
            const body = await response.json() as BackendErrorResponseBody
            return {
                success: false,
                statusCode: response.status,
                error: body
            }
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                error: {
                    code: "UNKNOWN_SERVER_ERROR",
                    message: "An unexpected server error occurred. Please try again later."
                }
            }
        }
    }
}