import { backendCall } from "@/lib/backend-call"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const response = await backendCall("/contact")

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await backendCall("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    return NextResponse.json(errorBody, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data, { status: 201 })
}
