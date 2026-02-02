export async function clientFetch(path: string, options?: RequestInit): Promise<Response> {
    const response = await fetch(path, {
        ...options,
    })
    if (response.status === 401) {
        window.dispatchEvent(new Event("session-expired"))
    }
    return response
}