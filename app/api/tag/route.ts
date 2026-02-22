import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const response = await backendCall("/tag")

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const response = await backendCall("/tag", {
    method: "POST",
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    return NextResponse.json(err, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data, { status: 201 })
}
