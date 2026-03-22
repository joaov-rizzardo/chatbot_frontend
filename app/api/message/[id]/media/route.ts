import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const response = await backendCall(`/message/${id}/media`)
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  }
  const data = await response.json()
  return NextResponse.json(data)
}
