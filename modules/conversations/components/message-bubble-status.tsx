import { Check, CheckCheck } from "lucide-react"
import type { Message } from "../types/message"

interface MessageBubbleStatusProps {
  status: Message["status"]
}

export function MessageBubbleStatus({ status }: MessageBubbleStatusProps) {
  if (status === "sent") return <Check className="w-3 h-3 text-white/60" />
  if (status === "delivered") return <CheckCheck className="w-3 h-3 text-white/70" />
  if (status === "read") return <CheckCheck className="w-3 h-3 text-sky-200" />
  return null
}
