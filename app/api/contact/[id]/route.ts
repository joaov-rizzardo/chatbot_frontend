import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const response = await backendCall(`/contact/${id}`, { method: "DELETE" })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  }

  return new NextResponse(null, { status: 204 })
}
