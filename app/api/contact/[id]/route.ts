import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const response = await backendCall(`/contact/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))
  return NextResponse.json(data, { status: response.status })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const response = await backendCall(`/contact/${id}`, { method: "DELETE" })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  }

  return new NextResponse(null, { status: 204 })
}
