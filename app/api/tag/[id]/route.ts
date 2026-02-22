import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json()
  const response = await backendCall(`/tag/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    return NextResponse.json(err, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const response = await backendCall(`/tag/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    return NextResponse.json(err, { status: response.status })
  }

  return new NextResponse(null, { status: 204 })
}
