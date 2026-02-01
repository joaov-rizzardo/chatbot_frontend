import { BackendErrorResponseBody } from "./backend-error-response-body"

type BackendApiSuccessResponse<T> = {
    success: true
    statusCode: number;
    data: T
}

type BackendApiErrorResponse = {
    success: false
    statusCode: number
    error: BackendErrorResponseBody
}

export type BackendApiResponse<T> = BackendApiSuccessResponse<T> | BackendApiErrorResponse