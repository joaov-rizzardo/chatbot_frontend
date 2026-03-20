import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const cursor = searchParams.get("cursor")
  const limit = searchParams.get("limit")

  const params = new URLSearchParams()
  if (cursor) params.set("cursor", cursor)
  if (limit) params.set("limit", limit)

  const qs = params.toString()
  const response = await backendCall(`/conversation${qs ? `?${qs}` : ""}`)
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  }
  const data = await response.json()
  return NextResponse.json(data)
}
